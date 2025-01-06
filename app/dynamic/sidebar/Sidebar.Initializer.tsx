import {
  Grid,
  SchemaInitializer,
  SchemaInitializerItem,
  useSchemaInitializer,
  useSchemaInitializerItem
} from "@nocobase/client";


function SidebarInitializerItem() {
  const itemConfig = useSchemaInitializerItem();
  const {insert} = useSchemaInitializer();
  const handleClick = () => {
    fetch(window.location.pathname, {
      method: "POST",
      body: JSON.stringify({
        action: 'page:add',
        payload: {
          name: `Page ${Math.floor(Math.random() * 100)}`,
          order: 10,
          schema: {
            "type": "void",
            "x-component": "Page",
            "properties": {
              "grid": {
                "type": "void",
                "x-uid": "vt1dzpieu11",
                "x-async": false,
                "x-index": 1,
                "x-component": "Grid",
                "x-initializer": "Page.Initializer"
              }
            }
          }
        }
      })
    }).then((res) => {
        window.location.reload();
      })


  };
  return <SchemaInitializerItem title={itemConfig.title} onClick={handleClick}/>;
}

export const SidebarInitializer = new SchemaInitializer({
  name: 'Sidebar.Initializer',
  title: 'Add Item',
  wrap: Grid.wrap,
  items: [
    // {
    //   name: 'Menu Group',
    //   title: "Menu Group",
    //   type: 'submenu.item',
    //   'x-component': 'Sidebar.SubMenu',
    //   Component: SidebarInitializerItem,
    // },
    {
      name: 'Menu Item',
      title: 'Menu Item',
      type: 'submenu.item',
      'x-component': 'Sidebar.Menu.Item',
      Component: SidebarInitializerItem,
    }
  ]
});
