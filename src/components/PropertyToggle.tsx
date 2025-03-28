import { ToggleButton } from "primereact/togglebutton";
import { useState } from "react";

import {triggerBrowserMessage} from "../utils/helpers"

const addOrRemoveEntryFromLocalStorage = (action: string, list: string[], elementSelector: string) => {
  if (action === "hide") {
    list.push(elementSelector);
  } else {
    let elemIdx = list.indexOf(elementSelector);
    list.splice(elemIdx, 1);
  }
  localStorage.setItem("hidden-items", JSON.stringify(list));
}

const toggleElement = (action: string, elementSelector: string) => {
  let list: string[] = JSON.parse(localStorage.getItem("hidden-items") || "[]");
  addOrRemoveEntryFromLocalStorage(action, list, elementSelector);

  triggerBrowserMessage(action, elementSelector);
};

const getOrSetPropertyValue = (_label: string, selector: string): boolean => {
  let hiddenElem = JSON.parse(localStorage.getItem("hidden-items") || "[]");
  let elemIdx = hiddenElem.indexOf(selector);
  if (elemIdx !== -1) {
    return true;
  }
  return false;
};

interface PropertyToggleProps {
  label: string;
  selector: string;
}
const PropertyToggle = ({ label, selector }: PropertyToggleProps) => {
  const [checked, setChecked] = useState(getOrSetPropertyValue(label, selector));

  return (
    <div>
      <label htmlFor="">{label} :</label>
      <ToggleButton
        checked={checked}
        offLabel="Visible"
        onLabel="Hidden"
        onChange={(e: any) => {
          setChecked(e.value);
          toggleElement(e.value ? "hide" : "show", selector);
        }}
      />
    </div>
  );
};

export default PropertyToggle;
