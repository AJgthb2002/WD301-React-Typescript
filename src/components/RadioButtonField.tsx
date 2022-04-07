import { useEffect, useReducer, useState } from "react";
import EditField from "./EditField";

type RadioAction = AddOption | RemoveOption;

type AddOption = {
  type: "addOption";
  name: string;
};

type RemoveOption = {
  type: "removeOption";
  name: string;
};

export default function RadioButtonField(props: {
  id: number;
  label: string;
  value: string;
  options: string[];
  removeField: (id: number) => void;
  handleFieldInput: (id: number, newval: string) => void;
  editOptionsCB: (id: number, newoptions: string[]) => void;
}) {
  const reducer: (options: string[], action: RadioAction) => string[] = (
    options,
    action
  ) => {
    switch (action.type) {
      case "addOption":
        return [...options, action.name];

      case "removeOption":
        return options.filter((o) => o !== action.name);
    }
  };

  const [options, dispatch] = useReducer(reducer, props.options);

  useEffect(() => {
    props.editOptionsCB(props.id, options);
  }, [options]);

  return (
    <div key={props.id}>
      <div className="flex flex-col mb-4 bg-blue-100 rounded-lg py-2 px-4 gap-2">
        <div className="flex">
          <input
            className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
            type="text"
            value={props.label}
            onChange={(e) => {
              props.handleFieldInput(props.id, e.target.value);
              console.log(e.target.value);
            }}
          />

          <button
            className=" bg-blue-600 text-white font-bold rounded-lg px-4 ml-4 h-8"
            onClick={(_) => props.removeField(props.id)}
          >
            Remove
          </button>
        </div>

        <div className="flex gap-2">
          {options.map((option, index) => {
            return (
              <div key={index}>
                <input
                  type="radio"
                  id={String(index)}
                  value={option}
                  name={`field${props.id}`}
                />
                  <label htmlFor={String(index)}>{option}</label>
              </div>
            );
          })}
        </div>

        <EditField
          addOptionCB={(name) =>
            dispatch({
              type: "addOption",
              name: name,
            })
          }
          removeOptionCB={(name) =>
            dispatch({
              type: "removeOption",
              name: name,
            })
          }
          options={options}
        />
      </div>
    </div>
  );
}
