export {}; // avoid global scope conflicts

self.onmessage = (e: MessageEvent<string>) => {
  try {
    const csvText = e.data;
    const [headerLine, ...lines] = csvText.split("\n");
    const headers = headerLine.split(",");

    const parsed = lines
      .map((line) => {
        const values = line.split(",");
        if (values.length !== headers.length) return null;

        const record: Record<string, string> = {};
        headers.forEach((header, i) => {
          record[header] = values[i];
        });

        // Filter out incomplete records
        if (
          !record.id ||
          !record.place ||
          !record.latitude ||
          !record.longitude
        ) {
          return null;
        }

        return record;
      })
      .filter((r): r is Record<string, string> => r !== null);

    console.log("[Worker] Parsed records:", parsed.length);
    postMessage(parsed);
  } catch (err) {
    console.error("[Worker] Error:", err);
    postMessage({ error: true, message: (err as Error).message });
  }
};
