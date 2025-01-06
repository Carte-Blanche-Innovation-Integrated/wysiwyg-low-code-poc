import type {LoaderFunctionArgs} from "@remix-run/node";
import {prisma} from "@/db.server";

export function getPageId({request}: Pick<LoaderFunctionArgs, 'request'>) {
  const url = new URL(request.url);
  return url.pathname.split("/").pop();
}

export function pageDataLoader({request}: LoaderFunctionArgs) {
  const pageId = getPageId({request});

  if (!pageId) {
    return null;
  }

  return prisma.page.findFirst({
    where: {
      id: pageId,
    }
  });
}