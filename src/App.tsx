import React, { useState } from "react";
import Header from "./components/Header";
import AppContainer from "./AppContainer";
import Home from "./components/Home";
import Form from "./components/Form";

function App() {
  const [state, setState] = useState("Home");
  const closeForm = () => {
    setState("Home");
  };
  const openForm = () => {
    setState("Form");
  };

  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl pr-8">
        <Header title={"Typeform using #react-typescript with #tailwindcss"} />
        {state === "Home" ? (
          <>
            <Home openFormCB={openForm} />
          </>
        ) : (
          <Form closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
