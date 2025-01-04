'use client';

import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset} from "@/components/ui/sidebar";

export default function RootPage({children}: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar/>
      <SidebarInset>
        {children}
      </SidebarInset>
    </>
  )
}