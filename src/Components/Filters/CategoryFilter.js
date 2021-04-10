import React, { useState, useEffect } from "react";

import { common_filter_classes } from "./common";

function catFunc(key) {
  const cb = (row, struct) => {
    struct.add(row[key]);
    return struct;
  };
  return [() => new Set(), cb];
}
function CatFilter({ col, struct, dispatch }) {
  let l = [...struct.values()].sort();
  l.push("None");
  const [selected, setSelected] = useState("None");
  useEffect(() => {
    if (selected === "None") {
      dispatch({ type: "FILTER_UPDATE", col: col, filter: (r) => true });
    } else {
      dispatch({
        type: "FILTER_UPDATE",
        col: col,
        filter: (r) => r[col] === selected,
      });
    }
  }, [col, dispatch, selected]);
  return (
    <div className={common_filter_classes}>
      <h5> CatFilter for {col} </h5>
      <select
        className="form-select"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {l.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
export { CatFilter, catFunc };
