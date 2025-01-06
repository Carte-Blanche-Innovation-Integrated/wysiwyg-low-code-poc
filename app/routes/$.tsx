import App from './app.client';
import {SidebarProvider} from "@/components/ui/sidebar";
import {useEffect, useState} from "react";
import {sidebarSchemaLoader} from "@/server/sidebar-schema";
import {useLoaderData} from "@remix-run/react";
import {useHydrateAtoms} from "jotai/utils";
import {sidebarSchema$} from "@/dynamic/sidebar/store";
import {getPageId, pageDataLoader} from "@/server/page-data";
import type {ActionFunctionArgs, LoaderFunctionArgs} from "@remix-run/node";
import {pageData$} from "@/dynamic/page/store";
import {prisma} from "@/db.server";

export const loader = async function loader(args: LoaderFunctionArgs) {
  const [sidebarSchema, pageData] = await Promise.all([
    sidebarSchemaLoader(),
    pageDataLoader(args),
  ]);

  return {sidebarSchema, pageData};
};

export const action = async ({request}: ActionFunctionArgs) => {
  const data = await request.json();
  const pageId = getPageId({request});

    console.log(data);
  if (data.action === 'page-schema:change' && pageId) {
    await prisma.page.update({
      where:{
        id: pageId,
      },
      data: {
        schema: data.schema,
      }
    });
    return {result: 'ok'};
  }
}

export default function () {
  const [loaded, setLoaded] = useState(false);
  const {sidebarSchema, pageData} = useLoaderData<typeof loader>();

  useHydrateAtoms([
    [sidebarSchema$, sidebarSchema],
    [pageData$, pageData as any],
  ]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (App && loaded) return (
    <SidebarProvider>
      <App/>
    </SidebarProvider>
  );

  return null;
}
