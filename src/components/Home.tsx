import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import { formdata } from "./Form";

export default function Home(props: { openFormCB: (formkey: number) => void }) {
  const empty: formdata[] = [];
  const [savedForms, setSavedForms] = useState(empty);

  const getLocalForms: () => formdata[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms");
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
  };

  useEffect(() => {
    const localForms = getLocalForms();
    setSavedForms(localForms);
    // console.log(savedForms);
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex">
        <img className="h-48" src={logo} alt="logo"></img>
        <div className="flex flex-1 flex-col items-center justify-center h-48">
          <p className="font-semibold text-2xl">Welcome to the Home Page</p>
          <button
            className="p-2 bg-blue-600 text-white font-bold rounded-lg px-4 my-4 mx-2"
            onClick={() => props.openFormCB(-1)}
          >
            New Form
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {console.log(savedForms.length)}
        {savedForms.map((form) => {
          return (
            <div
              key={form.id}
              className="flex justify-between rounded-lg bg-blue-100"
            >
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-semibold mx-4">
                  {form.title}
                </span>
              </div>
              <div className="flex justify-around">
                <button
                  className="p-2 bg-blue-600 text-white font-bold rounded-lg px-4 my-4 mx-2"
                  onClick={() => props.openFormCB(form.id)}
                >
                  Open
                </button>
                <button
                  className="p-2 bg-blue-600 text-white font-bold rounded-lg px-4 my-4 mx-2 mr-4"
                  onClick={() => props.openFormCB(form.id)}
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
