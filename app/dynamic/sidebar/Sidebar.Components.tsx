import {useFieldSchema} from "@formily/react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuSubItem, SidebarMenuSubButton
} from "@/components/ui/sidebar";

export function SidebarMenuItemWrapper() {
  const schema = useFieldSchema();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a href={`/${(schema as any).id}`}>
          <span>{schema.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function SidebarMenuWrapper({children}: {children: React.ReactNode}) {
  return (
    <SidebarMenu>
      {children}
    </SidebarMenu>
  )
}

export function SidebarSubMenuWrapper({children}: {children: React.ReactNode}) {
  const schema = useFieldSchema();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        <span>{schema.title}</span>
      </SidebarMenuButton>
      <SidebarMenuSub>
        {children}
      </SidebarMenuSub>
    </SidebarMenuItem>
  )
}

export function SidebarMenuSubItemWrapper() {
  const schema = useFieldSchema();

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton>
        <span>{schema.title}</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  )
}
