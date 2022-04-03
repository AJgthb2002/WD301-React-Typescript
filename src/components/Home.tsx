import { useState } from "react";
import logo from "../logo.svg";
import { formdata } from "../formTypes";
import { useQueryParams, Link } from "raviger";

export default function Home() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");

  const getLocalForms: () => formdata[] = () => {
    console.log("Inside getlocalforms of Home");
    const savedFormsJSON = localStorage.getItem("savedForms");
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
  };

  const [savedForms, updatesavedForms] = useState(() => getLocalForms());

  const saveLocalForms = (localForms: formdata[]) => {
    localStorage.setItem("savedForms", JSON.stringify(localForms));
    console.log("saved form");
    console.log(localForms);
  };

  const deleteForm = (id: number) => {
    let localForms = getLocalForms();
    const updatedLocalForms = localForms.filter((form) => form.id !== id);
    saveLocalForms(updatedLocalForms);
    updatesavedForms(updatedLocalForms);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex">
        <img className="h-48" src={logo} alt="logo"></img>
        <div className="flex flex-1 items-center justify-center h-48">
          <p className="font-semibold text-2xl">Welcome to the Home Page</p>
        </div>
      </div>
      {/* <div className="flex justify-center">
        <a
          href="/form"
          className="p-2 bg-blue-600 text-white font-bold text-xl rounded-lg px-6 mb-4 mt-1"
        >
          New Form
        </a>
      </div> */}
      <form className="w-full" action="/" method="GET">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <div className="flex">
              <input
                className="appearance-none flex-1 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={searchString}
                onChange={(e) => {
                  setSearchString(e.target.value);
                }}
                name="search"
                type="text"
                placeholder="Search"
              />
              <button
                type="submit"
                className="bg-gray-200 text-gray-700 border-2 border-gray-400 rounded-lg p-2 m-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setQuery({ search: searchString });
                }}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-col">
        {console.log(savedForms.length)}
        {savedForms
          .filter((form) =>
            form.title?.toLowerCase().includes(search?.toLowerCase() || "")
          )
          .map((form) => {
            return (
              <div
                key={form.id}
                className="flex justify-between rounded-lg my-1 bg-blue-200"
              >
                <div className="flex flex-col justify-center">
                  <span className="text-2xl font-semibold mx-4">
                    {form.title}
                  </span>
                  <span className="text-md text-grey-500 mx-4">
                    {form.formFields.length} Questions
                  </span>
                </div>
                <div className="flex justify-around">
                  <Link
                    href={`/preview/${form.id}`}
                    className="p-2 bg-orange-400 text-white font-bold rounded-lg px-4 my-4 mx-2"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/form/${form.id}`}
                    className="p-2 bg-green-600 text-white font-bold rounded-lg px-4 my-4 mx-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="p-2 bg-red-600 text-white font-bold rounded-lg px-4 my-4 mx-2 mr-4"
                    onClick={() => deleteForm(form.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
