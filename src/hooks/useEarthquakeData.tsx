import { useQuery } from "@tanstack/react-query";

const csvUrl =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv";

function parseCSV(csvText: string) {
  const lines = csvText.split("\n");
  const headers = lines[0].split(",");

  return lines
    .slice(1)
    .map((line) => {
      const values = line.split(",");
      const record: Record<string, string> = {};
      headers.forEach((header, index) => {
        record[header] = values[index];
      });
      return record;
    })
    .filter((row) => Object.keys(row).length === headers.length);
}

export function useEarthquakeData() {
  return useQuery({
    queryKey: ["earthquakeData"],
    queryFn: async () => {
      const res = await fetch(csvUrl);
      const text = await res.text();
      return parseCSV(text);
    },
  });
}
