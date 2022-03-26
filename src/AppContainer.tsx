import React from "react";
import Header from "./components/Header";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 items-center">
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl pr-8">
        <Header title={"Typeform using #react-typescript with #tailwindcss"} />
        {props.children}
      </div>
    </div>
  );
}
