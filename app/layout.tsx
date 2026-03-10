import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "next-themes";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const baseUrl = process.env.BASE_URL
  ? `${process.env.BASE_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: "简易 SaaS 启动套件",
  description: "基于 Next.js、Supabase 与微信支付的国内 SaaS 启动模板，内置登录、订阅和积分能力。",
  keywords: "Next.js 启动模板, SaaS 脚手架, Supabase, 微信支付, TypeScript",
  openGraph: {
    title: "简易 SaaS 启动套件",
    description: "基于 Next.js、Supabase 与微信支付的国内 SaaS 启动模板，内置登录、订阅和积分能力。",
    type: "website",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "简易 SaaS 启动套件",
    description: "基于 Next.js、Supabase 与微信支付的国内 SaaS 启动模板，内置登录、订阅和积分能力。",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <Header user={user} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
