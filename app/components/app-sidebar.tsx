import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup, SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {Switch} from "@/components/ui/switch";
import {Label} from "@radix-ui/react-label";
import {SchemaComponent, useSchemaComponentContext} from "@nocobase/client";
import {sidebarSchema$} from "@/dynamic/sidebar/store";
import {useAtom} from "jotai";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {designable, setDesignable} = useSchemaComponentContext();
  const [sidebarSchema] = useAtom(sidebarSchema$)

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Dynamic UI Demo</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Label>
                    <span className="flex-1">Enable UI Customizations</span>
                    <Switch checked={designable} onCheckedChange={setDesignable}/>
                  </Label>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SchemaComponent schema={sidebarSchema} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
