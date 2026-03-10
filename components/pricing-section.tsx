"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import { useUser } from "@/hooks/use-user";
import { useToast } from "@/hooks/use-toast";
import { SUBSCRIPTION_TIERS, CREDITS_TIERS } from "@/config/subscriptions";
import { ProductTier } from "@/types/subscriptions";

interface PricingSectionProps {
  className?: string;
}

export function PricingSection({ className }: PricingSectionProps) {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [qrModal, setQrModal] = useState<{ codeUrl: string; outTradeNo: string } | null>(null);

  // 轮询支付状态
  useEffect(() => {
    if (!qrModal) return;
    const timer = setInterval(async () => {
      try {
        const res = await fetch(`/api/wxpay/query-order?outTradeNo=${qrModal.outTradeNo}`);
        if (!res.ok) return;
        const { status } = await res.json();
        if (status === "SUCCESS") {
          clearInterval(timer);
          setQrModal(null);
          toast({ title: "支付成功 🎉", description: "即将跳转到控制台..." });
          setTimeout(() => router.push("/dashboard"), 1500);
        }
      } catch {}
    }, 2000);
    return () => clearInterval(timer);
  }, [qrModal]);

  const handlePurchase = async (tier: ProductTier) => {
    if (!user) {
      toast({ title: "请先登录", description: "购买前需要登录账号。", variant: "destructive" });
      router.push("/sign-in");
      return;
    }
    setIsProcessing(tier.id);
    try {
      const res = await fetch("/api/wxpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: tier.id }),
      });
      if (!res.ok) throw new Error("创建订单失败");
      const { codeUrl, outTradeNo } = await res.json();
      setQrModal({ codeUrl, outTradeNo });
    } catch {
      toast({ title: "创建订单失败", description: "请稍后重试。", variant: "destructive" });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <section id="pricing" className={`w-full py-16 bg-muted/30 ${className}`}>
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            简单透明的定价
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            选择最适合你的方案，微信扫码即可完成支付。
          </p>
        </div>

        <Tabs defaultValue="subscription" className="w-full flex flex-col items-center">
          <TabsList className="mb-8">
            <TabsTrigger value="subscription">订阅套餐</TabsTrigger>
            <TabsTrigger value="credits">积分套餐</TabsTrigger>
          </TabsList>

          <TabsContent value="subscription" className="w-full">
            <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
              {SUBSCRIPTION_TIERS.map((tier, index) => (
                <PricingCard key={tier.id} tier={tier} index={index} isProcessing={isProcessing} onPurchase={handlePurchase} type="subscription" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="credits" className="w-full">
            <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
              {CREDITS_TIERS.map((tier, index) => (
                <PricingCard key={tier.id} tier={tier} index={index} isProcessing={isProcessing} onPurchase={handlePurchase} type="credits" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 微信支付二维码弹窗 */}
      <Dialog open={!!qrModal} onOpenChange={(open) => !open && setQrModal(null)}>
        <DialogContent className="sm:max-w-sm flex flex-col items-center gap-4">
          <DialogHeader>
            <DialogTitle className="text-center">微信扫码支付</DialogTitle>
          </DialogHeader>
          {qrModal && (
            <div className="p-4 bg-white rounded-lg">
              <QRCode value={qrModal.codeUrl} size={200} />
            </div>
          )}
          <p className="text-sm text-muted-foreground text-center">
            请用微信扫描上方二维码完成支付
            <br />
            支付完成后页面将自动跳转
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function PricingCard({
  tier, index, isProcessing, onPurchase, type,
}: {
  tier: ProductTier;
  index: number;
  isProcessing: string | null;
  onPurchase: (tier: ProductTier) => void;
  type: "subscription" | "credits";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <Card className={`h-full flex flex-col ${tier.featured ? "border-primary shadow-lg scale-105 z-10" : "border-border"}`}>
        {tier.featured && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-primary px-3 py-1">最受欢迎</Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-2xl">{tier.name}</CardTitle>
          <CardDescription>{tier.description}</CardDescription>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-bold">{tier.priceDisplay}</span>
            <span className="text-muted-foreground ml-1">
              {type === "subscription" ? "/月" : " 一次性"}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <ul className="space-y-3">
            {tier.features?.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant={tier.featured ? "default" : "outline"}
            onClick={() => onPurchase(tier)}
            disabled={isProcessing === tier.id}
          >
            {isProcessing === tier.id ? "处理中..." : "立即购买"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

