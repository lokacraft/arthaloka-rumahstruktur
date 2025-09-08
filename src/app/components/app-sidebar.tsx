"use client";

import * as React from "react";
import {
  ArrowUpCircleIcon,
  ChartLine,
  FolderIcon,
  Handshake,
  Newspaper,
  Users,
} from "lucide-react";

import { NavUser } from "@/app/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";

import { usePathname } from "next/navigation";
import { useUser } from "@/lib/auth"; // 🔑 auth hook

const data = {
  navMain: [
    {
      title: "Testimoni",
      url: "/admin/table/testimoni",
      icon: Users,
    },
    {
      title: "Partnerships",
      url: "/admin/table/partnerships",
      icon: Handshake,
    },
    {
      title: "Blogs",
      url: "/admin/table/blogs",
      icon: Newspaper,
    },
    {
      title: "Portofolio",
      url: "/admin/table/portofolio",
      icon: FolderIcon,
    },
    {
      title: "SEO Analyzer",
      url: "/admin/SEO-Analyzer",
      icon: ChartLine,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const user = useUser();

  // handle user masih loading / belum login
  if (user === false) return null;
  if (user === null) return null;

  // potong nama dari email
  const displayName = user.email ? user.email.split("@")[0] : "User";

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Rumah Struktur</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {data.navMain.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-teal-600 text-white"
                      : "hover:bg-teal-100 text-gray-700"
                  }`}
                >
                  <a href={item.url}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: displayName,
            email: user.email || "",
            avatar: "/icons/avatar.png", // default avatar
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
