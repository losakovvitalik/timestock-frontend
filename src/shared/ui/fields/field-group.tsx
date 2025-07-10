import { PropsWithChildren } from 'react';

export function FieldGroup(props: PropsWithChildren) {
  return <div className="grid grid-cols-[auto_1fr] gap-2">{props.children}</div>;
}
