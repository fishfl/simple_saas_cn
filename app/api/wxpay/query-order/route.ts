import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { queryOrder } from '@/lib/wxpay';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse('Unauthorized', { status: 401 });

  const outTradeNo = request.nextUrl.searchParams.get('outTradeNo');
  if (!outTradeNo) return new NextResponse('Missing outTradeNo', { status: 400 });

  try {
    const order = await queryOrder(outTradeNo);
    // 通过 attach 字段验证该订单属于当前用户
    const [ownerUserId] = (order.attach ?? '').split('|');
    if (ownerUserId !== user.id) {
      return new NextResponse('Forbidden', { status: 403 });
    }
    return NextResponse.json({ status: order.trade_state });
  } catch {
    // 订单未支付或查询失败，返回 NOTPAY
    return NextResponse.json({ status: 'NOTPAY' });
  }
}
