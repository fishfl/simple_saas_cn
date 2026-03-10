import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function SignUp(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">创建账号</h1>
        <p className="text-sm text-muted-foreground">
          注册后即可使用登录、支付与订阅能力
        </p>
      </div>
      <div className="grid gap-6">
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              name="email"
              placeholder="请输入邮箱"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="请输入密码"
              autoComplete="current-password"
              required
            />
          </div>
          <SubmitButton
            className="w-full"
            pendingText="注册中..."
            formAction={signUpAction}
          >
            注册
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>
        <div className="text-sm text-muted-foreground text-center">
          已有账号？{" "}
          <Link
            href="/sign-in"
            className="text-primary underline underline-offset-4 hover:text-primary/90"
          >
            去登录
          </Link>
        </div>
      </div>
    </>
  );
}
