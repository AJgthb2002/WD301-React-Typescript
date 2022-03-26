import { useRoutes } from "raviger";
import AppContainer from "../AppContainer";
import Form from "../components/Form";
import Home from "../components/Home";

const routes = {
  "/": () => <Home />,
  "/form": () => <Form formid={-1} />,
  "/form/:id": ({ id }: { id: string }) => <Form formid={Number(id)} />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
