import { ToggleButton } from "primereact/togglebutton";
import { useEffect, useState } from "react";

const toggleElement = (action: string, elementSelector: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: action,
        selector: elementSelector,
      });
    }
  });
};

const getOrSetPropertyValue = (label: string, selector: string): boolean => {
  const key: string = label+ "-" + selector;
  let val = localStorage.getItem(key);
  if (val === null) {
    localStorage.setItem(key, "false");
  }
  return JSON.parse(val || "false");
};

interface PropertyToggleProps {
  label: string;
  selector: string;
}
const PropertyToggle = ({ label, selector }: PropertyToggleProps) => {
  const key: string = label+ "-" + selector;
  const [checked, setChecked] = useState(getOrSetPropertyValue(label, selector));

  useEffect(() => {
    if (localStorage.getItem(key) === "true") {
      toggleElement("hide", selector);
    }
  }, [])

  return (
    <div>
      <label htmlFor="">{label} :</label>
      <ToggleButton
        checked={checked}
        offLabel="Visible"
        onLabel="Hidden"
        onChange={(e: any) => {
          localStorage.setItem(key, e.value);
          setChecked(e.value);
          toggleElement(e.value ? "hide" : "show", selector);
        }}
      />
    </div>
  );
};

export default PropertyToggle;
