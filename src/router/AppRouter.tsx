import { useRoutes } from "raviger";
import AppContainer from "../AppContainer";
import Form from "../components/Form";
import Home from "../components/Home";
import Login from "../components/Login";
import Preview from "../components/Preview";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/about": () => (
    <div className="flex justify-center">
      <span>This is the About page</span>
    </div>
  ),
  "/form/:id": ({ id }: { id: string }) => <Form formid={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => <Preview formid={Number(id)} />,
};

export default function AppRouter(props: { currentUser: any }) {
  let routeResult = useRoutes(routes);
  return (
    (
      <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>
    ) || <div className="">404</div>
  );
}
