"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Users, Globe, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 md:px-6 py-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                返回首页
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">关于我们</h1>
              <p className="text-sm text-muted-foreground">了解项目定位、愿景与发展方向</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-4">
              <span className="mr-2">🚀</span>
              面向国内开发者的 SaaS 启动模板
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              用更短时间，
              <br />
              搭建可上线的业务系统
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              我们专注于提供简洁、可维护、可扩展的基础能力，帮助你从登录、支付、订阅和积分体系快速起步，
              把精力集中在真正有差异化的业务功能上。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>我们的使命</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  让更多开发者以更低门槛进入 SaaS 创业与产品验证阶段，降低从 0 到 1 的技术成本。
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>我们的用户</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  适用于独立开发者、初创团队和企业内部创新项目，支持快速试错与持续迭代。
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>产品方向</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  当前聚焦国内场景，优先完善手机号/邮箱登录、微信支付、订阅运营和数据分析闭环。
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-primary" />
                项目故事
              </h3>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  我们在多个项目里反复遇到同样的问题：业务还没开始，登录、支付、订阅、权限这些基础设施就要先花很久搭建。
                </p>
                <p>
                  于是这个模板诞生了。它不是“大而全”的框架，而是把最常见、最刚需的模块整理成一套清晰的起步方案。
                </p>
                <p>
                  你可以把它当作业务地基，在此基础上持续叠加你的产品能力，而不是每次都从零造轮子。
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">我们的原则</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">以下原则指导我们持续迭代这个模板</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">简单优先</h4>
                  <p className="text-muted-foreground">减少过度封装，保持代码结构直观，便于快速上手和长期维护。</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">实战导向</h4>
                  <p className="text-muted-foreground">优先内置真实业务必需模块，而非仅用于演示的“漂亮功能”。</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">国内适配</h4>
                  <p className="text-muted-foreground">围绕国内支付与运营场景优化默认配置，降低上线阻力。</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">持续演进</h4>
                  <p className="text-muted-foreground">保持模块化设计，让你能按业务节奏逐步扩展功能。</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-2xl font-bold mb-4">准备开始构建你的产品了吗？</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              立即基于这套模板启动项目，把时间花在真正创造价值的业务功能上。
            </p>
            <Button asChild size="lg" className="font-medium">
              <Link href="/">回到首页开始使用</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
