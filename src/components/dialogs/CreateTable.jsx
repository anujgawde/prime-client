import { useState } from "react";
import BaseInput from "../base/BaseInput";
import BaseButton from "../base/BaseButton";

export default function CreateTable({ insertTable, toggleDialog }) {
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();

  const createTable = () => {
    insertTable(rows, columns);
  };

  return (
    <div
      onClick={toggleDialog}
      className="z-[9999] fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 p-6 relative flex flex-col justify-between space-y-4"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up to the parent div
      >
        {/* Dialog Header */}
        <div className="text-2xl">Add Table</div>

        <BaseInput
          value={rows}
          name="rowCount"
          placeHolder=""
          label="Number of Rows"
          errorText=""
          onChange={(event) => {
            setRows(event.target.value);
          }}
          type={"number"}
        />
        <BaseInput
          value={columns}
          name="colCount"
          placeHolder=""
          label="Number of Columns"
          errorText=""
          onChange={(event) => {
            setColumns(event.target.value);
          }}
          type={"number"}
        />

        {/* Dialog CTA */}
        <BaseButton buttonText="Add Table" onClick={createTable} />
      </div>
    </div>
  );
}
