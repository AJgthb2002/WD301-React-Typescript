import { formfield } from "../interfaces";

export default function PreviewField(props: {
  field: formfield;
  storeValueCB: (id: number, value: string) => void;
  userinputval: string;
}) {
  return (
    <div className="flex flex-col mx-auto  gap-4">
      <label className="text-xl  font-semibold ">{props.field.label}</label>
      <input
        type={props.field.type}
        value={props.userinputval}
        className="border-2 border-gray-200 p-2 rounded-lg  my-2 flex-1"
        onChange={(e) => {
          e.preventDefault();
          props.storeValueCB(props.field.id, e.target.value);
        }}
      />
    </div>
  );
}
