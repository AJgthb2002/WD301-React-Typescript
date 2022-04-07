import { useState, useEffect, useRef, useReducer } from "react";
import InputField from "./InputField";
import { formfield, formdata, DropdownFormField } from "../formTypes";
import { navigate, Link } from "raviger";
import DropdownField from "./DropdownField";
import RadioButtonField from "./RadioButtonField";
import MultiselectField from "./MultiselectField";

type FormAction =
  | AddFieldAction
  | RemoveFieldAction
  | UpdateTitleAction
  | UpdateLabelAction
  | UpdateOptionsAction;

type RemoveFieldAction = {
  type: "removeField";
  id: number;
};

type AddFieldAction = {
  type: "addField";
  label: string;
  kind: string;
};

type UpdateTitleAction = {
  type: "updateTitle";
  title: string;
};

type UpdateLabelAction = {
  type: "updateLabel";
  id: number;
  label: string;
};

type UpdateOptionsAction = {
  type: "updateOptions";
  id: number;
  options: string[];
};

export default function Form(props: { formid: number }) {
  const [newField, setNewField] = useState("New Field Label");
  const [newFieldType, setNewFieldType] = useState("text");

  const titleRef = useRef<HTMLInputElement>(null);

  const getNewField: (label: string, kind: string) => formfield = (
    label,
    kind
  ) => {
    let newFormField: formfield = {
      id: Number(new Date()),
      label: label,
      kind: "text",
      value: "",
      fieldType: "text",
    };
    switch (kind) {
      case "Text":
        newFormField = {
          id: Number(new Date()),
          label: label,
          kind: "text",
          value: "",
          fieldType: "text",
        };
        return newFormField;

      case "Email":
        newFormField = {
          id: Number(new Date()),
          label: label,
          kind: "text",
          value: "",
          fieldType: "email",
        };
        return newFormField;

      case "Contact No.":
        newFormField = {
          id: Number(new Date()),
          label: label,
          kind: "text",
          value: "",
          fieldType: "tel",
        };
        return newFormField;

      case "Date":
        newFormField = {
          id: Number(new Date()),
          label: label,
          kind: "text",
          value: "",
          fieldType: "date",
        };
        return newFormField;

      case "Dropdown":
        newFormField = {
          id: Number(new Date()),
          label: label,
          kind: "dropdown",
          value: "",
          options: ["option1", "option2"],
        };
        return newFormField;

      case "Radio Buttons":
        newFormField = {
          id: Number(new Date()),
          label: label,
          kind: "radio",
          value: "",
          options: ["default option1", "default option2"],
        };
        return newFormField;

      case "Textarea":
        newFormField = {
          id: Number(new Date()),
          label: label,
          kind: "textarea",
          value: "",
        };
        return newFormField;

      case "Multiselect":
        newFormField = {
          id: Number(new Date()),
          label: label,
          kind: "multiselect",
          options: ["option1", "option2", "option3"],
        };
        return newFormField;
    }

    return newFormField;
  };

  const reducer: (state: formdata, action: FormAction) => formdata = (
    state,
    action
  ) => {
    switch (action.type) {
      case "addField":
        const newField = getNewField(action.label, action.kind);
        setNewField("New Field Label");
        setNewFieldType("text");
        return {
          ...state,
          formFields: [...state.formFields, newField],
        };
      case "removeField":
        return {
          ...state,
          formFields: state.formFields.filter(
            (field) => field.id !== action.id
          ),
        };

      case "updateTitle":
        return {
          ...state,
          title: action.title,
        };
      case "updateLabel":
        return {
          ...state,
          formFields: state.formFields.map((field) => {
            if (field.id === action.id) {
              return {
                ...field,
                label: action.label,
              };
            }
            return field;
          }),
        };

      case "updateOptions":
        console.log("Inside updateoptions");
        return {
          ...state,
          formFields: state.formFields.map((field) => {
            if (field.id === action.id) {
              return {
                ...field,
                options: action.options,
              };
            }
            return field;
          }),
        };
    }
  };

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

  const [state, dispatch] = useReducer(reducer, null, () => initialState());

  useEffect(() => {
    state.id !== props.formid && navigate(`/form/${state.id}`);
  }, [state.id, props.formid]);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(state);
    }, 1000);
    clearTimeout(timeout);
  });

  return (
    <div className="p-4 ">
      <input
        className="border-2 border-gray-200 rounded-lg p-2 w-full h-10 mb-4 "
        type="text"
        value={state.title}
        onChange={(e) => {
          dispatch({ type: "updateTitle", title: e.target.value });
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
                removeField={(id) => dispatch({ type: "removeField", id: id })}
                handleFieldInput={(id, value) =>
                  dispatch({ type: "updateLabel", label: value, id: id })
                }
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
                removeField={(id) => dispatch({ type: "removeField", id: id })}
                handleFieldInput={(id, value) =>
                  dispatch({ type: "updateLabel", label: value, id: id })
                }
                editOptionsCB={(id, options) => {
                  console.log("Calling update options dispatch in Form");
                  dispatch({
                    type: "updateOptions",
                    id: id,
                    options: options,
                  });
                }}
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
                removeField={(id) => dispatch({ type: "removeField", id: id })}
                handleFieldInput={(id, value) =>
                  dispatch({ type: "updateLabel", label: value, id: id })
                }
                editOptionsCB={(id, options) =>
                  dispatch({
                    type: "updateOptions",
                    id: id,
                    options: options,
                  })
                }
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
                removeField={(id) => dispatch({ type: "removeField", id: id })}
                handleFieldInput={(id, value) =>
                  dispatch({ type: "updateLabel", label: value, id: id })
                }
                editOptionsCB={(id, options) =>
                  dispatch({
                    type: "updateOptions",
                    id: id,
                    options: options,
                  })
                }
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
          onClick={() => {
            dispatch({
              type: "addField",
              label: newField,
              kind: newFieldType,
            });
          }}
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
