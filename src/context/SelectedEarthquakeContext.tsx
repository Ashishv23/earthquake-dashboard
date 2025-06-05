import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface SelectedEarthquake {
  id: string;
}

interface SelectedEarthquakeContextType {
  selected: SelectedEarthquake | null;
  setSelected: (item: SelectedEarthquake | null) => void;
}

const SelectedEarthquakeContext = createContext<
  SelectedEarthquakeContextType | undefined
>(undefined);

export function SelectedEarthquakeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selected, setSelected] = useState<SelectedEarthquake | null>(null);

  return (
    <SelectedEarthquakeContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedEarthquakeContext.Provider>
  );
}

export function useSelectedEarthquake() {
  const context = useContext(SelectedEarthquakeContext);
  if (!context) {
    throw new Error(
      "useSelectedEarthquake must be used within a SelectedEarthquakeProvider"
    );
  }
  return context;
}
