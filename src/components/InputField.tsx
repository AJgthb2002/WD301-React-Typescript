export default function InputField(props: {
  id: number;
  label: string;
  value: string;
  removeField: (id: number) => void;
  handleFieldInput: (id: number, newval: string) => void;
}) {
  return (
    <div key={props.id}>
      <div className="flex">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          type="text"
          value={props.value}
          onChange={(e) => {
            props.handleFieldInput(props.id, e.target.value);
            console.log(e.target.value);
          }}
        />

        <button
          className=" bg-blue-600 text-white font-bold rounded-lg px-4 ml-4 h-8"
          onClick={(_) => props.removeField(props.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
