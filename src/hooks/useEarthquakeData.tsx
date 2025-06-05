import { useQuery } from "@tanstack/react-query";

const csvUrl =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv";

export function useEarthquakeData() {
  return useQuery({
    queryKey: ["earthquakeData"],
    queryFn: async () => {
      const res = await fetch(csvUrl);
      const text = await res.text();

      const worker = new Worker(
        new URL("../workers/csvParser.worker.ts", import.meta.url),
        { type: "module" }
      );

      return new Promise<Record<string, string>[]>((resolve, reject) => {
        worker.postMessage(text);

        worker.onmessage = (e) => {
          const result = e.data;
          if (result?.error) {
            reject(new Error(result.message || "Worker error"));
          } else {
            resolve(result);
          }
        };

        worker.onerror = (err) => {
          reject(err);
        };
      });
    },
  });
}
