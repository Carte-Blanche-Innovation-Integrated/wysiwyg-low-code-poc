'use client';

import {Application, BlockItem, CardItem, Grid, Plugin, SchemaToolbar} from "@nocobase/client";
import RootPage from "./root";
import {useFieldSchema} from "@formily/react";
import {SidebarPlugin} from "@/dynamic/sidebar/Sidebar.Plugin";

const MyToolbar = () => {
  return <SchemaToolbar showBackground title='Test'/>
}

class RootPlugin extends Plugin {
  async load() {
    this.app.addComponents({
      MyToolbar,
      Grid,
      BlockItem,
      CardItem,
      Hello,
    })
    this.router.add("root", {
      path: "/",
      Component: RootPage,
    });
  }
}

const Hello = () => {
  const schema = useFieldSchema();
  return <h1>Hello, world! {schema.name}</h1>;
};

const app = new Application({
  router: {
    type: "memory",
  },
  plugins: [
    RootPlugin,
    SidebarPlugin
  ],
});

export default app.getRootComponent();
