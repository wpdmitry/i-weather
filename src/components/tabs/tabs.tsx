import React, { useState, useCallback } from "react";

import { bcm } from "../../tools";

import Button from "../button";

import styles from "./tabs.module.scss";

const b = bcm(styles);

type TabsProps = {
  initialIndex?: number;
  tabs: Array<{ name: string; component: React.ComponentType }>;
};

function Tabs({ initialIndex = 0, tabs }: TabsProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleSwitch = useCallback(
    (index: number) => {
      setCurrentIndex(index);
    },
    [setCurrentIndex]
  );

  const { component: Component } = tabs[currentIndex];

  return (
    <div className={b()}>
      <div className={b("switchers")}>
        {tabs.map((tab, index) => (
          <Button
            key={index}
            className={b("switcher", { active: index === currentIndex })}
            onClick={() => handleSwitch(index)}
          >
            {tab.name}
          </Button>
        ))}
      </div>
      <div className={b("content")}>
        <Component />
      </div>
    </div>
  );
}

export default Tabs;
