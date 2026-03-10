import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          重置密码
        </h1>
        <p className="text-sm text-muted-foreground">
          输入你的邮箱，我们会发送重置密码链接
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
          <SubmitButton
            className="w-full"
            formAction={forgotPasswordAction}
            pendingText="发送中..."
          >
            发送重置链接
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>
        <div className="text-sm text-muted-foreground text-center">
          想起密码了？{" "}
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
