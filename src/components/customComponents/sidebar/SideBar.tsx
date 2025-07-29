"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@components/components/ui/sidebar";
import {
  Refrigerator,
  Home,
  Search,
  Settings,
  CookingPot,
  ListChecks,
  KeyRound,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import LinkWrapper from "./LinkWrapper";
import { useSession, signOut } from "next-auth/react";

export function AppSidebar() {
  const { status } = useSession();

  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Fridge",
      url: "/fridge",
      icon: Refrigerator,
    },
    {
      title: "recipes",
      url: "/recipes",
      icon: CookingPot,
    },
    {
      title: "My list",
      url: "/list",
      icon: ListChecks,
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      show: status === "authenticated",
    },
    {
      title: "Register",
      url: "/register",
      icon: UserPlus,
      user: true,
      show: status === "unauthenticated",
    },
    {
      title: "Login",
      url: "/login",
      icon: KeyRound,
      user: true,
      show: status === "unauthenticated",
    },
    {
      title: "Logout",
      icon: KeyRound,
      user: true,
      show: status === "authenticated",
      event: signOut,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Get Your Recipie</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items
                .filter((item) => item.show === undefined || item.show)
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {item.user ? (
                        <Link
                          href={item.url || "#"}
                          onClick={
                            item.event
                              ? (e) => {
                                  e.preventDefault();
                                  item.event();
                                }
                              : undefined
                          }
                        >
                          <LinkWrapper>
                            <item.icon />
                            <span>{item.title}</span>
                          </LinkWrapper>
                        </Link>
                      ) : (
                        <Link href={item.url || "#"}>
                          <LinkWrapper>
                            <item.icon />
                            <span>{item.title}</span>
                          </LinkWrapper>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
