import { useEffect, useState } from "react";
import { me } from "./apiUtils";
import AppRouter from "./router/AppRouter";

const getCurrentUser = async (setCurrentUser: (user: any) => void) => {
  const response = await me();
  console.log(response);
  setCurrentUser(response.username ? response : null);
};

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return <AppRouter currentUser={currentUser} />;
}

export default App;
