import { ProductTier } from "@/types/subscriptions";

export const SUBSCRIPTION_TIERS: ProductTier[] = [
  {
    name: "基础版",
    id: "tier-starter",
    amountFen: 1,       // ¥19/月
    priceDisplay: "¥19",
    description: "适合个人开发者和小项目。",
    durationDays: 30,
    featured: false,
    features: [
      "全球身份认证系统",
      "数据库集成",
      "安全 API 路由",
      "现代化 UI 组件",
      "深色/浅色模式",
      "社区论坛访问",
    ],
  },
  {
    name: "专业版",
    id: "tier-pro",
    amountFen: 1,       // ¥49/月
    priceDisplay: "¥49",
    description: "适合成长中的团队和业务。",
    durationDays: 30,
    featured: true,
    features: [
      "包含基础版所有功能",
      "优先客户支持",
      "高级分析统计",
      "自定义品牌选项",
      "API 使用仪表板",
      "多用户协作",
    ],
  },
  {
    name: "企业版",
    id: "tier-enterprise",
    amountFen: 1,       // ¥99/月
    priceDisplay: "¥99",
    description: "面向大型团队的旗舰方案。",
    durationDays: 30,
    featured: false,
    features: [
      "包含专业版所有功能",
      "专属客户经理",
      "定制实施支持",
      "高并发事务处理",
      "高级安全特性",
      "服务级别协议 (SLA)",
    ],
  },
];

export const CREDITS_TIERS: ProductTier[] = [
  {
    name: "基础积分包",
    id: "tier-3-credits",
    amountFen: 1,        // ¥9 一次性
    priceDisplay: "¥9",
    description: "3 积分，适合小规模测试使用。",
    creditAmount: 3,
    featured: false,
    features: [
      "3 积分",
      "永不过期",
      "标准功能访问",
      "社区支持",
    ],
  },
  {
    name: "标准积分包",
    id: "tier-6-credits",
    amountFen: 1,       // ¥13 一次性
    priceDisplay: "¥13",
    description: "6 积分，适合中等规模应用。",
    creditAmount: 6,
    featured: true,
    features: [
      "6 积分",
      "永不过期",
      "优先处理",
      "邮件支持",
    ],
  },
  {
    name: "高级积分包",
    id: "tier-9-credits",
    amountFen: 1,       // ¥29 一次性
    priceDisplay: "¥29",
    description: "9 积分，适合生产环境大规模使用。",
    creditAmount: 9,
    featured: false,
    features: [
      "9 积分",
      "永不过期",
      "高级支持",
      "优先处理",
    ],
  },
];

