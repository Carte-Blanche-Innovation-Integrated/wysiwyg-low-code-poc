'use client';

import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AntdSchemaComponentProvider, SchemaComponent} from "@nocobase/client";
import * as React from "react";
import {AppHeader} from "@/components/app-header";
import {useAtom} from "jotai";
import {pageData$} from "@/dynamic/page/store";

export default function RootPage({children}: { children: React.ReactNode }) {
  const [pageData] = useAtom(pageData$);

  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <AppHeader/>

        <div className="flex flex-1 flex-col gap-4 p-6">
          {pageData && (
            <AntdSchemaComponentProvider>
              <SchemaComponent
                onChange={(schema) => {
                  console.log(schema.toJSON());
                }}
                schema={pageData.schema as any}
              />
            </AntdSchemaComponentProvider>
          )}
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}