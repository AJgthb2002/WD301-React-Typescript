import React, { useState } from "react";

export default function InputField(props: {
  id: number;
  label: string;
  value: string;
  fieldType: string;
  removeField: (id: number) => void;
  handleFieldInput: (id: number, newval: string) => void;
}) {
  // const handleFieldInput = (id: number, newval: string) => {
  //   let field = props.state.formFields.filter((field) => field.id === id)[0];

  //   props.setState({
  //     ...props.state,
  //     formFields:

  //     [
  //       ...props.state.formFields.filter((field) => field.id !== id),
  //       {
  //         ...field,
  //         value: newval,
  //       },
  //     ].sort((a, b) => a.id - b.id)
  //   }
  //   );
  // };

  return (
    <div key={props.id}>
      <label>{props.label}</label>
      <div className="flex">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          type={props.fieldType}
          value={props.value}
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
    </div>
  );
}
