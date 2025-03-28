import React from "react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { elements } from "./utils/elements";
import PropertyToggle from "./components/PropertyToggle";
import { triggerBrowserMessage } from "./utils/helpers";

const App: React.FC = () => {

  const hiddenItemsList = localStorage.getItem("hidden-items");
  if (hiddenItemsList !== null) {
    JSON.parse(hiddenItemsList).map((item: string) => {
      triggerBrowserMessage("hide", item);
    })
  }

  return (
    <PrimeReactProvider>
      <h1>Dumb Tube</h1>
      {elements.map(({ title, content }, groupIndex) => (
        <div key={groupIndex}>
          <h2>{title}</h2>
          {content.map(({ label, selector }, itemIndex) => {
            return (
              <PropertyToggle
                key={"item" + groupIndex + "." + itemIndex}
                label={label}
                selector={selector}
              />
            );
          })}
        </div>
      ))}
    </PrimeReactProvider>
  );
};

export default App;
