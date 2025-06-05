import { useQuery } from "@tanstack/react-query";
import type { EarthquakeRecord } from "../types";

const csvUrl =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv";

export function useEarthquakeData() {
  return useQuery<EarthquakeRecord[]>({
    queryKey: ["earthquakeData"],
    queryFn: async () => {
      const res = await fetch(csvUrl);
      const text = await res.text();

      const worker = new Worker(
        new URL("../workers/csvParser.worker.ts", import.meta.url),
        {
          type: "module",
        }
      );

      return new Promise<EarthquakeRecord[]>((resolve, reject) => {
        worker.postMessage(text);

        worker.onmessage = (event) => {
          const parsed = event.data;

          const cleaned = parsed.filter(
            (row: Record<string, string>) => row.id && row.place
          ) as EarthquakeRecord[];

          resolve(cleaned);
          worker.terminate();
        };

        worker.onerror = (err) => {
          worker.terminate();
          reject(err);
        };
      });
    },
  });
}
