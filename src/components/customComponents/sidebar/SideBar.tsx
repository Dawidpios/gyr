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
import { Refrigerator, Home, Search, Settings, CookingPot } from "lucide-react";
import Link from "next/link";
import LinkWrapper from "./LinkWrapper";

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
    title: "Recipies",
    url: "/recipies",
    icon: CookingPot,
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
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Get Your Recipie</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    
                      <Link href={item.url}>
                      <LinkWrapper>
                        <item.icon />
                        <span>{item.title}</span>
                        </LinkWrapper>
                      </Link>
                    
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
