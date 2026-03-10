import { NextResponse } from 'next/server';
import { decryptResource } from '@/lib/wxpay';
import {
  ensureCustomer,
  createOrUpdateSubscription,
  addCreditsToCustomer,
} from '@/utils/supabase/subscriptions';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const event = JSON.parse(body);

    // 只处理支付成功事件
    if (event.event_type !== 'TRANSACTION.SUCCESS') {
      return NextResponse.json({ code: 'SUCCESS', message: 'ignored' });
    }

    // 解密通知体（AEAD_AES_256_GCM，使用 API v3 密钥）
    const tx = decryptResource(event.resource) as {
      out_trade_no: string;
      trade_state: string;
      attach: string;
    };

    if (tx.trade_state !== 'SUCCESS') {
      return NextResponse.json({ code: 'SUCCESS', message: 'not success' });
    }

    // 从 attach 中还原下单时写入的用户信息
    const [userId, productType, creditsStr, planId] = tx.attach.split('|');
    const customerId = await ensureCustomer(userId);

    if (productType === 'credits') {
      await addCreditsToCustomer(
        customerId,
        Number(creditsStr),
        tx.out_trade_no,
        `购买 ${creditsStr} 积分`
      );
    } else {
      await createOrUpdateSubscription({
        tradeNo: tx.out_trade_no,
        planId,
        customerId,
      });
    }

    return NextResponse.json({ code: 'SUCCESS', message: '成功' });
  } catch (err) {
    console.error('WxPay webhook error:', err);
    // 返回 SUCCESS 避免微信重复推送，错误已记录日志
    return NextResponse.json({ code: 'SUCCESS', message: 'error logged' });
  }
}
