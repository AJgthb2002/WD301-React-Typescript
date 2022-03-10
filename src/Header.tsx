import React from "react";
import logo from "./logo.svg";

export default function Header(props: { title: string }) {
  return (
    <div className="flex items-center">
      <img src={logo} className="animate-spin h-20 w-20" alt="logo" />
      <h1 className="text-center text-xl font-semibold">{props.title} </h1>
    </div>
  );
}
