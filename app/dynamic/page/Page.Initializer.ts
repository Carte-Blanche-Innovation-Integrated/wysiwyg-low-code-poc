import {gridRowColWrap, SchemaInitializer} from "@nocobase/client";

export const PageInitializer = new SchemaInitializer({
  name: 'Page.Initializer',
  title: 'Add block',
  icon: 'PlusOutlined',
  wrap: gridRowColWrap,
  items: [
    {
      name: 'dataBlocks',
      title: 'Data blocks',
      type: 'itemGroup',
      children: [
        {
          name: 'table',
          title: 'Table',
          Component: 'TableBlockInitializer',
        },
        {
          name: 'form',
          title: 'Form',
          Component: 'FormBlockInitializer',
          useComponentProps: () => {
            const filterCollections = ({ collection }) => {
              const { unavailableActions, availableActions } = collection?.options || {};
              if (availableActions) {
                return availableActions.includes?.('create');
              }
              if (unavailableActions) {
                return !unavailableActions?.includes?.('create');
              }
              return true;
            };
            return { filterCollections };
          },
        },
        {
          name: 'details',
          title: 'Details',
          Component: 'DetailsBlockInitializer',
        },
        {
          name: 'list',
          title: 'List',
          Component: 'ListBlockInitializer',
        },
        {
          name: 'gridCard',
          title: 'Grid Card',
          Component: 'GridCardBlockInitializer',
        },
      ],
    },
    {
      name: 'filterBlocks',
      title: 'Filter blocks',
      type: 'itemGroup',
      children: [
        {
          name: 'filterForm',
          title: 'Form',
          Component: 'FilterFormBlockInitializer',
        },
        {
          name: 'filterCollapse',
          title: 'Collapse',
          Component: 'FilterCollapseBlockInitializer',
        },
      ],
    },
    {
      name: 'otherBlocks',
      type: 'itemGroup',
      title: 'Other blocks',
      children: [
        {
          name: 'markdown',
          title: 'Markdown',
          Component: 'MarkdownBlockInitializer',
        },
      ],
    },
  ],
});
