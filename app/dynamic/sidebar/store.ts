import {atom} from "jotai";

export const sidebarSchema$ = atom({
  name: 'root',
  type: 'void',
  'x-component': 'Grid',
  'x-decorator': 'Sidebar.Menu',
  'x-initializer': 'Sidebar.Initializer',
});