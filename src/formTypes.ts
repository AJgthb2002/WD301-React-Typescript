export type formdata ={
    id: number;
    title: string;
    formFields: formfield[];
  }
  
  // For storing preview answers in an array
  export type Answer ={
    id: number;
    value: string;
  }

  export type MultiselectAnswer = {
    id: number;
    selected: string[];
  };

type StringFormField={
      id: number;
      kind: "text";
      label: string;
      fieldType: textFieldTypes;
      value: string;
  }

export type DropdownFormField={
    id: number;
    kind: "dropdown";
    label: string;
    options: string[];
    value: string;
  }

  type RadioButton={
    id: number;
    kind:"radio";
    label: string;
    options: string[];
    value: string;
  }

  type TextArea={
    id: number;
    kind:"textarea";
    label: string;
    value: string;

  }

  export type MultiSelect = {
    id: number;
    kind: "multiselect";
    options: string[];
    label: string;
    // value: string[];
  };

  type textFieldTypes= "text"| "email"| "tel" | "date" 

  export type formfield = StringFormField | DropdownFormField | RadioButton | TextArea | MultiSelect
  