import React from "react";

import { bcm } from "../../tools";

import styles from "./stub.module.scss";

const b = bcm(styles);

type StubProps = {
  style?: React.CSSProperties;
  children: React.ReactChild;
};

function Stub({ style, children }: StubProps) {
  return (
    <div className={b()} style={style}>
      {children}
    </div>
  );
}

export default Stub;
