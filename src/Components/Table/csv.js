export function createCSVBlob(data, cols) {
  let out = [];
  out.push(cols.map((c) => c.accessor));
  for (let i = 0; i < data.length; i++) {
    let row = [];
    for (let j = 0; j < cols.length; j++) {
      row.push(`"${data[i][cols[j].accessor]}"`);
    }
    out.push(row.join(","));
  }
  return new Blob([out.join("\n")], { type: "text/csv" });
}
