import Link from "next/link";
import { Rocket } from "lucide-react";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      <div className="flex items-center justify-center p-1 bg-primary/10 rounded-md">
        <Rocket className="w-5 h-5 text-primary" />
      </div>
      <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        简易 SaaS 启动套件
      </span>
    </Link>
  );
}
