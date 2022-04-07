import { useReducer, useState } from "react";

type EditAction = AddOption | RemoveOption;

type AddOption = {
  type: "addOption";
  name: string;
};

type RemoveOption = {
  type: "removeOption";
  name: string;
};

export default function EditField(props: {
  options: string[];
  removeOptionCB: (name: string) => void;
  addOptionCB: (name: string) => void;
}) {
  const [newOption, setNewOption] = useState("New Option");

  const reducer: (options: string[], action: EditAction) => string[] = (
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

  return (
    <>
      {options.map((option, index) => {
        return (
          <div key={index} className="flex ">
            <div className="w-full"> {option} </div>
            <button
              className=" bg-blue-600 text-white font-bold rounded-lg px-4 ml-4 h-8"
              onClick={() => {
                dispatch({
                  type: "removeOption",
                  name: option,
                });
                props.removeOptionCB(option);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}

      <hr className="my-2" />
      <div className="flex mt-4 mb-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 w-full h-10"
          type="text"
          value={newOption}
          onChange={(e) => {
            e.preventDefault();
            setNewOption(e.target.value);
          }}
        />
        <button
          className=" bg-blue-600 text-white font-bold rounded-lg  ml-4 px-4"
          onClick={() => {
            dispatch({
              type: "addOption",
              name: newOption,
            });
            setNewOption("New Option");
            props.addOptionCB(newOption);
          }}
        >
          Add Option
        </button>
      </div>
    </>
  );
}
