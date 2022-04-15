// export type formdata ={
//     id: number;
//     title: string;
//     formFields: formfield[];
//   }
  
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
      kind: "TEXT";
      label: string;
      fieldType: textFieldTypes;
      value: string;
      meta:{
        type: textFieldTypes;
      }
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
  // type textFieldTypes= "TEXT"

  export type formfield = StringFormField | DropdownFormField | RadioButton | TextArea | MultiSelect

  export type ApiForm = {
  id?: number;
  title: string;
  description?: string;
  is_public?: boolean;
  created_date?: string;
  modified_date?: string;
  }

export type formdata = Partial<ApiForm> & { formFields: formfield[] };
  
export type Errors<T> = Partial<Record<keyof T, string>>;

export const validateForm = (form: ApiForm) => {
  const errors: Errors<ApiForm> = {};
  if (form.title.length < 1) {
    errors.title = "Title is required";
  }

  if (form.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }
  if (form.description && form.description.length > 1000) {
    errors.description = "Description must be less than 100 characters";
  }
  return errors;
};

export type Pagination<T> = {
  count : number
  next: string | null
  previous: string | null
  results: T[]
}


export type PaginationParams = {
  offset: number;
  limit: number;
}