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
    insert({
      type: 'void',
      title: Math.random(),
      'x-toolbar': 'MyToolbar',
      'x-decorator': 'BlockItem',
      'x-component': itemConfig['x-component'],
    });
  };
  return <SchemaInitializerItem title={itemConfig.title} onClick={handleClick}/>;
}

export const SidebarInitializer = new SchemaInitializer({
  name: 'Sidebar.Initializer',
  title: 'Add Item',
  wrap: Grid.wrap,
  items: [
    {
      name: 'Menu Group',
      title: "Menu Group",
      type: 'submenu.item',
      'x-component': 'Sidebar.SubMenu',
      Component: SidebarInitializerItem,
    },
    {
      name: 'Menu Item',
      title: 'Menu Item',
      type: 'submenu.item',
      'x-component': 'Sidebar.Menu.Item',
      Component: SidebarInitializerItem,
    }
  ]
});
