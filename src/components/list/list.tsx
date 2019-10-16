import React from "react";

import { bcm } from "../../tools";

import styles from "./list.module.scss";

const b = bcm(styles);

type ListProps<T = any> = {
  data: T[];
  itemRenderer: ({
    rowData,
    rowIndex
  }: {
    rowData: T;
    rowIndex: number;
  }) => React.ReactElement;
};

function List<T>({ data, itemRenderer }: ListProps<T>) {
  return (
    <div className={b()}>
      {data.map((rowData, rowIndex) => (
        <div key={rowIndex} className={b("item")}>
          {itemRenderer({ rowData, rowIndex })}
        </div>
      ))}
    </div>
  );
}

export default List;
