import React from "react";
import Header from "./components/Header";

export default function AppContainer(props: {
  currentUser: any;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-column justify-center bg-gray-100">
      <div className="flex justify-center items-center my-32">
        <div className="flex flex-col p-8 mx-auto  bg-white shadow-lg rounded-xl">
          <Header currentUser={props.currentUser} />
          {props.children}
        </div>
      </div>
    </div>
  );
}
