'use client';

import {Application, Plugin} from "@nocobase/client";
import RootPage from "./root";

class RootPlugin extends Plugin {
  async load() {
    this.router.add("root", {
      path: "/",
      Component: RootPage,
    });
  }
}

const app = new Application({
  router: {
    type: "memory",
  },
  plugins: [
    RootPlugin
  ],
});

export default app.getRootComponent();
