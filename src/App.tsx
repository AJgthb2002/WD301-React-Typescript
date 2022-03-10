import React from "react";
import Header from "./Header";
import AppContainer from "./AppContainer";
import InputField from "./InputField";

const formfields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
  { id: 5, label: "Phone Number", type: "tel" },
];

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl pr-8">
        <Header
          title={"Welcome to Lesson 5 of $React-Typescript with #tailwindcss"}
        />
        {formfields.map((field) => {
          return <InputField myfield={field} />;
        })}
        <button className="bg-blue-600 rounded-lg px-3 py-2 my-4 text-md text-white font-bold">
          Submit
        </button>
      </div>
    </AppContainer>
  );
}

export default App;
