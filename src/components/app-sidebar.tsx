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

const menuItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Stats", url: "/dashboard/stats", icon: BarChart3 },
  { title: "Records", url: "/dashboard/records", icon: Receipt },
];

export function AppSidebar() {
  const { user } = useUser();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/5 bg-zinc-950"
    >
      <SidebarHeader className="p-4 border-b border-white/5 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden">
          <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-white text-black">
            <Command className="size-4" />
          </div>
          <span className="truncate font-semibold text-white tracking-tighter uppercase italic">
            AssetCore
          </span>
        </div>
        <SidebarTrigger className="text-zinc-400 hover:bg-zinc-900 transition-colors" />
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="py-6"
                >
                  <Link href={item.url}>
                    <item.icon className="text-zinc-400" />
                    <span className="text-zinc-300 font-medium">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-1 py-1.5">
          <UserButton />
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold text-white">
              {user?.fullName || "User"}
            </span>
            <span className="truncate text-[10px] text-zinc-500">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
