import {useFieldSchema} from "@formily/react";
import type {ReactNode} from "react";

export const SchemaPrinter = ({children}: { children: ReactNode }) => {
  const fieldSchema = useFieldSchema();
  console.log(fieldSchema);
  return <div style={{border: '1px solid red'}}>
    <pre>{JSON.stringify(fieldSchema, null, 2)}</pre>
    <div style={{paddingLeft: 20}}>{children}</div>
  </div>
};
