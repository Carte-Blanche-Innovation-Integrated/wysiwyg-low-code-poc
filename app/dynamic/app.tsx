'use client';

import {
  ActionInitializer,
  AntdSchemaComponentPlugin,
  Application,
  type ApplicationOptions,
  BlockItem,
  BlockSchemaToolbar,
  CardItem,
  CollectionPlugin,
  DataBlockInitializer,
  FormBlockInitializer,
  FormItem,
  Grid,
  LocalDataSource,
  Markdown,
  Plugin,
  SchemaSettingsPlugin,
  SchemaToolbar,
  ShowFormData,
  TableBlockInitializer
} from "@nocobase/client";
import RootPage from "./root";
import {observer, useField, useFieldSchema} from "@formily/react";
import {SidebarPlugin} from "@/dynamic/sidebar/Sidebar.Plugin";

import dataSourceMainCollections from './data/dataSourceMainCollections.json';
import dataSource2 from './data/dataSource2.json';
import dataSourceMainData from './data/dataSourceMainData.json';
import type {AxiosInstance, AxiosRequestConfig} from "axios";
import MockAdapter from "axios-mock-adapter";
import {Button} from "@/components/ui/button";
import {PageInitializer} from "@/dynamic/page/Page.Initializer";

const defaultApis = {
  'uiSchemas:patch': {data: {result: 'ok'}},
  'uiSchemas:batchPatch': {data: {result: 'ok'}},
  'uiSchemas:saveAsTemplate': {data: {result: 'ok'}},
  'users:update': {data: {result: 'ok'}},
  'users:create': {data: {result: 'ok'}},
  'roles:update': {data: {result: 'ok'}},
  'roles:create': {data: {result: 'ok'}},
  ...dataSourceMainData,
};

type URL = string;
type ResponseData = any;

type MockApis = Record<URL, ResponseData>;

function getProcessMockData(apis: Record<string, any>, key: string) {
  return (config: AxiosRequestConfig) => {
    if (!apis[key]) return [404, {data: {message: 'mock data not found'}}];
    if (config?.params?.pageSize || config?.params?.page) {
      const {data, meta} = apis[key];

      const pageSize = config.params.pageSize || meta?.pageSize || 20;
      const page = config.params.page || meta?.page || 1;
      return [
        200,
        {
          data: data.slice(pageSize * (page - 1), pageSize * page),
          meta: {
            ...meta,
            page,
            pageSize,
            count: data.length,
            totalPage: Math.ceil(data.length / pageSize),
          },
        },
      ];
    }
    return [200, apis[key]];
  };
}

export const mockApi = (axiosInstance: AxiosInstance, apis: MockApis = {}, delayResponse?: number) => {
  const mock = new MockAdapter(axiosInstance, {delayResponse});
  Object.keys(apis).forEach((key) => {
    mock.onAny(key).reply(getProcessMockData(apis, key) as any);
  });

  return (apis: MockApis = {}) => {
    Object.keys(apis).forEach((key) => {
      mock.onAny(key).reply(getProcessMockData(apis, key) as any);
    });
  };
};

export interface MockAppOptions extends ApplicationOptions {
  apis?: MockApis;
  delayResponse?: number;
  enableMultipleDataSource?: boolean;
}

const MyToolbar = () => {
  return <SchemaToolbar showBackground title='Test'/>
}

class RootPlugin extends Plugin {
  async load() {
    this.app.addComponents({
      MyToolbar,
      Grid,
      BlockItem,
      CardItem,
      BlockSchemaToolbar,
      Hello,
    });
    this.app.schemaInitializerManager.add(PageInitializer);
    this.router.add("root", {
      path: "/",
      Component: RootPage,
    });
  }
}

const Hello = () => {
  const schema = useFieldSchema();
  return <h1>Hello, world! {schema.name}</h1>;
};
const Editable = observer(
  (props: any) => {
    const filed = useField<any>();
    if (filed.editable) {
      return props.children;
    }
    return (
      <div>
        <Button
          onClick={() => {
            filed.editable = true;
          }}
        >
          编辑
        </Button>
        <div>{props.children}</div>
      </div>
    );
  },
  {displayName: 'Editable'},
);

const app = new Application({
  router: {
    type: "memory",
  },
  plugins: [
    RootPlugin,
    SidebarPlugin
  ],
});

mockApi(app.apiClient.axios, defaultApis, undefined);
app.getCollectionManager().addCollections(dataSourceMainCollections as any);
// if (enableMultipleDataSource) {
app.dataSourceManager.addDataSource(LocalDataSource, dataSource2 as any);
// }

app.pluginManager.add(AntdSchemaComponentPlugin);
app.pluginManager.add(SchemaSettingsPlugin);
app.pluginManager.add(CollectionPlugin, {config: {enableRemoteDataSource: false}});

app.addComponents({
  ShowFormData,
  FormItem,
  Editable,
  Markdown,
  ActionInitializer,
  DataBlockInitializer,
  TableBlockInitializer,
  FormBlockInitializer,
  // DetailsBlockInitializer,
  // ListBlockInitializer,
  // GridCardBlockInitializer,
  BlockSchemaToolbar,
  // MarkdownBlockInitializer,
});

export default app.getRootComponent();
