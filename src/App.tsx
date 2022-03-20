import React, { useState } from "react";
import Header from "./components/Header";
import AppContainer from "./AppContainer";
import Home from "./components/Home";
import Form from "./components/Form";

function App() {
  const [state, setState] = useState({ Screen: "Home", id: 0 });
  const closeForm = () => {
    setState({ Screen: "Home", id: 0 });
  };
  const openForm = (fid: number) => {
    setState({ Screen: "Form", id: fid });
  };

  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl pr-8">
        <Header title={"Typeform using #react-typescript with #tailwindcss"} />
        {state.Screen === "Home" ? (
          <>
            <Home openFormCB={openForm} />
          </>
        ) : (
          <Form closeFormCB={closeForm} formid={state.id} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
