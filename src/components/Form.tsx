import { useState, useEffect, useRef, useReducer } from "react";
import InputField from "./InputField";
import {
  formfield,
  formdata,
  DropdownFormField,
  ApiForm,
  validateForm,
  Errors,
} from "../formTypes";
import { navigate, Link } from "raviger";
import DropdownField from "./DropdownField";
import RadioButtonField from "./RadioButtonField";
import MultiselectField from "./MultiselectField";
import {
  getForm,
  putForm,
  getFormFields,
  postFormField,
  putFormField,
  patchFormField,
  deleteFormField,
} from "../apiUtils";

type FormAction =
  | AddFieldAction
  | RemoveFieldAction
  | UpdateFormDetailsAction
  | UpdateLabelAction
  | UpdateOptionsAction
  | FormReadyAction;

type FormReadyAction = {
  type: "formReady";
  payload: formdata;
};

type RemoveFieldAction = {
  type: "removeField";
  id: number;
};

type AddFieldAction = {
  type: "addField";
  label: string;
  kind: string;
};

type UpdateFormDetailsAction = {
  type: "updateFormDetails";
  title: string;
  description: string;
  is_public: boolean;
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

const fetchForm = async (formID: number) => {
  try {
    const formResponse: ApiForm = await getForm(formID);
    const fieldsResponse = await getFormFields(formID);
    const formData: formdata = {
      id: formResponse.id,
      title: formResponse.title,
      description: formResponse.description,
      is_public: formResponse.is_public,
      formFields: fieldsResponse.results,
      created_date: formResponse.created_date,
      modified_date: formResponse.modified_date,
    };
    return formData;
  } catch (err) {
    console.log("Fetchform error:", err);
  }
};

const createField = async (formID: number, fieldData: formfield) => {
  try {
    const response = await postFormField(formID, fieldData);
    console.log("Create field response", response);
  } catch (err) {
    console.log("Create field Error", err);
  }
};
const updateField = async (
  formID: number,
  fieldID: number,
  fieldData: Partial<formfield>
) => {
  try {
    const response = await patchFormField(formID, fieldID, fieldData);
    console.log("update field response", response);
  } catch (err) {
    console.log("update field error", err);
  }
};
const deleteField = async (formID: number, fieldID: number) => {
  try {
    const response = await deleteFormField(formID, fieldID);
    console.log("delete field response", response);
  } catch (err) {
    console.log("delete field error", err);
  }
};

export default function Form(props: { formid: number }) {
  const [newField, setNewField] = useState("New Field Label");
  const [newFieldType, setNewFieldType] = useState("text");

  const titleRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Errors<ApiForm>>({});

  const saveFormData = async (formData: formdata) => {
    const validationErrors = validateForm({
      title: formData.title || "",
      description: formData.description,
    });

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (formData.id && formData.title) {
          const response: ApiForm = await putForm(formData.id, {
            title: formData.title,
            description: formData.description,
            is_public: formData.is_public,
          });
          // const fieldsres: putFormField(formData.formFields)
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getNewField: (label: string, kind: string) => formfield = (
    label,
    kind
  ) => {
    let newFormField: formfield = {
      id: Number(new Date()),
      label: label,
      kind: "TEXT",
      value: "",
      fieldType: "text",
    };
    switch (kind) {
      case "Text":
        newFormField = {
          id: Number(new Date()),
          label: label,
          kind: "TEXT",
          value: "",
          fieldType: "text",
        };
        return newFormField;

      case "Email":
        newFormField = {
          id: Number(new Date()),
          label: label,
          kind: "TEXT",
          value: "",
          fieldType: "email",
        };
        return newFormField;

      case "Contact No.":
        newFormField = {
          id: Number(new Date()),
          label: label,
          kind: "TEXT",
          value: "",
          fieldType: "tel",
        };
        return newFormField;

      case "Date":
        newFormField = {
          id: Number(new Date()),
          label: label,
          kind: "TEXT",
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
      case "formReady":
        return action.payload;

      case "addField":
        const newField = getNewField(action.label, action.kind);
        console.log("new field created");
        setNewField("New Field Label");
        setNewFieldType("text");
        state.id && createField(state.id, newField);
        return {
          ...state,
          formFields: [...state.formFields, newField],
        };
      case "removeField":
        state.id && deleteField(state.id, action.id);
        return {
          ...state,
          formFields: state.formFields.filter(
            (field) => field.id !== action.id
          ),
        };

      case "updateFormDetails":
        return {
          ...state,
          title: action.title,
          description: action.description,
          is_public: action.is_public,
        };

      case "updateLabel":
        state.id && updateField(state.id, action.id, { label: action.label });
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
    { kind: "TEXT", id: 1, label: "Name", fieldType: "text", value: "" },
    { kind: "TEXT", id: 2, label: "Email", fieldType: "email", value: "" },
    {
      kind: "TEXT",
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

  // const saveFormData = (currentState: formdata) => {
  //   console.log(currentState);
  //   let localForms = getLocalForms();
  //   if (localForms.length === 0) {
  //     saveLocalForms([...localForms, currentState]);
  //   } else if (localForms.length > 0) {
  //     if (
  //       localForms.filter((form) => form.id === currentState.id).length === 0
  //     ) {
  //       saveLocalForms([...localForms, currentState]);
  //     }
  //   }

  //   localForms = getLocalForms();
  //   const updatedLocalForms = localForms.map((form) =>
  //     form.id === currentState.id ? currentState : form
  //   );
  //   saveLocalForms(updatedLocalForms);
  // };

  // const initialState: () => formdata = () => {
  //   const localForms = getLocalForms();
  //   if (localForms.length > 0) {
  //     for (let i = 0; i < localForms.length; i++) {
  //       if (localForms[i].id === props.formid) {
  //         return localForms[i];
  //       }
  //     }
  //   }
  //   let newid = Number(new Date());
  //   const newForm = {
  //     id: newid,
  //     title: "Untitled Form",
  //     formFields: initialformfields,
  //   };
  //   return newForm;
  // };

  const initialState: formdata = {
    id: 0,
    title: "",
    description: "",
    is_public: false,
    formFields: [],
    created_date: "",
    modified_date: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   state.id !== props.formid && navigate(`/form/${state.id}`);
  // }, [state.id, props.formid]);

  useEffect(() => {
    fetchForm(props.formid).then((formData) => {
      dispatch({
        type: "formReady",
        payload: formData || initialState,
      });
    });
  }, []);

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
    <div className="p-4 ">
      <input
        className="border-2 border-gray-200 rounded-lg p-2 w-full h-10 mb-4 "
        type="text"
        value={state.title}
        onChange={(e) => {
          dispatch({
            type: "updateFormDetails",
            title: e.target.value,
            description: state.description || "",
            is_public: state.is_public || false,
          });
        }}
        ref={titleRef}
      />
      {errors.title && <p className="text-red-500">{errors.title}</p>}
      <hr className="mb-2" />

      <div className="flex flex-col mb-4">
        <label className="font-semibold text-lg">Description</label>
        <textarea
          className="border-2 border-gray-200 p-2 rounded-lg  my-2 flex-1"
          onChange={(e) => {
            dispatch({
              type: "updateFormDetails",
              title: state.title || "",
              description: e.target.value,
              is_public: state.is_public || false,
            });
          }}
          value={state.description}
        />

        {errors.description && (
          <p className="text-red-500">{errors.description}</p>
        )}
      </div>
      <div className="mb-4">
        <input
          className="mr-2 border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
          type="checkbox"
          name="is_public"
          id="is_public"
          value={state.is_public ? "true" : "false"}
          onChange={(e) => {
            dispatch({
              type: "updateFormDetails",
              title: state.title || "",
              description: state.description || "",
              is_public: e.target.checked ? true : false,
            });
          }}
        />
        <label
          htmlFor="is_public"
          className={`${errors.is_public ? "text-red-500" : ""} font-medium`}
        >
          Is Public
        </label>
        {errors.is_public && <p className="text-red-500">{errors.is_public}</p>}
      </div>

      {state.formFields.map((field) => {
        switch (field.kind) {
          case "TEXT":
          case "textarea":
            return (
              <InputField
                key={field.id}
                id={field.id}
                label={field.label}
                value={field.label}
                removeField={(id) => {
                  console.log("removing field...");
                  dispatch({ type: "removeField", id: field.id });
                }}
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
                removeField={(id) =>
                  dispatch({ type: "removeField", id: field.id })
                }
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
