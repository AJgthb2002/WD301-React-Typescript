import { useRoutes } from "raviger";
import AppContainer from "../AppContainer";
import Form from "../components/Form";
import Home from "../components/Home";
import Preview from "../components/Preview";

const routes = {
  "/": () => (
    <AppContainer>
      <Home />
    </AppContainer>
  ),
  "/form/:id": ({ id }: { id: string }) => (
    <AppContainer>
      <Form formid={Number(id)} />
    </AppContainer>
  ),
  "/preview/:id": ({ id }: { id: string }) => <Preview formid={Number(id)} />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return routeResult || <div className="">404</div>;
}
