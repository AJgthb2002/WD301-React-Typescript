import React, { useState, useEffect, useRef } from "react";
import InputField from "./InputField";

interface formfield {
  id: number;
  label: string;
  type: string;
  value: string;
}

interface formdata {
  id: number;
  title: string;
  formFields: formfield[];
}

export default function Form(props: { closeFormCB: () => void }) {
  const [newField, setNewField] = useState(""); //label of field
  const titleRef = useRef<HTMLInputElement>(null);

  const initialformfields: formfield[] = [
    { id: 1, label: "First Name", type: "text", value: "" },
    { id: 2, label: "Last Name", type: "text", value: "" },
    { id: 3, label: "Email", type: "email", value: "" },
    { id: 4, label: "Date of Birth", type: "date", value: "" },
    { id: 5, label: "Phone Number", type: "tel", value: "" },
  ];

  const getLocalForms: () => formdata[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms");
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
  };

  const saveLocalForms = (localForms: formdata[]) => {
    localStorage.setItem("savedForms", JSON.stringify(localForms));
  };

  const saveFormData = (currentState: formdata) => {
    const localForms = getLocalForms();
    const updatedLocalForms = localForms.map((form) =>
      form.id == currentState.id ? currentState : form
    );
    saveLocalForms(updatedLocalForms);
  };

  const initialState: () => formdata = () => {
    const localForms = getLocalForms();
    if (localForms.length > 0) {
      return localForms[0];
    }
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialformfields,
    };
    console.log(localForms);
    saveLocalForms([...localForms, newForm]);
    return newForm;
  };

  const [state, setState] = useState(() => initialState());

  const addfield = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField,
          type: "text",
          value: "",
        },
      ],
    });
    setNewField("");
  };

  const removefield = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  const handleFieldInput = (id: number, newval: string) => {
    let field = state.formFields.filter((field) => field.id === id)[0];

    setState({
      ...state,
      formFields: [
        ...state.formFields.filter((field) => field.id !== id),
        {
          ...field,
          value: newval,
        },
      ].sort((a, b) => a.id - b.id),
    });
  };

  const clearForm = () => {
    console.log("inside clearform");
    setState({
      ...state,
      formFields: [
        ...state.formFields.map((field) => ({ ...field, value: "" })),
      ],
    });
  };

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(state);
    }, 1000);
    clearTimeout(timeout);
  }, [state]);

  return (
    <div className="p-4">
      <input
        className="border-2 border-gray-200 rounded-lg p-2 w-full h-10 mb-4 "
        type="text"
        value={state.title}
        onChange={(e) => {
          setState({ ...state, title: e.target.value });
        }}
        ref={titleRef}
      />
      <hr className="mb-2" />

      {state.formFields.map((field) => {
        return (
          <InputField
            key={field.id}
            id={field.id}
            label={field.label}
            value={field.value}
            fieldType={field.type}
            removeField={removefield}
            handleFieldInput={handleFieldInput}
          />
        );
      })}
      <hr className="mt-2" />
      <div className="flex mt-4 mb-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 w-full h-10"
          type="text"
          value={newField}
          onChange={(e) => {
            e.preventDefault();
            setNewField(e.target.value);
          }}
        />
        <button
          className=" bg-blue-600 text-white font-bold rounded-lg h-10 w-28 ml-4"
          onClick={addfield}
        >
          Add Field
        </button>
      </div>
      <button className="bg-blue-600 rounded-lg px-3 py-2 my-4 mr-8 text-md text-white font-bold">
        Submit
      </button>
      <button
        className="p-2 bg-blue-600 text-white font-bold rounded-lg px-4 my-4 mr-8"
        onClick={(_) => saveFormData(state)}
      >
        Save
      </button>
      <button
        className="p-2 bg-blue-600 text-white font-bold rounded-lg px-4 my-4 mr-8"
        onClick={clearForm}
      >
        Clear
      </button>
      <button
        className="p-2 bg-blue-600 text-white font-bold rounded-lg px-4 my-4 mr-8"
        onClick={props.closeFormCB}
      >
        Close
      </button>
    </div>
  );
}
