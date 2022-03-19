import React from "react";
import logo from "../logo.svg";

export default function Header(props: { title: string }) {
  return (
    <div className="flex justify-center items-center">
      <img src={logo} className="animate-spin h-20 w-20" alt="logo" />
      <div className="flex justify-center">
        <h1 className=" text-xl font-semibold">{props.title} </h1>
      </div>
    </div>
  );
}
