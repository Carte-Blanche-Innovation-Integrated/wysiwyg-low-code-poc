'use client';

import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AntdSchemaComponentProvider, SchemaComponent} from "@nocobase/client";
import * as React from "react";
import {AppHeader} from "@/components/app-header";
import {useAtom} from "jotai";
import {pageData$} from "@/dynamic/page/store";

export default function RootPage({children}: { children: React.ReactNode }) {
  const [pageData, setPageData] = useAtom(pageData$);

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
                  const oldSchema = schema.toJSON();

                  fetch(window.location.pathname, {
                    method: 'post',
                    body: JSON.stringify({
                      action: 'page-schema:change',
                      schema: schema.toJSON()
                    }) as any,
                  })
                    .catch(() => {
                      setPageData((p) => ({...p, schema: oldSchema}) as any);
                    })
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