# Simple Saas Starter Kit CN 中国版

全网最极简的SAAS网站模板，中国版！全面接入微信支付。
帮助开发者快速搭建支持全球用户登录和支付的网站系统。

基于Simple Saas Starter Kit做了简化重构，面向小白的启动套件，进一步降低学习成本。
功能仅包括登录（用户管理）、支付，没了。

对中国大陆开发者友好。


## 🌟 简介

基于 Next.js、Supabase 和 微信支付 生产就绪的启动套件
快速构建具有身份验证、订阅和积分系统的 SaaS 应用程序。


## 核心特色功能

- 🔐 **全面的身份验证系统**
  - 基于Supabase
  - 电子邮件登录支持

- 💳 **完整的支付与订阅系统**
  - 与微信集成，支持扫码付款

- 📱 **响应式设计**



## 快速开始

### 前提条件

- Node.js 18+ 和 npm
- Supabase 账户
- 微信支付 账户

### 步骤 1: 克隆仓库

```bash
git clone https://github.com/fishfl/simple_saas_cn.git
cd simple_saas
```

@@@

强烈建议，先fork代码到自己的仓库里，再执行clone。毕竟你后续还要完善你自己的业务代码。
直接clone这个代码库仅用作演示。

@@@


### 步骤 2: 安装依赖

```bash
npm i
```

### 步骤 3: 开启环境变量
   ```bash
   cp .env.example .env.local
   ```


### 步骤 4: 设置 Supabase

1. 在 [Supabase](https://app.supabase.com) 上创建一个新项目
   - 点击"新建项目"
   - 填写基本信息（项目名称、密码等）

2. Settings > Data API
   - 复制API URL, 粘贴到.env文件中NEXT_PUBLIC_SUPABASE_URL

   同样，Settings > API Keys 
   Legacy anon, service_role API keys
   - 复制anon public 粘贴到NEXT_PUBLIC_SUPABASE_ANON_KEY
   - 复制service_role 粘贴到SUPABASE_SERVICE_ROLE_KEY

3. 配置登录方式
   - 选择【Authentication】>【Sign In / Providers】
   - 开启 email 登录

4. 创建数据库表结构
   - 打开supabase/migrations/20250101000000_init_schema.sql
   - 复制SQL代码到Supabase SQL编辑器
   - 执行SQL创建表结构


### 步骤 5: 设置微信支付

1. 登录到 [微信支付](https://pay.weixin.qq.com/)
2. 如果没有账号，需要先注册开通。
3. 账户中心-商户信息，复制商户号，粘贴至环境变量
4. -API安全，新建商户API证书，复制证书序列号和私钥，粘贴至环境变量
5. -API安全，APIv3密钥，新建并粘贴至环境变量
6. 产品中心-开通Native支付，AppID账号管理里，关联绑定APPID（需要事先在微信公众平台创建个APP）


### 步骤 6: 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看你的应用程序。



```
恭喜，整个开发环境已经跑起来了！！！

接下来我们开始部署到线上！
```


现在，可以去买个自己域名了，或者用Vercel生成的子域名，下面不再提示，都称‘你的域名’
（Vercel生成的子域名访问性不佳，国内有时需要梯子才能访问到）


### 步骤 7: Vercel部署

1. 将代码推送到GitHub
2. 将仓库导入到[Vercel](https://vercel.com)
3. 添加导入所有环境变量
4. 完成部署
5. 修改环境变量BASE_URL、WXPAY_NOTIFY_URL，指向你的域名
WXPAY_NOTIFY_URL=https://你的域名/api/webhooks/wxpay

### 步骤 9: 更新Supabase回调地址
1. 进入Supabase，Authentication > URL Configuration
2. 更新Site URL为：`https://你的域名/`


## 项目结构

```
├── app/                              # Next.js App Router 页面与 API
│   ├── actions.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (auth-pages)/                 # 登录/注册/忘记密码
│   │   ├── layout.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   ├── about/page.tsx
│   ├── api/                          # 业务 API（积分、微信支付、回调）
│   │   ├── credits/route.ts
│   │   ├── webhooks/wxpay/route.ts
│   │   └── wxpay/
│   │       ├── create-order/route.ts
│   │       └── query-order/route.ts
│   ├── auth/callback/route.ts
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── reset-password/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/                       # 页面与通用组件
│   ├── dashboard/
│   │   ├── credits-balance-card.tsx
│   │   └── subscription-status-card.tsx
│   ├── ui/                           # shadcn/ui 组件
│   ├── header.tsx
│   ├── footer.tsx
│   ├── mobile-nav.tsx
│   └── pricing-section.tsx
├── config/subscriptions.ts           # 套餐与积分配置
├── hooks/                            # 自定义 Hooks
├── lib/
│   ├── utils.ts
│   └── wxpay.ts
├── supabase/
│   ├── migrations/20250101000000_init_schema.sql
│   └── scripts/                      # 常用 SQL 脚本
├── types/subscriptions.ts
├── utils/
│   ├── utils.ts
│   └── supabase/                     # client/server/service-role 封装
├── proxy.ts                          # Next.js 请求代理/中间层入口
├── next.config.ts
├── tailwind.config.ts
└── components.json
```
