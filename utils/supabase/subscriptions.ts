import { createServiceRoleClient } from "./service-role";

/** 确保 customer 记录存在，返回内部 customer.id */
export async function ensureCustomer(userId: string): Promise<string> {
  const supabase = createServiceRoleClient();

  const { data: existing } = await supabase
    .from("customers")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (existing) return existing.id;

  const { data: newCustomer, error } = await supabase
    .from("customers")
    .insert({ user_id: userId, email: "", credits: 0 })
    .select()
    .single();

  if (error) throw error;
  return newCustomer.id;
}

/** 创建或续期订阅（每次购买延长 30 天） */
export async function createOrUpdateSubscription(params: {
  tradeNo: string;
  planId: string;
  customerId: string;
}) {
  const supabase = createServiceRoleClient();

  // 查询是否有当前有效/试用中的订阅
  const { data: existing } = await supabase
    .from("subscriptions")
    .select()
    .eq("customer_id", params.customerId)
    .in("status", ["active", "trialing"])
    .order("current_period_end", { ascending: false })
    .limit(1)
    .maybeSingle();

  const now = new Date();
  // 若当前订阅未到期则从到期日续费，否则从今天起算
  const startFrom =
    existing && new Date(existing.current_period_end) > now
      ? new Date(existing.current_period_end)
      : now;
  const endDate = new Date(startFrom.getTime() + 30 * 24 * 60 * 60 * 1000);

  if (existing) {
    const { error } = await supabase
      .from("subscriptions")
      .update({
        trade_no: params.tradeNo,
        plan_id: params.planId,
        status: "active",
        current_period_start: startFrom.toISOString(),
        current_period_end: endDate.toISOString(),
        updated_at: now.toISOString(),
      })
      .eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("subscriptions").insert({
      customer_id: params.customerId,
      trade_no: params.tradeNo,
      plan_id: params.planId,
      status: "active",
      current_period_start: now.toISOString(),
      current_period_end: endDate.toISOString(),
    });
    if (error) throw error;
  }
}

/** 增加积分并记录历史 */
export async function addCreditsToCustomer(
  customerId: string,
  credits: number,
  tradeNo?: string,
  description?: string
) {
  const supabase = createServiceRoleClient();

  const { data: client } = await supabase
    .from("customers")
    .select("credits")
    .eq("id", customerId)
    .single();
  if (!client) throw new Error("Customer not found");

  const newCredits = (client.credits || 0) + credits;

  const { error: updateError } = await supabase
    .from("customers")
    .update({ credits: newCredits, updated_at: new Date().toISOString() })
    .eq("id", customerId);
  if (updateError) throw updateError;

  const { error: historyError } = await supabase.from("credits_history").insert({
    customer_id: customerId,
    amount: credits,
    type: "add",
    description: description || "积分购买",
    trade_no: tradeNo,
  });
  if (historyError) throw historyError;

  return newCredits;
}

/** 扣减积分并记录历史 */
export async function useCredits(
  customerId: string,
  credits: number,
  description: string
) {
  const supabase = createServiceRoleClient();

  const { data: client } = await supabase
    .from("customers")
    .select("credits")
    .eq("id", customerId)
    .single();
  if (!client) throw new Error("Customer not found");
  if ((client.credits || 0) < credits) throw new Error("积分不足");

  const newCredits = client.credits - credits;

  const { error: updateError } = await supabase
    .from("customers")
    .update({ credits: newCredits, updated_at: new Date().toISOString() })
    .eq("id", customerId);
  if (updateError) throw updateError;

  const { error: historyError } = await supabase.from("credits_history").insert({
    customer_id: customerId,
    amount: credits,
    type: "subtract",
    description,
  });
  if (historyError) throw historyError;

  return newCredits;
}

