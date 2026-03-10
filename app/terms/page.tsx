"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, XCircle, Users } from "lucide-react";

export default function TermsPage() {
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
              <h1 className="text-xl font-bold">服务条款</h1>
              <p className="text-sm text-muted-foreground">使用本服务前请仔细阅读以下条款</p>
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
              <Scale className="mr-2 h-4 w-4" />
              使用规范与法律约定
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">服务条款</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              本条款适用于你对本网站及相关服务的访问和使用。继续使用即表示你已阅读并同意本条款。
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
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">你可以做什么</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">按条款正常使用服务、购买套餐、管理账号与数据。</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">你不可以做什么</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">不得滥用服务、实施违法行为、攻击系统或侵犯他人权益。</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">我们的承诺</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">持续提供稳定服务、保护用户权益，并不断优化产品体验。</p>
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
                <FileText className="h-6 w-6 text-primary" />
                服务说明
              </h3>

              <div className="space-y-4 text-muted-foreground">
                <p>本服务为 SaaS 启动模板及相关在线能力，核心包含账号体系、订阅管理、积分与支付流程。</p>
                <ul className="space-y-2">
                  <li>• 基础功能：注册登录、控制台、基础数据读写</li>
                  <li>• 付费功能：订阅套餐、积分购买与支付回调处理</li>
                  <li>• 运营能力：订单状态查询、权限与状态展示</li>
                </ul>
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
              <h3 className="text-2xl font-bold mb-6">用户义务</h3>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">合规使用</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 提供真实、准确、完整的注册信息</li>
                    <li>• 妥善保管账号与密码</li>
                    <li>• 遵守法律法规和公序良俗</li>
                    <li>• 发现异常及时联系我们处理</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-red-700">禁止行为</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 任何破坏系统稳定性的行为</li>
                    <li>• 逆向工程、批量爬取或未授权调用</li>
                    <li>• 冒用他人身份或传播违法内容</li>
                    <li>• 将服务用于诈骗、侵权等非法目的</li>
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
              <h3 className="text-2xl font-bold mb-6">知识产权</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>平台代码、界面设计、品牌标识和文档内容等知识产权归我们或相关权利人所有。</p>
                <p>未经书面授权，你不得复制、修改、传播或商业化使用平台核心资产。</p>
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
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                免责声明与责任限制
              </h3>

              <div className="space-y-4 text-muted-foreground">
                <p>我们将尽力保障服务连续性，但不保证服务绝对不中断或完全无错误。</p>
                <p>因不可抗力、网络故障、第三方服务异常等导致的损失，我们将在法律允许范围内承担责任。</p>
                <p>在法律允许范围内，我们对间接损失、预期收益损失不承担赔偿责任。</p>
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
              <h3 className="text-2xl font-bold mb-6">付费与退款</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>套餐和积分的价格、有效期、权益范围以支付页面展示为准。</p>
                <p>除法律法规另有规定外，已消费权益通常不支持退款；如出现重复扣款等异常，可联系客服处理。</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
