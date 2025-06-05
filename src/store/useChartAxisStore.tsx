import { create } from "zustand";

interface ChartAxisState {
  xField: string;
  yField: string;
  setXField: (field: string) => void;
  setYField: (field: string) => void;
}

export const useChartAxisStore = create<ChartAxisState>((set) => ({
  xField: "longitude",
  yField: "latitude",
  setXField: (field) => set({ xField: field }),
  setYField: (field) => set({ yField: field }),
}));
