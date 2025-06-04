import React from "react";

type EarthquakeRecord = Record<string, string>;

interface DataTableProps {
  data: EarthquakeRecord[];
}

export default function DataTable({ data }: DataTableProps) {
  if (data.length === 0) {
    return <div className="text-gray-600">No data available.</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="bg-white shadow rounded p-4 h-full overflow-auto">
      <h2 className="text-xl font-semibold mb-2">Earthquake Data</h2>
      <div className="overflow-auto max-h-[75vh]">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="text-left px-2 py-1 border-b font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="even:bg-gray-50">
                {headers.map((header) => (
                  <td key={header} className="px-2 py-1 border-b">
                    {row[header]}
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
