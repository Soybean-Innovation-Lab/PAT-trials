import React, { useReducer, useEffect } from "react";

import { QuantFilter, quantFunc } from "../Filters/QuantFilter";
import { CatFilter, catFunc } from "../Filters/CategoryFilter";
import { TimeFilter, timeFunc } from "../Filters/TimeFilter";

import DataTable from "../Table";
/*
  What I'm think wrt in data display/select optoins
  - "D": this column should be included in display
  - "C": every option in this column should be a filterable category
  - "Q": This should be a quantitativly filterable column
  - "T": This column should allow time based filtering
  
  Here's what the implementation should look like:
  We start by fetching the data and parsing it into the standard list of objects
  format. We also parse the metadata header into a dict of column name -> value
  (aka standard format). Then we initialize our filter data structure which is
  just a dict of column name to filter function. The filters all start out just
  being true. 
  Then the loop. We loop through the data, simultaneously filtering, and
  building up the list of filter options as described below. The list of filter
  options are later fed into the filters.
  Then we initialize our filters elements. For each column which requires a
  filter we create the appropriate filter type element; either
  <QuantFilter> or <CategoryFilter> or whatever. Each of these filters has an
  associated function which you use while iterating through all of the data so
  that they can keep track of which filters are valid. The function like
  maintains some datastructure returning the initial datastructure if not passed
  anything and otherwise it takes the data structure and a new element and
  returns the updated datastructure. The filter elements call a callback to update their filter and things loop again. The filters also need an option to clear the filter.
 */

function gotData(state, action) {
  let keys = action.keys;
  let cols = {};
  for (let key of Object.keys(keys)) {
    let initdata = undefined;
    let builder = undefined;
    let el = undefined;
    let t = keys[key];
    switch (t.filterType) {
      case "Q":
        el = QuantFilter;
        [initdata, builder] = quantFunc(key);
        break;
      case "C":
        el = CatFilter;
        [initdata, builder] = catFunc(key);
        break;
      case "T":
        el = TimeFilter;
        [initdata, builder] = timeFunc(key);
        break;
      default:
        break;
    }
    cols[key] = {
      filter: (row) => true,
      display: t.display,
      el: el,
      builder: builder,
      initdata: initdata,
    };
  }
  state = { ...state, data: action.data, keys: action.keys, columns: cols };
  return dataDisplayUpdate(state, {});
}
function dataDisplayUpdate(state, action) {
  const { columns, data } = state;
  let vkeys = [];
  for (let col of Object.keys(columns)) {
    if (columns[col].display) {
      vkeys.push(col);
    }
  }
  let vdata = [];
  let cdata = {};
  for (let col of Object.keys(columns)) {
    cdata[col] =
      typeof columns[col].initdata === "function" && columns[col].initdata();
  }
  for (let i = 0; i < data.length; i++) {
    let include = true;
    let responsible = null;
    for (let col of Object.keys(columns)) {
      if (!columns[col].filter(data[i])) {
        include = false;
        if (responsible === null) {
          responsible = col;
        } else {
          responsible = undefined;
        }
      }
    }
    for (let col of Object.keys(columns)) {
      if (columns[col].builder) {
        cdata[col] = columns[col].builder(
          data[i],
          cdata[col],
          include,
          col === responsible
        );
      }
    }
    if (include) {
      vdata.push(data[i]);
    }
  }
  return {
    ...state,
    visibleData: vdata,
    visibleKeys: vkeys,
    colLoopData: cdata,
  };
}
function reducer(state, action) {
  switch (action.type) {
    case "DATA":
      state = gotData(state, action);
      break;
    case "ERROR":
      state = { ...state, error: action.error };
      break;
    case "DATA_DISPLAY_UPDATE":
      state = dataDisplayUpdate(state, action);
      break;
    case "FILTER_UPDATE":
      let columns = state.columns;
      columns[action.col].filter = action.filter;
      state = { ...state, columns: columns };
      state = dataDisplayUpdate(state, action);
      break;
    default:
      break;
  }
  return state;
}

function App() {
  const [
    { data, error, columns, visibleData, colLoopData, visibleKeys },
    dispatch,
  ] = useReducer(reducer, {
    data: [],
    keys: {},
    error: null,
    columns: {},
    colLoopData: {},
    visibleKeys: [],
  });

  useEffect(() => {
    fetch("data.json")
      .then((d) => d.json())
      .then((d) => {
        dispatch({ type: "DATA", data: d.data, keys: d.keys });
      })
      .catch((e) => {
        dispatch({ type: "ERROR", error: e });
      });
  }, []);

  if (error) {
    return <h5> Error Occurred {error} </h5>;
  } else if (data.length === 0) {
    return <h5> Loading </h5>;
  }

  let filter_els = [];
  for (let colK of Object.keys(columns)) {
    let col = columns[colK];
    if (col.el) {
      filter_els.push(
        React.createElement(col.el, {
          key: colK,
          col: colK,
          struct: colLoopData[colK],
          dispatch: dispatch,
        })
      );
    }
  }

  return (
    <div className="container">
      <div className="d-flex flex-wrap justify-content-center">
        {filter_els}
      </div>
      <div>
        <DataTable keys={visibleKeys} data={visibleData} />
      </div>
    </div>
  );
}

export default App;
