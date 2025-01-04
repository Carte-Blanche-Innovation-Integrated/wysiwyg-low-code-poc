import App from './app.client';
import {SidebarProvider} from "@/components/ui/sidebar";

export default function () {
  if (App) return (
    <SidebarProvider>
      <App/>
    </SidebarProvider>
  );

  return null;
}
