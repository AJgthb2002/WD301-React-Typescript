import logo from "../logo.svg";
import { ActiveLink, navigate } from "raviger";

export default function Header(props: { currentUser: any }) {
  return (
    <div className="flex justify-start mx-20">
      <img src={logo} className="animate-spin h-20 w-20 mr-16" alt="logo" />
      <ActiveLink
        href="/"
        className="text-gray-800 p-2 m-2 mt-5 uppercase"
        exactActiveClass="text-blue-600"
      >
        Home
      </ActiveLink>
      <ActiveLink
        href="/about/"
        className="text-gray-800 p-2 m-2 mt-5 uppercase"
        exactActiveClass="text-blue-600"
      >
        About
      </ActiveLink>
      {props.currentUser ? (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
            window.location.reload();
          }}
          className="text-gray-800 uppercase"
          // exactActiveClass="text-blue-600"
        >
          Logout
        </button>
      ) : (
        <ActiveLink
          href="/login/"
          className="text-gray-800 p-2 m-2 mt-5 uppercase"
          exactActiveClass="text-blue-600"
        >
          Login
        </ActiveLink>
      )}
    </div>
  );
}
