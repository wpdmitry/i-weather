import React from "react";

import DayWeather from "./blocks/day-weather";
import DaysWeather from "./blocks/days-weather";
import Tabs from "./components/tabs";

function App() {
  return (
    <div style={{ marginTop: 100 }}>
      <Tabs
        tabs={[
          { name: "Сегодня", component: DayWeather },
          {
            name: "Неделя",
            component: DaysWeather
          }
        ]}
      />
    </div>
  );
}

export default App;
