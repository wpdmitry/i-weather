import React from "react";

import { bcm, cn } from "../../tools";

import styles from "./button.module.scss";

const b = bcm(styles);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className, ...rest }: ButtonProps) {
  return <button className={cn(b(), className)} {...rest} />;
}

export default Button;
