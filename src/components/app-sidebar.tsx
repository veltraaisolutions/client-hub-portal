"use client";

import * as React from "react";
import { LayoutDashboard, BarChart3, Receipt, Command } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  SidebarGroup,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Stats", url: "/dashboard/stats", icon: BarChart3 },
  { title: "Records", url: "/dashboard/records", icon: Receipt },
];

export function AppSidebar() {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border bg-secondary/30" // Professional Off-White
    >
      <SidebarHeader className="p-6 border-b border-border bg-background">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden">
          <div className="flex aspect-square size-7 items-center justify-center rounded-none bg-primary text-primary-foreground">
            <Command className="size-4" />
          </div>
          <span className="truncate font-bold text-foreground tracking-tighter uppercase italic text-lg">
            Asset
            <span className="not-italic font-light text-primary">Core</span>
          </span>
        </div>
        <div className="group-data-[collapsible=icon]:block hidden">
          <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors" />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-background/50">
        <SidebarGroup>
          <SidebarMenu className="gap-2 px-2 pt-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`py-6 rounded-none transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary border-r-4 border-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-4"
                    >
                      <item.icon
                        className={`size-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <span className="font-bold uppercase tracking-widest text-[11px]">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border bg-background">
        <div className="flex items-center gap-3 px-2 py-2">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "rounded-none size-8 border border-border",
              },
            }}
          />
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-bold text-foreground text-xs uppercase tracking-tight">
              {user?.fullName || "Institutional User"}
            </span>
            <span className="truncate text-[10px] text-muted-foreground font-medium">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
