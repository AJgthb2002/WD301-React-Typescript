import React from "react";

export default function InputField(props: { myfield: any }) {
  return (
    <div key={props.myfield.id}>
      <label>{props.myfield.label}</label>
      <input
        className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
        type={props.myfield.type}
      />
    </div>
  );
}
