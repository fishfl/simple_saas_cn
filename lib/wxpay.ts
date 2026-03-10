import crypto from 'crypto';

const BASE = 'https://api.mch.weixin.qq.com';

/** 构造 Authorization 请求头 */
function buildAuth(method: string, url: string, body: string): string {
  const ts = Math.floor(Date.now() / 1000).toString();
  const nonce = crypto.randomBytes(16).toString('hex');
  const { pathname, search } = new URL(url);
  const msg = `${method}\n${pathname}${search}\n${ts}\n${nonce}\n${body}\n`;
  const rawKey = (process.env.WXPAY_PRIVATE_KEY ?? '').replace(/\\n/g, '\n');
  const privateKey = crypto.createPrivateKey({ key: rawKey, format: 'pem' });
  const sig = crypto.createSign('RSA-SHA256').update(msg).sign(privateKey, 'base64');
  return (
    `WECHATPAY2-SHA256-RSA2048 ` +
    `mchid="${process.env.WXPAY_MCH_ID}",` +
    `nonce_str="${nonce}",` +
    `timestamp="${ts}",` +
    `serial_no="${process.env.WXPAY_SERIAL_NO}",` +
    `signature="${sig}"`
  );
}

async function wxRequest<T>(method: string, path: string, body?: object): Promise<T> {
  const url = BASE + path;
  const bodyStr = body ? JSON.stringify(body) : '';
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: buildAuth(method, url, bodyStr),
    },
    ...(bodyStr && { body: bodyStr }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error((data as any).message ?? 'WeChat Pay API error');
  return data as T;
}

/** 创建 Native 支付订单（PC 扫码），返回 code_url */
export function createNativeOrder(params: {
  outTradeNo: string;
  description: string;
  amountFen: number; // 单位：分
  attach: string;    // 透传参数，webhook 原样回传
}) {
  return wxRequest<{ code_url: string }>('POST', '/v3/pay/transactions/native', {
    appid: process.env.WXPAY_APP_ID,
    mchid: process.env.WXPAY_MCH_ID,
    description: params.description,
    out_trade_no: params.outTradeNo,
    notify_url: process.env.WXPAY_NOTIFY_URL,
    attach: params.attach,
    amount: { total: params.amountFen, currency: 'CNY' },
  });
}

/** 查询订单状态 */
export function queryOrder(outTradeNo: string) {
  return wxRequest<{ trade_state: string; attach: string }>(
    'GET',
    `/v3/pay/transactions/out-trade-no/${outTradeNo}?mchid=${process.env.WXPAY_MCH_ID}`
  );
}

/** 解密 Webhook 通知体（AEAD_AES_256_GCM） */
export function decryptResource(resource: {
  ciphertext: string;
  nonce: string;
  associated_data: string;
}): Record<string, unknown> {
  const key = Buffer.from(process.env.WXPAY_API_V3_KEY!, 'utf8');
  const buf = Buffer.from(resource.ciphertext, 'base64');
  const authTag = buf.slice(-16);
  const data = buf.slice(0, -16);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(resource.nonce));
  decipher.setAuthTag(authTag);
  decipher.setAAD(Buffer.from(resource.associated_data));
  const plain = Buffer.concat([decipher.update(data), decipher.final()]);
  return JSON.parse(plain.toString('utf8'));
}
