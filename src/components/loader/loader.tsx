import React, { useState, useEffect } from "react";

import bcm from "../../tools/bcm";
import cn from "../../tools/classnames";

import styles from "./loader.module.scss";

const b = bcm(styles);

type LoaderProps = {
  size?: "s" | "m" | "l";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
};

function Loader({ size = "s", className, style, delay }: LoaderProps) {
  const [show, setShow] = useState(!delay);

  useEffect(() => {
    if (show) return;

    const timerId = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timerId);
  }, [show, delay, setShow]);

  return (
    <div className={cn(b(), className)} style={style}>
      {show && <div className={b("content", { size })} />}
    </div>
  );
}

export default Loader;
