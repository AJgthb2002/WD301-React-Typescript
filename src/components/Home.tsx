import React from "react";
import logo from "../logo.svg";

export default function Home(props: { openFormCB: () => void }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex">
        <img className="h-48" src={logo} alt="logo"></img>
        <div className="flex flex-1 items-center justify-center h-48">
          <p className="font-semibold text-2xl">Welcome to the Home Page</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="p-2 bg-blue-600 text-white font-bold rounded-lg px-4 my-4"
          onClick={props.openFormCB}
        >
          Open Form
        </button>
      </div>
    </div>
  );
}
