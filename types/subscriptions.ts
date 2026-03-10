export interface ProductTier {
  name: string;
  id: string;
  amountFen: number;      // 价格（人民币，单位：分。1元 = 100分）
  priceDisplay: string;   // 显示价格，如 "¥19"
  description: string;
  featured: boolean;
  features?: string[];
  creditAmount?: number;  // 积分套餐时有值
  durationDays?: number;  // 订阅套餐有效天数
}

export interface CreditTransaction {
  amount: number;
  type: 'add' | 'subtract';
  created_at: string;
  description?: string;
}

export type SubscriptionStatus = {
  isSubscribed: boolean;
  status: string | null;
  willEndOn: Date | null;
  isInGracePeriod: boolean;
  daysLeft: number | null;
};

export type SubscriptionState =
  | "active"
  | "trialing"
  | "canceled"
  | "past_due"
  | "unpaid"
  | "paused"
  | "incomplete"
  | "expired";

// Constants for subscription status checks
export const ACTIVE_STATUSES = ["active", "trialing"] as const;
export const GRACE_PERIOD_STATUSES = [
  "canceled",
  "past_due",
  "unpaid",
  "paused",
] as const;
