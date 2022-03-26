import React, { useState } from "react";
import AppRouter from "./router/AppRouter";

function App() {
  // const [state, setState] = useState({ Screen: "Home", id: 0 });

  // const openForm = (fid: number) => {
  //   setState({ Screen: "Form", id: fid });
  // };

  // return state.Screen === "Home" ? (
  //   <Home openFormCB={openForm} />
  // ) : (
  //   <Form formid={state.id} />
  // );
  return <AppRouter />;
}

export default App;
