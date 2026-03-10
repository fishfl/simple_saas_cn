"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Globe, CheckCircle2 } from "lucide-react";
import { PricingSection } from "@/components/pricing-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background -z-10" />
        
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                v1.0 版本已上线
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                几天搭建你的 SaaS，<br className="hidden sm:inline" />
                不必再等几个月。
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
                基于 Next.js、Supabase 和微信支付的生产级启动模板，帮助你节省 200+ 小时开发时间。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            >
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-lg gap-2">
                  立即开始 <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-lg">
                  查看功能
                </Button>
              </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> 无需信用卡</div>
              <div className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> 7 天免费试用</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">你需要的核心能力都在这里</h2>
            <p className="text-muted-foreground text-lg">采用现代技术栈，开箱即用。</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background p-8 rounded-xl border hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 border-y">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
       {/* CTA Section */}
       <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">准备好开始你的下一个产品了吗？</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-lg">
              使用简易 SaaS 启动套件，更快完成从想法到上线。
            </p>
            <Link href="/sign-up">
                <Button size="lg" variant="secondary" className="h-12 px-8 text-lg">
                立即创建
                </Button>
            </Link>
        </div>
      </section>

      <PricingSection/>

    </div>
  );
}

const features = [
  {
    title: "Next.js 14 App Router",
    description: "基于 Next.js 14 与 Server Components，兼顾性能与 SEO。",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Supabase 认证与数据库",
    description: "内置生产可用的用户认证与 PostgreSQL 数据能力。",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "微信支付集成",
    description: "支持订阅、一次性购买与积分支付，适配国内场景。",
    icon: <Globe className="w-6 h-6" />,
  },
];

const stats = [
  { value: "10x", label: "开发提效" },
  { value: "100+", label: "UI 组件" },
  { value: "TS", label: "TypeScript 优先" },
  { value: "7x24", label: "持续迭代" },
];
