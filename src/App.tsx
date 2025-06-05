import { useEarthquakeData } from "./hooks/useEarthquakeData";
import ChartPanel from "./components/ChartPanel";
import DataTable from "./components/DataTable";

function App() {
  const { data, isLoading, error } = useEarthquakeData();

  if (isLoading) return <p className="text-center mt-10">Loading data...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-600">Error loading data.</p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
        Earthquake Dashboard
      </h1>

      {/* Fill remaining space */}
      <div className="flex flex-col md:flex-row gap-4 flex-grow h-[calc(100vh-6rem)]">
        <div className="md:w-1/2 w-full h-full">
          <ChartPanel data={data ?? []} />
        </div>
        <div className="md:w-1/2 w-full h-full">
          <DataTable data={data ?? []} />
        </div>
      </div>
    </div>
  );
}

export default App;
