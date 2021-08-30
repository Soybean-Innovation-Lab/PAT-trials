import React, { useState, useEffect } from "react";

import { common_filter_classes } from "./common";
import { SeasonModal } from "./season";
import { getChecks } from "../App/index";

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
  let checks = getChecks();
  let checkBoxUpdate;
  if (checks["countryDisplay"] || checks["seasonDisplay"] || checks["categoryDisplay"]) {
    checkBoxUpdate = "COUNTRY_DISPLAY_UPDATE";
  } else if (checks["seasonDisplay"]) {
    checkBoxUpdate = "SEASON_DISPLAY_UPDATE";
  } else if (checks["locationDisplay"]) {
    checkBoxUpdate = "LOCATION_DISPLAY_UPDATE";
  } else {
    checkBoxUpdate = "FILTER_UPDATE";
  }
  let l = [...struct.values()].sort();
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    
    if (selected.length === 0) {
      dispatch({ type: "FILTER_UPDATE", col: col, filter: (r) => true });
    } else if (selected.length === 1) {
      dispatch({
        type: "FILTER_UPDATE",
        col: col,
        filter: (r) => {
          for (var i = 0; i < selected.length; i++) {
            if (r[col] === selected[i]) {
              return true;
            }
          }          
        }
      });
    } else {
      let s = new Set(selected);
      dispatch({
        type: checkBoxUpdate,
        col: col,
        selected: s,
        filter: (r) => {
          for (var i = 0; i < selected.length; i++) {
            if (r[col] === selected[i]) {
              return true;
            }
          }
          return false;
        }
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
