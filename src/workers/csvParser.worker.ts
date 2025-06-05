export {}; // avoid global scope errors

self.onmessage = (e: MessageEvent<string>) => {
  try {
    const csvText = e.data;
    const [headerLine, ...lines] = csvText.split("\n");
    const headers = headerLine.split(",");

    const parsed = lines
      .map((line: string) => line.split(","))
      .filter((values: string[]) => values.length === headers.length)
      .map((values: string[]) => {
        const record: Record<string, string> = {};
        headers.forEach((header, i) => {
          record[header] = values[i];
        });
        return record;
      });

    postMessage(parsed);
  } catch (err) {
    postMessage({ error: true, message: (err as Error).message });
  }
};
