export interface formfield {
  id: number;
  label: string;
  type: string;
  value: string;
}

export interface formdata {
  id: number;
  title: string;
  formFields: formfield[];
}

export interface Answer {
  id: number;
  value: string;
}
