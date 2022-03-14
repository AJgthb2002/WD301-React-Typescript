import React, { useState } from "react";

export default function InputField(props: {
  myfield: any;
  removeField: (id: number) => void;
  state: any[];
  setState: (newst: any[]) => void;
}) {
  const handleFieldInput = (id: number, newval: string) => {
    let field = props.state.filter((field) => field.id === id)[0];

    props.setState(
      [
        ...props.state.filter((field) => field.id !== id),
        {
          ...field,
          value: newval,
        },
      ].sort((a, b) => a.id - b.id)
    );
  };

  return (
    <div key={props.myfield.id}>
      <label>{props.myfield.label}</label>
      <div className="flex">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          type={props.myfield.type}
          value={props.state.filter((v) => v.id === props.myfield.id)[0].value}
          onChange={(e) => {
            handleFieldInput(props.myfield.id, e.target.value);
            console.log(e.target.value);
          }}
        />

        <button
          className=" bg-blue-600 text-white font-bold rounded-lg px-4 ml-4 h-8"
          onClick={(_) => props.removeField(props.myfield.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
