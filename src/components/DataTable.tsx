import React, { useEffect, useRef } from "react";
import { useSelectedEarthquake } from "../context/SelectedEarthquakeContext";
import type { EarthquakeRecord } from "../types";

interface DataTableProps {
  data: EarthquakeRecord[];
}

export default function DataTable({ data }: DataTableProps) {
  const { selected, setSelected } = useSelectedEarthquake();

  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  useEffect(() => {
    if (selected?.id) {
      const el = rowRefs.current[selected.id];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selected]);

  return (
    <div className="bg-white shadow rounded p-4 h-full overflow-hidden flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Earthquake Data</h2>
      <div className="overflow-y-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-white z-10 shadow-sm">
            <tr className="bg-gray-100">
              {Object.keys(data[0] || {}).map((key) => (
                <th
                  key={key}
                  className="text-left px-4 py-2 border-b font-medium"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                ref={(el: HTMLTableRowElement | null) => {
                  rowRefs.current[row.id] = el;
                }}
                className={`${
                  selected?.id === row.id ? "bg-blue-100" : ""
                } hover:bg-blue-50 cursor-pointer`}
                onClick={() => setSelected(row)}
              >
                {Object.values(row).map((val, i) => (
                  <td key={i} className="px-4 py-2 border-b">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
