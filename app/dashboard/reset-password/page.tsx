import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-10">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          重置密码
        </h1>
        <p className="text-sm text-muted-foreground">
          请输入你的新密码。
        </p>
      </div>
      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="password">新密码</Label>
          <Input
            type="password"
            name="password"
            placeholder="请输入新密码"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">确认密码</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="请再次输入新密码"
            required
          />
        </div>
        <SubmitButton formAction={resetPasswordAction}>
          更新密码
        </SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </div>
  );
}
