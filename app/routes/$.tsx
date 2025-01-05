import App from './app.client';
import {SidebarProvider} from "@/components/ui/sidebar";
import {useEffect, useState} from "react";

export default function () {
  const [loaded, setLoaded] = useState(false);

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
