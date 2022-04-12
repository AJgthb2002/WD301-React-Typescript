import { formfield, MultiSelect } from "../formTypes";

export default function PreviewField(props: {
  field: formfield | MultiSelect;
  storeValueCB: (id: number, value: string) => void;
  userinputval: string;
}) {
  switch (props.field.kind) {
    case "TEXT":
      return (
        <div className="flex flex-col mx-auto  gap-4">
          <label className="text-xl  font-semibold ">{props.field.label}</label>
          <input
            type={props.field.fieldType}
            value={props.userinputval}
            className="border-2 border-gray-200 p-2 rounded-lg  my-2 flex-1"
            onChange={(e) => {
              e.preventDefault();
              props.storeValueCB(props.field.id, e.target.value);
            }}
          />
        </div>
      );

    case "dropdown":
      return (
        <div className="flex flex-col mx-auto  gap-4">
          <label className="text-xl  font-semibold ">{props.field.label}</label>
          <select
            className="py-2 px-4"
            value={props.field.value}
            onChange={(e: any) => {
              e.preventDefault();
              props.storeValueCB(props.field.id, e.target.value);
            }}
          >
            <option value="">{props.userinputval}</option>
            {props.field.options.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
      );

    case "radio":
      return (
        <div className="flex flex-col mx-auto  gap-4">
          <label className="text-xl  font-semibold ">{props.field.label}</label>
          <div className="flex gap-4">
            {props.field.options.map((option, index) => {
              return (
                <div key={index}>
                  <input
                    type="radio"
                    id={String(index)}
                    value={option}
                    name={`field${props.field.id}`}
                    defaultChecked={props.userinputval === option}
                    onChange={(e: any) => {
                      e.preventDefault();
                      console.log("target val", e.target.value);
                      props.storeValueCB(props.field.id, e.target.value);
                    }}
                  />
                    <label htmlFor={String(index)}>{option}</label>
                </div>
              );
            })}
          </div>
        </div>
      );

    case "textarea":
      return (
        <div className="flex flex-col mx-auto  gap-4">
          <label className="text-xl  font-semibold ">{props.field.label}</label>
          <textarea
            rows={4}
            cols={50}
            value={props.userinputval}
            className="border-2 border-gray-200 p-2 rounded-lg  my-2 flex-1"
            onChange={(e) => {
              e.preventDefault();
              props.storeValueCB(props.field.id, e.target.value);
            }}
          />
        </div>
      );

    case "multiselect":
      return <></>;
  }
}
