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
  let data = [];
  for (let i = 0; i < action.data.length; i++) {
    let row = {};
    for (let col of Object.keys(action.data[i])) {
      switch (keys[col].filterType) {
        case "Q":
          row[col] = action.data[i][col];
          break;
        case "C":
          row[col] = `${action.data[i][col]}`;
          break;
        case "T":
          row[col] = action.data[i][col];
          break;
        default:
          row[col] = action.data[i][col];
          break;
      }
    }
    data.push(row);
  }
  state = { ...state, data: data, keys: action.keys, columns: cols };
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
      <h1 className="display-1 text-center"> Welcome to blah blah </h1>
      <h1 class="display-6">Introduction</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Tincidunt id aliquet
        risus feugiat. Adipiscing commodo elit at imperdiet. Porttitor massa id
        neque aliquam. Elit duis tristique sollicitudin nibh sit. Eget egestas
        purus viverra accumsan in nisl nisi scelerisque eu. Varius duis at
        consectetur lorem donec massa sapien. Ut sem nulla pharetra diam sit
        amet nisl suscipit. Diam vel quam elementum pulvinar. Lectus sit amet
        est placerat in egestas. Nunc lobortis mattis aliquam faucibus. Senectus
        et netus et malesuada. Velit aliquet sagittis id consectetur purus ut
        faucibus pulvinar elementum. Turpis massa sed elementum tempus. Sagittis
        eu volutpat odio facilisis. Non odio euismod lacinia at quis risus sed.
        Neque aliquam vestibulum morbi blandit. Sodales ut eu sem integer.
      </p>
      <p>
        <h1 class="display-6">Other stuff?</h1>
        Arcu dictum varius duis at. Eu facilisis sed odio morbi quis commodo
        odio aenean sed. Mauris cursus mattis molestie a iaculis at erat
        pellentesque adipiscing. Magna sit amet purus gravida quis blandit
        turpis cursus. Id ornare arcu odio ut sem nulla. Eget mauris pharetra et
        ultrices neque ornare aenean euismod elementum. Quam elementum pulvinar
        etiam non quam lacus suspendisse. Purus viverra accumsan in nisl nisi
        scelerisque eu ultrices vitae. Eget gravida cum sociis natoque. Tellus
        elementum sagittis vitae et leo. Feugiat in ante metus dictum at tempor
        commodo ullamcorper. Hac habitasse platea dictumst quisque sagittis
        purus. Turpis cursus in hac habitasse platea dictumst quisque sagittis
        purus. Dolor sit amet consectetur adipiscing. Accumsan in nisl nisi
        scelerisque eu ultrices vitae. Amet aliquam id diam maecenas ultricies
        mi. Dictum sit amet justo donec enim diam vulputate ut. Molestie at
        elementum eu facilisis sed.
      </p>
      <h1 class="display-6">Instructions</h1>
      <p>
        Use the filters below to select a subset of the available data. When no
        options in a column are selected then no filter is applied to that
        column. Click and drag or press control and click to select multiple
        options. If on a touch screen device touch multiple options to select
        them. Selected items are displayed, unselected items are hidden. Filters
        are combined by taking the intersection of rows that satisfy the filter
        for each column. Use the buttons below the table to navigate the data.
        Click on a column header to sort by that column. A down arrow indicates
        a descending sort. An up arrow indicates an ascending sort. Click the
        export as CSV button to download the visible data as a CSV.
      </p>
      <div className="d-flex flex-wrap justify-content-evenly">
        {filter_els}
      </div>
      <div>
        <DataTable keys={visibleKeys} data={visibleData} />
      </div>
    </div>
  );
}

export default App;
