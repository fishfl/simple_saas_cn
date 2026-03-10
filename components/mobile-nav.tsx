"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { signOutAction } from "@/app/actions";

interface MobileNavProps {
  items: { label: string; href: string }[];
  user: any;
  isDashboard: boolean;
}

export function MobileNav({ items, user, isDashboard }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">切换菜单</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>导航</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t">
          {user ? (
            <div className="flex flex-col gap-2">
              {user.email && (
                <p className="text-sm text-muted-foreground">{user.email}</p>
              )}
              {!isDashboard && (
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard">控制台</Link>
                </Button>
              )}
              <form action={signOutAction} className="w-full">
                <Button type="submit" variant="outline" className="w-full">
                  退出登录
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/sign-in">登录</Link>
              </Button>
              <Button asChild variant="default" className="w-full">
                <Link href="/sign-up">注册</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
