import React, { useState, useEffect } from "react";

import { common_filter_classes } from "./common";
import { SeasonModal } from "./season";

function catFunc(key) {
  const cb = (row, struct, accepted, responsible) => {
    if (accepted || responsible) {
      struct.add(row[key]);
    }
    return struct;
  };
  return [() => new Set(), cb];
}
function CatFilter({ col, struct, dispatch }) {
  let l = [...struct.values()].sort();
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    console.log(col, selected);
    if (selected.length === 0) {
      dispatch({ type: "FILTER_UPDATE", col: col, filter: (r) => true });
    } else {
      dispatch({
        type: "FILTER_UPDATE",
        col: col,
        filter: (r) => selected.some((s) => s === r[col]),
      });
    }
  }, [col, dispatch, selected]);
  return (
    <div className={common_filter_classes}>
      <h5> Filter for {col} </h5>
      <select
        multiple
        className="form-select"
        value={selected}
        onChange={(e) =>
          setSelected(
            [...e.target.options].filter((o) => o.selected).map((o) => o.value)
          )
        }
      >
        {l.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      {col === "Season" && <SeasonModal />}
      <div className="btn btn-danger" onClick={() => setSelected([])}>
        {" "}
        clear{" "}
      </div>
    </div>
  );
}
export { CatFilter, catFunc };
