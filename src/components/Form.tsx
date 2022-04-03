import { useState, useEffect, useRef } from "react";
import InputField from "./InputField";
import { formfield, formdata, DropdownFormField } from "../formTypes";
import { navigate, Link } from "raviger";
import DropdownField from "./DropdownField";
import RadioButtonField from "./RadioButtonField";
import MultiselectField from "./MultiselectField";

export default function Form(props: { formid: number }) {
  const [newField, setNewField] = useState({
    text: "New Text Field Label",
    dropdown: "New Dropdown Field Label",
    radio: "New Radio Field Label",
    textarea: "New Textarea Field Label",
    multiselect: "New Multiselect Field Label",
  });
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
      label: "Fav Food",
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

  const addDropdownField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          kind: "dropdown",
          id: Number(new Date()),
          label: newField.dropdown,
          options: ["default option 1", "default option 2"],
          value: "",
        },
      ],
    });
    setNewField({ ...newField, dropdown: "New Dropdown Field Label" });
  };
  const addMultiselectField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          kind: "multiselect",
          id: Number(new Date()),
          label: newField.multiselect,
          options: ["default option 1", "default option 2", "default option 3"],
          // value: []
        },
      ],
    });
    setNewField({ ...newField, multiselect: "New Multiselect Field Label" });
  };
  const addTextField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          kind: "text",
          id: Number(new Date()),
          label: newField.text,
          fieldType: "text",
          value: "",
        },
      ],
    });

    setNewField({ ...newField, text: "New Text Field Label" });
  };
  const addTextAreaField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          kind: "textarea",
          id: Number(new Date()),
          label: newField.textarea,
          value: "",
        },
      ],
    });

    setNewField({ ...newField, textarea: "New Textarea Field Label" });
  };

  const addRadioField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          kind: "radio",
          id: Number(new Date()),
          label: newField.radio,
          options: ["default option 1", "default option 2"],
          value: "",
        },
      ],
    });

    setNewField({ ...newField, radio: "New Radio Field Label" });
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

  // const editOptions = (id:number, name:string, action: string) => {
  //   const field: any = state.formFields.find((field) => field.id === id);

  //   if (field) {
  //     console.log("inside editoptions");
  //     let newField={}
  //     switch(action){
  //       case "add":
  //         newField = {
  //           ...field,
  //           options: [...field.options, name],
  //         }

  //       case "remove":
  //         newField = {
  //           ...field,
  //           options: field.options.filter((o:any) => o !== name),
  //         }

  //     }

  //     console.log("new field", newField);
  //     setState({
  //       ...state,
  //       formFields: state.formFields.map((field) =>
  //         field.id === id ? newField : field
  //       ),
  //     });
  //     console.log("state set in editoptions", state);
  //   }
  // };

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
      <span>Add a new String Field</span>
      <div className="flex mt-4 mb-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 w-full h-10"
          type="text"
          value={newField.text}
          onChange={(e) => {
            e.preventDefault();
            setNewField({ ...newField, text: e.target.value });
          }}
        />
        <button
          className=" bg-blue-600 text-white font-bold rounded-lg  ml-4 px-4"
          onClick={addTextField}
        >
          Add Field
        </button>
      </div>

      <hr className="my-2" />
      <span>Add a new Dropdown Field</span>
      <div className="flex mt-4 mb-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 w-full h-10"
          type="dropdown"
          value={newField.dropdown}
          onChange={(e) => {
            e.preventDefault();
            setNewField({ ...newField, dropdown: e.target.value });
          }}
        />
        <button
          className=" bg-blue-600 text-white font-bold rounded-lg  ml-4 px-4"
          onClick={addDropdownField}
        >
          Add Field
        </button>
      </div>

      <hr className="my-2" />
      <span>Add a new Radio Button Field</span>
      <div className="flex mt-4 mb-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 w-full h-10"
          type="text"
          value={newField.radio}
          onChange={(e) => {
            e.preventDefault();
            setNewField({ ...newField, radio: e.target.value });
          }}
        />
        <button
          className=" bg-blue-600 text-white font-bold rounded-lg  ml-4 px-4"
          onClick={addRadioField}
        >
          Add Field
        </button>
      </div>

      <hr className="my-2" />
      <span>Add a new Text Area Field</span>
      <div className="flex mt-4 mb-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 w-full h-10"
          type="text"
          value={newField.textarea}
          onChange={(e) => {
            e.preventDefault();
            setNewField({ ...newField, textarea: e.target.value });
          }}
        />
        <button
          className=" bg-blue-600 text-white font-bold rounded-lg  ml-4 px-4"
          onClick={addTextAreaField}
        >
          Add Field
        </button>
      </div>

      <hr className="my-2" />
      <span>Add a new Multiselect Field</span>
      <div className="flex mt-4 mb-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 w-full h-10"
          type="text"
          value={newField.multiselect}
          onChange={(e) => {
            e.preventDefault();
            setNewField({ ...newField, multiselect: e.target.value });
          }}
        />
        <button
          className=" bg-blue-600 text-white font-bold rounded-lg  ml-4 px-4"
          onClick={addMultiselectField}
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
