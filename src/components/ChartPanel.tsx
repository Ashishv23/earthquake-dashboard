import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type EarthquakeRecord = Record<string, string>;

interface ChartPanelProps {
  data: EarthquakeRecord[];
}

const numericFields = ["mag", "depth", "latitude", "longitude"];

export default function ChartPanel({ data }: ChartPanelProps) {
  const [xField, setXField] = useState("longitude");
  const [yField, setYField] = useState("latitude");

  const parsedData = data
    .filter((row) => row[xField] && row[yField])
    .map((row) => ({
      x: parseFloat(row[xField]),
      y: parseFloat(row[yField]),
      id: row.id,
      label: row.place,
    }));

  return (
    <div className="bg-white shadow rounded p-4 h-full">
      <h2 className="text-xl font-semibold mb-4">Earthquake Chart</h2>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">X Axis</label>
          <select
            value={xField}
            onChange={(e) => setXField(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {numericFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Y Axis</label>
          <select
            value={yField}
            onChange={(e) => setYField(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {numericFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name={xField} />
          <YAxis type="number" dataKey="y" name={yField} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Earthquakes" data={parsedData} fill="#3182CE" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
