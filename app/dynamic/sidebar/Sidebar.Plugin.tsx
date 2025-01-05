import {Plugin} from "@nocobase/client";
import {
  SidebarMenuItemWrapper,
  SidebarMenuSubItemWrapper,
  SidebarMenuWrapper,
  SidebarSubMenuWrapper
} from "@/dynamic/sidebar/Sidebar.Components";
import {SidebarInitializer} from "@/dynamic/sidebar/Sidebar.Initializer";

export class SidebarPlugin extends Plugin {
  async load() {
    this.schemaInitializerManager.add(SidebarInitializer);
    this.app.addComponents({
      'Sidebar.Menu': SidebarMenuWrapper as any,
      'Sidebar.Menu.Item': SidebarMenuItemWrapper,
      'Sidebar.SubMenu': SidebarSubMenuWrapper as any,
      'Sidebar.SubMenu.Item': SidebarMenuSubItemWrapper,
    })
  }
}