"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Database, Lock, UserCheck, Globe } from "lucide-react";

export default function PrivacyPage() {
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
              <h1 className="text-xl font-bold">隐私政策</h1>
              <p className="text-sm text-muted-foreground">我们如何收集、使用和保护你的数据</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-4">
              <Shield className="mr-2 h-4 w-4" />
              你的隐私很重要
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">隐私政策</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              我们承诺在你使用本服务时，合法、正当、必要地处理个人信息，并通过透明规则说明用途与边界。
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>最近更新：</strong>2026 年 3 月 9 日
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">透明公开</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">我们会清晰说明收集哪些信息、为何收集以及如何使用。</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">安全保护</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">采用行业通行的加密、访问控制和审计手段保障数据安全。</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <UserCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">用户可控</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">你可查询、更正或删除个人信息，并管理授权范围。</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Database className="h-6 w-6 text-primary" />
                我们收集的信息
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">你主动提供的信息</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 账号信息：邮箱、登录凭证等</li>
                    <li>• 业务信息：你在产品中提交和保存的数据</li>
                    <li>• 支付信息：订单号、支付状态等必要交易信息</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">我们自动收集的信息</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 设备与日志信息：浏览器类型、操作系统、访问日志</li>
                    <li>• 使用行为信息：页面访问、功能使用、错误日志</li>
                    <li>• Cookie 与本地存储：用于登录态维持和体验优化</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">我们如何使用信息</h3>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3">服务提供</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 提供注册、登录、支付和订阅能力</li>
                    <li>• 识别与处理订单、发放积分和权益</li>
                    <li>• 提供客服支持与故障排查</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">服务优化</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 分析使用情况以改进产品体验</li>
                    <li>• 提升系统稳定性与安全性</li>
                    <li>• 推送必要的服务通知</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Globe className="h-6 w-6 text-primary" />
                信息共享与披露
              </h3>

              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>我们不会出售你的个人信息。</strong>仅在以下必要情形中共享：
                </p>
                <ul className="space-y-2">
                  <li>• 服务合作方：如支付、云服务、监控服务提供商</li>
                  <li>• 法律要求：依法配合监管、司法或行政机关</li>
                  <li>• 业务变更：在并购或资产重组中依法处理信息</li>
                  <li>• 你的授权：经你明确同意后共享</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="space-y-8"
          >
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">你的权利</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3">访问与更正</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 查询你的个人信息</li>
                    <li>• 更正或补充不准确信息</li>
                    <li>• 下载与导出可获取数据</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">删除与撤回</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 申请删除账号及相关信息</li>
                    <li>• 撤回非必要授权</li>
                    <li>• 管理 Cookie 偏好设置</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="space-y-8"
          >
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">数据安全与保存期限</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>我们通过加密传输、权限隔离、最小化访问和监控告警等措施保护你的信息安全。</p>
                <p>我们仅在实现本政策目的所需的最短期限内保存信息，法律法规另有规定的除外。</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
