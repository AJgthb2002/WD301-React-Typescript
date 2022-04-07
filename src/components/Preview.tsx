import { useEffect, useReducer, useState } from "react";
import {
  formfield,
  formdata,
  Answer,
  MultiSelect,
  MultiselectAnswer,
} from "../formTypes";
import { Link } from "raviger";
import PreviewField from "./PreviewField";
// @ts-ignore
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

type PreviewAction = NextFieldAction | PrevFieldAction;

type NextFieldAction = {
  type: "nextField";
  currindex: number;
};

type PrevFieldAction = {
  type: "prevField";
  currindex: number;
};

const initialAnswers: (form: formdata) => Answer[] = (form) => {
  return form.formFields.map((field) => {
    return { id: field.id, value: "" };
  });
};

export default function Preview(props: { formid: number }) {
  const getLocalForms: () => formdata[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms");
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
  };

  function getForm(id: number) {
    const emptyform: formdata = {
      id: 0,
      title: "Form Not Found!!",
      formFields: [],
    };
    const localForms = getLocalForms();
    if (localForms.filter((form: formdata) => form.id === id).length > 0)
      return localForms.filter((form: formdata) => form.id === id)[0];
    else return emptyform;
  }

  const getInitialSelected = (form: formdata) => {
    let res: MultiselectAnswer[];

    res = form.formFields
      .filter((field: any) => field.kind === "multiselect")
      .map((field: any) => {
        return { id: field.id, selected: [] };
      });

    return res;
  };

  const [state, setState] = useState(() => getForm(props.formid));

  // const reducer: (prevState: formfield, action: PreviewAction) => formfield = (
  //   prevState,
  //   action
  // ) => {
  //   switch (action.type) {
  //     case "prevField":
  //       return state.formFields[action.currindex - 1]
  //         ? state.formFields[action.currindex - 1]
  //         : state.formFields[0];

  //     case "nextField":
  //       return state.formFields[action.currindex + 1]
  //         ? state.formFields[action.currindex + 1]
  //         : state.formFields[action.currindex];

  //     default:
  //       return prevState;
  //   }
  // };
  const indexreducer: (
    currindex: number,
    action: { type: "INC" | "DEC" }
  ) => number = (currindex, action) => {
    switch (action.type) {
      case "INC":
        return currindex + 1 < state.formFields.length
          ? currindex + 1
          : currindex;

      case "DEC":
        return currindex - 1 >= 0 ? currindex - 1 : 0;
    }
  };

  const [currindex, dispatch] = useReducer(indexreducer, 0);

  // const [fieldState, dispatch] = useReducer<formfield>(
  //   reducer,
  //   state.formFields[0]
  // );
  const [userinputs, setUserinputs] = useState(() => initialAnswers(state));
  // const [fieldState, setFieldState] = useState<formfield>(state.formFields[0]);
  const [fieldState, setFieldState] = useState<formfield>(
    state.formFields[currindex]
  );

  useEffect(() => {
    setFieldState((p) => state.formFields[currindex]);
  }, [currindex]);

  const [selectedOptions, setSelectedOptions] = useState(() =>
    getInitialSelected(state)
  );

  const handleFieldInput = (id: number, newval: string) => {
    let field = state.formFields.filter((field) => field.id === id)[0];

    setUserinputs(
      userinputs.map((answer) =>
        answer.id === id ? { ...answer, value: newval } : answer
      )
    );
  };

  const getUserinput = () => {
    return userinputs.filter((answer) => answer.id === fieldState.id)[0].value;
  };

  const getOptions = (field: MultiSelect) => {
    const res = field.options.map((opt) => {
      return { label: `${opt}`, value: `${opt}` };
    });
    return res;
  };

  function onChange(value: any, event: any) {
    const changed = selectedOptions.filter(
      (opt) => opt.id === fieldState.id
    )[0];
    setSelectedOptions([
      ...selectedOptions.filter((opt) => opt.id !== changed.id),
      { id: changed.id, selected: value },
    ]);
  }

  return (
    <div className=" rounded-lg bg-gray-100 px-8 py-2 my-20 mx-40 justify-between items-center p-4 ">
      {state.title === "Form Not Found!!" ? (
        <div className="text-2xl font-semibold text-center">
          Form Not Found!!
        </div>
      ) : (
        <>
          {state.formFields.length > 0 ? (
            <div className="  ">
              <div className="flex justify-between items-center">
                <h2 className="text-center text-3xl font-bold mx-auto p-8">
                  {state.title}
                </h2>
              </div>
              <div className="text-lg mb-8">
                {" "}
                Question No. {state.formFields.indexOf(fieldState) + 1} /{" "}
                {state.formFields.length}{" "}
              </div>
              {fieldState.kind === "multiselect" ? (
                <div className="flex flex-col mx-auto  gap-4">
                  <label className="text-xl  font-semibold ">
                    {fieldState.label}
                  </label>
                  <ReactMultiSelectCheckboxes
                    options={getOptions(fieldState)}
                    value={
                      selectedOptions.filter(
                        (opt) => opt.id === fieldState.id
                      )[0].selected
                    }
                    onChange={onChange}
                    // setState={setSelectedOptions}
                  />
                </div>
              ) : (
                <PreviewField
                  field={fieldState}
                  storeValueCB={handleFieldInput}
                  userinputval={getUserinput()}
                />
              )}
              <div className="flex gap-10 my-4 justify-center">
                {state.formFields.indexOf(fieldState) + 1 !==
                state.formFields.length ? (
                  <>
                    <button
                      onClick={() => {
                        dispatch({
                          type: "DEC",
                        });
                      }}
                      className="bg-blue-500 text-lg  hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg"
                    >
                      {"<<"} Previous
                    </button>
                    <button
                      onClick={() => {
                        dispatch({
                          type: "INC",
                        });
                      }}
                      className="bg-blue-500 text-lg  hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg"
                    >
                      Next {">>"}
                    </button>{" "}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        dispatch({
                          type: "DEC",
                        });
                      }}
                      className="bg-blue-500 text-lg  hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg"
                    >
                      {"<<"} Previous
                    </button>
                    <Link
                      href="/"
                      className="bg-blue-500 text-lg  hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg"
                    >
                      Go to Main Page
                    </Link>
                  </>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-lg  mx-auto p-8">
              Add fields to this form to see a preview.
            </p>
          )}
        </>
      )}
    </div>
  );
}
