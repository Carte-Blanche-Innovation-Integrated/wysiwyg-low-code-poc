'use client';

import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {AntdSchemaComponentProvider, Grid, SchemaComponent} from "@nocobase/client";
import * as React from "react";

export default function RootPage({children}: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger/>
            <Separator orientation="vertical" className="mr-2 h-4"/>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block"/>
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <AntdSchemaComponentProvider>
            <SchemaComponent
              schema={{
                "type": "void",
                "x-component": "Page",
                "properties": {
                  "grid": {
                    "type": "void",
                    "x-component": "Grid",
                    "x-initializer": "Page.Initializer",
                    "properties": {
                      "jee9c4dbudf": {
                        "version": "2.0",
                        "type": "void",
                        "x-component": "Grid.Row",
                        "x-app-version": "1.4.17",
                        "properties": {
                          "oyfmhmkidcl": {
                            "version": "2.0",
                            "type": "void",
                            "x-component": "Grid.Col",
                            "x-app-version": "1.4.17",
                            "properties": {
                              "yn2k746khfa": {
                                "version": "2.0",
                                "type": "void",
                                "x-settings": "blockSettings:markdown",
                                "x-decorator": "CardItem",
                                "x-decorator-props": {
                                  "name": "markdown",
                                  "engine": "handlebars"
                                },
                                "x-component": "Markdown.Void",
                                "x-editable": false,
                                "x-component-props": {
                                  "content": "This is a demo text, **supports Markdown syntax**."
                                },
                                "x-app-version": "1.4.17",
                                "x-uid": "itd744gmt3e",
                                "x-async": false,
                                "x-index": 1
                              }
                            },
                            "x-uid": "32c37je0ikk",
                            "x-async": false,
                            "x-index": 1
                          }
                        },
                        "x-uid": "ggxahyqtjx2",
                        "x-async": false,
                        "x-index": 1
                      }
                    },
                    "x-uid": "vt1dzpieu11",
                    "x-async": false,
                    "x-index": 1
                  }
                }
              }
            }
            />
          </AntdSchemaComponentProvider>
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}