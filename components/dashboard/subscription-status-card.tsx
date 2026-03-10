"use client";

import {
  CreditCard,
  Package2,
  AlertCircle,
  Clock,
  Ban,
  PauseCircle,
  LucideIcon,
} from "lucide-react";
import { SubscriptionState } from "@/types/subscriptions";

type StatusConfig = {
  color: string;
  icon: LucideIcon;
  message: string;
  iconColor: string;
};

type StatusConfigs = {
  [key in SubscriptionState]: StatusConfig;
};

const STATUS_LABELS: Record<string, string> = {
  active: "生效中",
  trialing: "试用中",
  canceled: "已取消",
  past_due: "待支付",
  unpaid: "未支付",
  paused: "已暂停",
  incomplete: "未完成",
  expired: "已过期",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function isFutureDate(date: string) {
  return new Date(date) > new Date();
}

function getStatusConfig(
  status: string,
  current_period_end: string
): StatusConfig {
  const inGracePeriod = isFutureDate(current_period_end);

  const configs: StatusConfigs = {
    active: {
      color: "text-green-500",
      icon: Package2,
      message: `将于 ${formatDate(current_period_end)} 续费`,
      iconColor: "text-green-500",
    },
    trialing: {
      color: "text-primary",
      icon: Clock,
      message: `试用将于 ${formatDate(current_period_end)} 结束`,
      iconColor: "text-primary",
    },
    canceled: {
      color: inGracePeriod ? "text-yellow-500" : "text-destructive",
      icon: Ban,
      message: inGracePeriod
        ? `可使用至 ${formatDate(current_period_end)}`
        : `已于 ${formatDate(current_period_end)} 结束`,
      iconColor: inGracePeriod ? "text-yellow-500" : "text-destructive",
    },
    past_due: {
      color: "text-yellow-500",
      icon: AlertCircle,
      message: `待支付，可使用至 ${formatDate(current_period_end)}`,
      iconColor: "text-yellow-500",
    },
    unpaid: {
      color: "text-destructive",
      icon: AlertCircle,
      message: "需要完成支付",
      iconColor: "text-destructive",
    },
    paused: {
      color: "text-yellow-500",
      icon: PauseCircle,
      message: `已暂停，至 ${formatDate(current_period_end)}`,
      iconColor: "text-yellow-500",
    },
    incomplete: {
      color: "text-yellow-500",
      icon: AlertCircle,
      message: "订阅配置未完成",
      iconColor: "text-yellow-500",
    },
    expired: {
      color: "text-destructive",
      icon: Ban,
      message: `已于 ${formatDate(current_period_end)} 过期`,
      iconColor: "text-destructive",
    },
  };

  return (
    configs[status as SubscriptionState] || {
      color: "text-muted-foreground",
      icon: AlertCircle,
      message: "暂无有效套餐",
      iconColor: "text-muted-foreground",
    }
  );
}

type SubscriptionStatusCardProps = {
  subscription?: {
    status: string;
    current_period_end: string;
  } | null;
};

export function SubscriptionStatusCard({
  subscription,
}: SubscriptionStatusCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <CreditCard className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">订阅状态</p>
          {subscription && (
            <h3
              className={`text-2xl font-bold capitalize mt-1 ${
                getStatusConfig(
                  subscription.status,
                  subscription.current_period_end
                ).color
              }`}
            >
              {STATUS_LABELS[subscription.status] ?? "未知状态"}
            </h3>
          )}
          {!subscription && (
            <h3 className="text-2xl font-bold mt-1 text-muted-foreground">
              暂无有效套餐
            </h3>
          )}
        </div>
      </div>
      {subscription && (
        <div className="mt-4 flex items-center text-sm gap-2">
          {(() => {
            const config = getStatusConfig(
              subscription.status,
              subscription.current_period_end
            );
            const Icon = config.icon;
            return (
              <>
                <Icon className={`h-4 w-4 ${config.iconColor}`} />
                <span className="text-muted-foreground">{config.message}</span>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
