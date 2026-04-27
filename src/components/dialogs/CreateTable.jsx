import { useState } from "react";
import DialogShell, {
  CancelButton,
  dialogFieldWrap,
  dialogInputCls,
  dialogLabelCls,
} from "../base/DialogShell";
import BaseButton from "../base/BaseButton";

export default function CreateTable({ insertTable, toggleDialog }) {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);

  const createTable = () => {
    insertTable(rows, columns);
  };

  const previewRows = Math.min(rows, 4);
  const previewCols = Math.min(columns, 6);

  return (
    <DialogShell
      title="Insert Table"
      subtitle="Choose dimensions for your table."
      toggleDialog={toggleDialog}
      width="max-w-sm"
      footer={
        <>
          <CancelButton onClick={toggleDialog} />
          <BaseButton onClick={createTable}>Insert Table</BaseButton>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className={`${dialogFieldWrap} flex-1`}>
            <label className={dialogLabelCls}>Rows</label>
            <input
              type="number"
              value={rows}
              min={1}
              max={20}
              onChange={(e) => setRows(+e.target.value)}
              className={dialogInputCls}
            />
          </div>
          <div className={`${dialogFieldWrap} flex-1`}>
            <label className={dialogLabelCls}>Columns</label>
            <input
              type="number"
              value={columns}
              min={1}
              max={10}
              onChange={(e) => setColumns(+e.target.value)}
              className={dialogInputCls}
            />
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold tracking-wider uppercase text-text-muted mb-2">
            Preview
          </div>
          <div
            className="grid gap-px bg-border-default rounded-[2px] overflow-hidden border border-border-default"
            style={{ gridTemplateColumns: `repeat(${previewCols}, 1fr)` }}
          >
            {Array.from({ length: previewRows * previewCols }).map((_, i) => (
              <div
                key={i}
                className={i < previewCols ? "bg-bg-subtle" : "bg-bg-surface"}
                style={{ height: i < previewCols ? "20px" : "14px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </DialogShell>
  );
}
