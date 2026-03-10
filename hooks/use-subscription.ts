"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  SubscriptionStatus,
  ACTIVE_STATUSES,
  GRACE_PERIOD_STATUSES,
  SubscriptionState,
} from "@/types/subscriptions";

// Helper function to check if subscription is active
function isSubscriptionActive(
  status: SubscriptionState,
  endDate: string
): boolean {
  const now = new Date();
  const periodEnd = new Date(endDate);

  if (ACTIVE_STATUSES.includes(status as "active" | "trialing")) {
    return true;
  }

  if (
    GRACE_PERIOD_STATUSES.includes(
      status as "canceled" | "past_due" | "unpaid" | "paused"
    ) &&
    periodEnd > now
  ) {
    return true;
  }

  return false;
}

// Helper function to check if subscription is in grace period
function isInGracePeriod(status: SubscriptionState, endDate: string): boolean {
  const now = new Date();
  const periodEnd = new Date(endDate);
  return (
    GRACE_PERIOD_STATUSES.includes(
      status as "canceled" | "past_due" | "unpaid" | "paused"
    ) && periodEnd > now
  );
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionStatus & { credits?: number }>({
    isSubscribed: false,
    status: null,
    willEndOn: null,
    isInGracePeriod: false,
    daysLeft: null,
    credits: 0,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: customerData } = await supabase
        .from("customers")
        .select(
          `
          credits,
          subscriptions (
            status,
            current_period_end,
            canceled_at
          )
        `
        )
        .eq("user_id", user.id)
        .single();

      const sub = customerData?.subscriptions?.[0];
      const credits = customerData?.credits || 0;

      if (!sub) {
        // No subscription, but user might have credits
        setSubscription({
          isSubscribed: false,
          status: null,
          willEndOn: null,
          isInGracePeriod: false,
          daysLeft: null,
          credits: credits,
        });
        setLoading(false);
        return;
      }

      const now = new Date();
      const endDate = new Date(sub.current_period_end);
      const daysLeft = Math.ceil(
        (endDate.getTime() - now.getTime()) / (1000 * 3600 * 24)
      );

      setSubscription({
        isSubscribed: isSubscriptionActive(sub.status, sub.current_period_end),
        status: sub.status,
        willEndOn: endDate,
        isInGracePeriod: isInGracePeriod(sub.status, sub.current_period_end),
        daysLeft: daysLeft,
        credits: credits,
      });
    } catch (error) {
      console.error("Error checking subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  return { ...subscription, loading, refresh: checkSubscription };
}
