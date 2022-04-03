import { useState } from "react";

export default function EditField(props: {
  // fieldid: number;
  options: string[];
  removeOptionCB: (name: string) => void;
  addOptionCB: (name: string) => void;
}) {
  const [options, setOptions] = useState(props.options);
  const [newOption, setNewOption] = useState("New Option");

  const removeOption = (name: string) => {
    setOptions(options.filter((o) => o !== name));
    props.removeOptionCB(name);
  };

  const addOption = (name: string) => {
    setOptions([...options, name]);
    setNewOption("New Option");
    props.addOptionCB(name);
  };

  return (
    <>
      {options.map((option, index) => {
        return (
          <div key={index} className="flex ">
            <div className="w-full"> {option} </div>
            <button
              className=" bg-blue-600 text-white font-bold rounded-lg px-4 ml-4 h-8"
              onClick={(_) => removeOption(option)}
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
          onClick={() => addOption(newOption)}
        >
          Add Option
        </button>
      </div>
    </>
  );
}
