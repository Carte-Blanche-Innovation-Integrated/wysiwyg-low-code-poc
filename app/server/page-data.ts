import type {LoaderFunctionArgs} from "@remix-run/node";
import {prisma} from "@/db.server";

export function pageDataLoader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pageId = url.pathname.split("/").pop();

  if (!pageId) {
    return null;
  }

  return prisma.page.findFirst({
    where: {
      id: pageId,
    }
  });
}