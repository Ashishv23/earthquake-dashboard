import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelectedEarthquake } from "../context/SelectedEarthquakeContext";
import { useChartAxisStore } from "../store/useChartAxisStore";
import type { JSX } from "react/jsx-runtime";

export interface EarthquakeRecord {
  id: string;
  place: string;
  [key: string]: string;
}

interface ChartPanelProps {
  data: EarthquakeRecord[];
}

interface CustomShapeProps {
  cx?: number;
  cy?: number;
  payload: {
    id: string;
    isSelected?: boolean;
  };
}

const numericFields = ["mag", "depth", "latitude", "longitude"];

export default function ChartPanel({ data }: ChartPanelProps) {
  const { selected, setSelected } = useSelectedEarthquake();

  const xField = useChartAxisStore((state) => state.xField);
  const yField = useChartAxisStore((state) => state.yField);
  const setXField = useChartAxisStore((state) => state.setXField);
  const setYField = useChartAxisStore((state) => state.setYField);

  const parsedData = data
    .filter((row) => row[xField] && row[yField])
    .map((row) => {
      const x = parseFloat(row[xField]);
      const y = parseFloat(row[yField]);
      if (isNaN(x) || isNaN(y)) return null;

      return {
        x,
        y,
        id: row.id,
        label: row.place,
        isSelected: selected?.id === row.id,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

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
          <Scatter
            name="Earthquakes"
            data={parsedData}
            fill="#3182CE"
            onClick={(e) => {
              const match = data.find((row) => row.id === e.id);
              if (match) {
                setSelected(match);
              }
            }}
            shape={
              ((props: CustomShapeProps) => {
                const { cx = 0, cy = 0, payload } = props;
                const radius = payload.isSelected ? 8 : 4;
                const color = payload.isSelected ? "#E53E3E" : "#3182CE";
                return <circle cx={cx} cy={cy} r={radius} fill={color} />;
              }) as (props: unknown) => JSX.Element
            }
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
