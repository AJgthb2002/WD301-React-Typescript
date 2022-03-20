import React, { useState } from "react";
import logo from "../logo.svg";
import { formdata } from "../interfaces";

export default function Home(props: { openFormCB: (id: number) => void }) {
  const getLocalForms: () => formdata[] = () => {
    console.log("Inside getlocalforms of Home");
    const savedFormsJSON = localStorage.getItem("savedForms");
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
  };

  const [savedForms, updatesavedForms] = useState(() => getLocalForms());

  const saveLocalForms = (localForms: formdata[]) => {
    localStorage.setItem("savedForms", JSON.stringify(localForms));
    console.log("saved form");
    console.log(localForms);
  };

  const deleteForm = (id: number) => {
    let localForms = getLocalForms();
    const updatedLocalForms = localForms.filter((form) => form.id !== id);
    saveLocalForms(updatedLocalForms);
    updatesavedForms(updatedLocalForms);
  };

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
          className="p-2 bg-blue-600 text-white font-bold text-xl rounded-lg px-6 mb-4 mt-1"
          onClick={() => props.openFormCB(-1)}
        >
          New Form
        </button>
      </div>
      <div className="flex flex-col">
        {console.log(savedForms.length)}
        {savedForms.map((form) => {
          return (
            <div
              key={form.id}
              className="flex justify-between rounded-lg my-1 bg-blue-200"
            >
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-semibold mx-4">
                  {form.title}
                </span>
              </div>
              <div className="flex justify-around">
                <button
                  className="p-2 bg-green-600 text-white font-bold rounded-lg px-4 my-4 mx-2"
                  onClick={() => props.openFormCB(form.id)}
                >
                  Open
                </button>
                <button
                  className="p-2 bg-red-600 text-white font-bold rounded-lg px-4 my-4 mx-2 mr-4"
                  onClick={() => deleteForm(form.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
