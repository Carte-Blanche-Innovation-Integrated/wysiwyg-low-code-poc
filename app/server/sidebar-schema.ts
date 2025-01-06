import {prisma} from "@/db.server";

export const sidebarSchemaLoader = async () => {
  const menuItems = await prisma.page.findMany({
    select: {
      id: true, name: true
    },
    orderBy: {
      order: 'asc'
    }
  });

  return {
    name: 'root',
    type: 'void',
    'x-component': 'Grid',
    'x-decorator': 'Sidebar.Menu',
    'x-initializer': 'Sidebar.Initializer',
    properties: Object.fromEntries(menuItems.map((menuItem) => [
      menuItem.id,
      {
        type: 'void',
        'x-component': 'Grid.Row',
        properties: {
          [menuItem.id]: {
            type: 'void',
            'x-component': 'Grid.Col',
            properties: {
              [menuItem.name]: {
                type: 'void',
                id: menuItem.id,
                title: menuItem.name,
                'x-toolbar': 'MyToolbar',
                'x-decorator': 'BlockItem',
                'x-component': 'Sidebar.Menu.Item',
              },
            },
          },
        },
      }
    ]))
  }
};
