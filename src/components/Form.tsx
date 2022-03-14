import React, { useState } from "react";
import InputField from "./InputField";

export default function Form(props: { closeFormCB: () => void }) {
  const [newField, setNewField] = useState(""); //label of field

  const formfields = [
    { id: 1, label: "First Name", type: "text", value: "" },
    { id: 2, label: "Last Name", type: "text", value: "" },
    { id: 3, label: "Email", type: "email", value: "" },
    { id: 4, label: "Date of Birth", type: "date", value: "" },
    { id: 5, label: "Phone Number", type: "tel", value: "" },
  ];

  const [state, setState] = useState(formfields);

  const addfield = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: newField,
        type: "text",
        value: "",
      },
    ]);
    setNewField("");
  };

  const removefield = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  const clearForm = () => {
    setState((oldState) => {
      return oldState.map((field) => ({ ...field, value: "" }));
    });
  };

  return (
    <div className="p-4">
      {state.map((field) => {
        return (
          <InputField
            myfield={field}
            removeField={removefield}
            state={state}
            setState={setState}
          />
        );
      })}
      <hr className="mt-2" />
      <div className="flex mt-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full h-10"
          type="text"
          value={newField}
          onChange={(e) => {
            e.preventDefault();
            setNewField(e.target.value);
          }}
        />
        <button
          className=" bg-blue-600 text-white font-bold rounded-lg h-10 w-28"
          onClick={addfield}
        >
          Add Field
        </button>
      </div>
      <button className="bg-blue-600 rounded-lg px-3 py-2 my-4 mr-8 text-md text-white font-bold">
        Submit
      </button>
      <button
        className="p-2 bg-blue-600 text-white font-bold rounded-lg px-4 my-4 mr-8"
        onClick={props.closeFormCB}
      >
        Close Form
      </button>
      <button
        className="p-2 bg-blue-600 text-white font-bold rounded-lg px-4 my-4 mr-8"
        onClick={clearForm}
      >
        Clear Form
      </button>
    </div>
  );
}
