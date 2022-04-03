import { useEffect, useState } from "react";
import EditField from "./EditField";

export default function DropdownField(props: {
  id: number;
  label: string;
  value: string;
  options: string[];
  removeField: (id: number) => void;
  handleFieldInput: (id: number, newval: string) => void;
  editOptionsCB: (id: number, newoptions: string[]) => void;
}) {
  const [options, setOptions] = useState(props.options);

  const removeOption = (name: string) => {
    setOptions(options.filter((o) => o !== name));
  };

  const addOption = (name: string) => {
    setOptions([...options, name]);
  };

  useEffect(() => {
    props.editOptionsCB(props.id, options);
  }, [options]);

  return (
    <div key={props.id}>
      <div className="flex flex-col mb-4 bg-blue-100 rounded-lg py-2 px-4">
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

        <div className="flex flex-col gap-2">
          <select className="m-2 w-full border-2">
            {options.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <EditField
            addOptionCB={addOption}
            removeOptionCB={removeOption}
            options={options}
          />
        </div>

        {/* <input
            className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
            type="text"
            value={props.value}
            onChange={(e) => {
              props.handleFieldInput(props.id, e.target.value);
              console.log(e.target.value);
            }}
          /> */}
      </div>
    </div>
  );
}
