import { useState, useEffect, useRef } from "react";
import InputField from "./InputField";
import { formfield, formdata, DropdownFormField } from "../formTypes";
import { navigate, Link } from "raviger";
import DropdownField from "./DropdownField";
import RadioButtonField from "./RadioButtonField";
import MultiselectField from "./MultiselectField";

export default function Form(props: { formid: number }) {
  const [newField, setNewField] = useState("New Field Label");
  const [newFieldType, setNewFieldType] = useState("text");

  const titleRef = useRef<HTMLInputElement>(null);

  const initialformfields: formfield[] = [
    { kind: "text", id: 1, label: "Name", fieldType: "text", value: "" },
    { kind: "text", id: 2, label: "Email", fieldType: "email", value: "" },
    {
      kind: "text",
      id: 3,
      label: "Date of Birth",
      fieldType: "date",
      value: "",
    },

    {
      kind: "dropdown",
      id: 4,
      label: "Favourite Cuisine",
      options: [
        "Chinese",
        "Continental",
        "American",
        "Spanish",
        "Thai",
        "Indian",
      ],
      value: "Select an option",
    },
    {
      kind: "radio",
      id: 5,
      label: "Gender",
      options: ["Male", "Female"],
      value: "",
    },
    {
      kind: "multiselect",
      id: 6,
      label: "Working Days",
      options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      // value: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
  ];

  const getLocalForms: () => formdata[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms");
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
  };

  const saveLocalForms = (localForms: formdata[]) => {
    localStorage.setItem("savedForms", JSON.stringify(localForms));
    console.log("saved form");
    console.log(localForms);
  };

  const saveFormData = (currentState: formdata) => {
    console.log(currentState);
    let localForms = getLocalForms();
    if (localForms.length === 0) {
      saveLocalForms([...localForms, currentState]);
    } else if (localForms.length > 0) {
      if (
        localForms.filter((form) => form.id === currentState.id).length === 0
      ) {
        saveLocalForms([...localForms, currentState]);
      }
    }

    localForms = getLocalForms();
    const updatedLocalForms = localForms.map((form) =>
      form.id === currentState.id ? currentState : form
    );
    saveLocalForms(updatedLocalForms);
  };

  const initialState: () => formdata = () => {
    const localForms = getLocalForms();
    if (localForms.length > 0) {
      for (let i = 0; i < localForms.length; i++) {
        if (localForms[i].id === props.formid) {
          return localForms[i];
        }
      }
    }
    let newid = Number(new Date());
    const newForm = {
      id: newid,
      title: "Untitled Form",
      formFields: initialformfields,
    };
    return newForm;
  };

  const [state, setState] = useState(() => initialState());

  useEffect(() => {
    state.id !== props.formid && navigate(`/form/${state.id}`);
  }, [state.id, props.formid]);

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
          label: newval,
        },
      ].sort((a, b) => a.id - b.id),
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
  });

  const editOptions = (id: number, newoptions: string[]) => {
    const field = state.formFields.find((field) => field.id === id);
    if (field) {
      const newField = {
        ...field,
        options: newoptions,
      };
      setState({
        ...state,
        formFields: state.formFields.map((field) =>
          field.id === id ? newField : field
        ),
      });
    }
  };

  const addField = () => {
    switch (newFieldType) {
      case "Text":
        setState({
          ...state,
          formFields: [
            ...state.formFields,
            {
              kind: "text",
              id: Number(new Date()),
              label: newField,
              fieldType: "text",
              value: "",
            },
          ],
        });
        break;

      case "Email":
        setState({
          ...state,
          formFields: [
            ...state.formFields,
            {
              kind: "text",
              id: Number(new Date()),
              label: newField,
              fieldType: "email",
              value: "",
            },
          ],
        });
        break;

      case "Contact No.":
        setState({
          ...state,
          formFields: [
            ...state.formFields,
            {
              kind: "text",
              id: Number(new Date()),
              label: newField,
              fieldType: "tel",
              value: "",
            },
          ],
        });
        break;

      case "Date":
        setState({
          ...state,
          formFields: [
            ...state.formFields,
            {
              kind: "text",
              id: Number(new Date()),
              label: newField,
              fieldType: "date",
              value: "",
            },
          ],
        });
        break;

      case "Textarea":
        setState({
          ...state,
          formFields: [
            ...state.formFields,
            {
              kind: "textarea",
              id: Number(new Date()),
              label: newField,
              value: "",
            },
          ],
        });
        break;

      case "Dropdown":
        setState({
          ...state,
          formFields: [
            ...state.formFields,
            {
              kind: "dropdown",
              id: Number(new Date()),
              label: newField,
              options: ["default option 1", "default option 2"],
              value: "",
            },
          ],
        });
        break;

      case "Multiselect":
        setState({
          ...state,
          formFields: [
            ...state.formFields,
            {
              kind: "multiselect",
              id: Number(new Date()),
              label: newField,
              options: [
                "default option 1",
                "default option 2",
                "default option 3",
              ],
              // value: []
            },
          ],
        });
        break;

      case "Radio Buttons":
        setState({
          ...state,
          formFields: [
            ...state.formFields,
            {
              kind: "radio",
              id: Number(new Date()),
              label: newField,
              options: ["default option 1", "default option 2"],
              value: "",
            },
          ],
        });
        break;
    }
    setNewField("New Field Label");
  };

  return (
    <div className="p-4 ">
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
        switch (field.kind) {
          case "text":
          case "textarea":
            return (
              <InputField
                key={field.id}
                id={field.id}
                label={field.label}
                value={field.label}
                removeField={removefield}
                handleFieldInput={handleFieldInput}
              />
            );

          case "dropdown":
            return (
              <DropdownField
                key={field.id}
                id={field.id}
                label={field.label}
                value={field.label}
                options={field.options}
                removeField={removefield}
                handleFieldInput={handleFieldInput}
                editOptionsCB={editOptions}
              />
            );

          case "radio":
            return (
              <RadioButtonField
                key={field.id}
                id={field.id}
                label={field.label}
                value={field.label}
                options={field.options}
                removeField={removefield}
                handleFieldInput={handleFieldInput}
                editOptionsCB={editOptions}
              />
            );

          case "multiselect":
            return (
              <MultiselectField
                key={field.id}
                id={field.id}
                label={field.label}
                options={field.options}
                // value={field.value}
                removeField={removefield}
                handleFieldInput={handleFieldInput}
                editOptionsCB={editOptions}
              />
            );
        }
      })}
      <hr className="my-2 mt-8" />
      <span>Add a new Field</span>
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
        <select
          className="mx-2 w-full border-2 rounded-lg h-10"
          value={newFieldType}
          onChange={(e) => {
            e.preventDefault();
            setNewFieldType(e.target.value);
          }}
        >
          <option>Text </option>
          <option>Email</option>
          <option>Contact No.</option>
          <option>Date</option>
          <option>Dropdown</option>
          <option>Multiselect</option>
          <option>Textarea</option>
          <option>Radio Buttons</option>
        </select>

        <button
          className=" bg-blue-600 text-white font-bold rounded-lg  ml-4 px-4"
          onClick={addField}
        >
          Add Field
        </button>
      </div>

      <button
        className="p-2 bg-blue-600 text-white font-bold rounded-lg px-4 my-4 mr-8"
        onClick={(_) => saveFormData(state)}
      >
        Save
      </button>

      <Link
        href="/"
        className="p-2 bg-blue-600 text-white font-bold rounded-lg px-4 my-4 mr-8"
      >
        Close
      </Link>
    </div>
  );
}
