import React from "react";
import logo from "../logo.svg";
import { ActiveLink } from "raviger";

export default function Header(props: { title: string }) {
  return (
    <div className="flex items-center">
      <img src={logo} className="animate-spin h-20 w-20" alt="logo" />
      <ActiveLink
        href="/"
        className="text-gray-800 p-2 m-2 uppercase"
        exactActiveClass="text-blue-600"
      >
        Home
      </ActiveLink>
      <ActiveLink
        href="/form"
        className="text-gray-800 p-2 m-2 uppercase"
        exactActiveClass="text-blue-600"
      >
        New Form
      </ActiveLink>
      {/* <h1 className="text-center text-xl font-semibold">{props.title} </h1> */}
    </div>
  );
}
