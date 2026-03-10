import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createNativeOrder } from '@/lib/wxpay';
import { SUBSCRIPTION_TIERS, CREDITS_TIERS } from '@/config/subscriptions';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse('未登录', { status: 401 });

  const { planId } = await request.json();
  const tier = [...SUBSCRIPTION_TIERS, ...CREDITS_TIERS].find(t => t.id === planId);
  if (!tier) return new NextResponse('无效套餐', { status: 400 });

  // 生成唯一商户单号（out_trade_no）
  const outTradeNo = `ord${Date.now()}${crypto.randomBytes(4).toString('hex')}`;
  const productType = tier.creditAmount ? 'credits' : 'subscription';
  // attach 透传用户信息，Webhook 回调时读取
  const attach = `${user.id}|${productType}|${tier.creditAmount ?? 0}|${planId}`;

  try {
    const { code_url } = await createNativeOrder({
      outTradeNo,
      description: tier.name,
      amountFen: tier.amountFen,
      attach,
    });
    return NextResponse.json({ codeUrl: code_url, outTradeNo });
  } catch (err) {
    console.error('WxPay create order error:', err);
    return new NextResponse('支付服务异常', { status: 500 });
  }
}
