import logo from "../logo.svg";
import { ActiveLink } from "raviger";

export default function Header() {
  return (
    <div className="flex justify-start mx-20">
      <img src={logo} className="animate-spin h-20 w-20 mr-16" alt="logo" />
      <ActiveLink
        href="/"
        className="text-gray-800 p-2 m-2 uppercase"
        exactActiveClass="text-blue-600"
      >
        Home
      </ActiveLink>
      <ActiveLink
        href="/form/-1"
        className="text-gray-800 p-2 m-2 uppercase"
        exactActiveClass="text-blue-600"
      >
        New Form
      </ActiveLink>
    </div>
  );
}
