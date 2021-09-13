import React, { useReducer, useEffect, Component } from "react";

import { QuantFilter, quantFunc } from "../Filters/QuantFilter";
import { CatFilter, catFunc } from "../Filters/CategoryFilter";
import { TimeFilter, timeFunc } from "../Filters/TimeFilter";

import DataTable from "../Table";

import sil_img from "./sil.png";
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
function countryDisplayUpdate(state, action) {
  const { columns, data, selected } = state;
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
  let s = Array.from(selected);
  let vselected = [];
  //goes through the selected and checks if it is in the new data
  for (let j = 0; j < s.length; j++) {
    let entryList = [];
    //goes through vdata and checks if the selected is in it
    for (let i = 0; i < vdata.length; i++) {
      if (vdata[i]["Entry"] === s[j]) {
        entryList.push(vdata[i]);
        
      }
    } 
    vselected.push(entryList);
  }
  
  let common = [];
  let country_array  = [];
  for (let i = 0; i < vselected.length; i++) {
    let toAdd = [];
    for (let j = 0; j < vselected[i].length; j++) {
      toAdd.push(vselected[i][j]["Country"]); 
    }
    country_array.push(toAdd);
  }
  let result = country_array.reduce((a, b) => a.filter(c => b.includes(c)));
  let uniqueResult = [...new Set(result)];
  for (let i = 0; i < vselected.length; i++) {
    for (let j = 0; j < vselected[i].length; j++) {
      if (uniqueResult.includes(vselected[i][j]["Country"])) {
        common.push(vselected[i][j]);
      }
    }
  }

  const mySet = new Set();
  for (let i = 0; i < common.length; i++) {
    if (cdata["Country"].has(common[i]["Country"])) {
      mySet.add(common[i]["Country"]);
    }
  }
  cdata["Country"] = mySet;
  const mySet2 = new Set();
  for (let i = 0; i < common.length; i++) {
    if (cdata["Location"].has(common[i]["Location"])) {
      mySet2.add(common[i]["Location"]);
    }
  }
  cdata["Location"] = mySet2;
  const mySet3 = new Set();
  for (let i = 0; i < common.length; i++) {
    if (cdata["Season"].has(common[i]["Season"])) {
      mySet3.add(common[i]["Season"]);
    }
  }
  cdata["Season"] = mySet3;
  
  vdata = common;
  return {
    ...state,
    visibleData: vdata,
    visibleKeys: vkeys,
    colLoopData: cdata,
  };
}

function seasonDisplayUpdate(state, action) {
  const { columns, data, selected } = state;
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
  let s = Array.from(selected);
  let vselected = [];
  for (let j = 0; j < s.length; j++) {
    let toAdd = [];
    for (let i = 0; i < vdata.length; i++) {
      if (vdata[i]["Entry"] === s[j]) {
        toAdd.push(vdata[i]);
      }
    } 
    vselected.push(toAdd);
  }
  //check if multiple arrays have common elements
  let common = [];
  let season_array  = [];
  for (let i = 0; i < vselected.length; i++) {
    let toAdd = [];
    for (let j = 0; j < vselected[i].length; j++) {
      toAdd.push(vselected[i][j]["Season"]); 
    }
    season_array.push(toAdd);
  }
  let result = season_array.reduce((a, b) => a.filter(c => b.includes(c)));
  let uniqueResult = [...new Set(result)];
  for (let i = 0; i < vselected.length; i++) {
    for (let j = 0; j < vselected[i].length; j++) {
      if (uniqueResult.includes(vselected[i][j]["Season"])) {
        common.push(vselected[i][j]);
      }
    }
  }
  const mySet = new Set();
  for (let i = 0; i < common.length; i++) {
    if (cdata["Country"].has(common[i]["Country"])) {
      mySet.add(common[i]["Country"]);
    }
  }
  cdata["Country"] = mySet;
  const mySet2 = new Set();
  for (let i = 0; i < common.length; i++) {
    if (cdata["Location"].has(common[i]["Location"])) {
      mySet2.add(common[i]["Location"]);
    }
  }
  cdata["Location"] = mySet2;
  const mySet3 = new Set();
  for (let i = 0; i < common.length; i++) {
    if (cdata["Season"].has(common[i]["Season"])) {
      mySet3.add(common[i]["Season"]);
    }
  }
  cdata["Season"] = mySet3;
  vdata = common;
  return {
    ...state,
    visibleData: vdata,
    visibleKeys: vkeys,
    colLoopData: cdata,
  };
}
function locationDisplayUpdate(state, action) {
  const { columns, data, selected } = state;
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
  let s = Array.from(selected);
  let vselected = [];
  for (let j = 0; j < s.length; j++) {
    let toAdd = [];
    for (let i = 0; i < vdata.length; i++) {
      if (vdata[i]["Entry"] === s[j]) {
        toAdd.push(vdata[i]);
      }
    } 
    vselected.push(toAdd);
  }
  //check if multiple arrays have common elements
  let common = [];
  let location_array  = [];
  for (let i = 0; i < vselected.length; i++) {
    let toAdd = [];
    for (let j = 0; j < vselected[i].length; j++) {
      toAdd.push(vselected[i][j]["Location"]); 
    }
    location_array.push(toAdd);
  }
  let result = location_array.reduce((a, b) => a.filter(c => b.includes(c)));
  let uniqueResult = [...new Set(result)];
  for (let i = 0; i < vselected.length; i++) {
    for (let j = 0; j < vselected[i].length; j++) {
      if (uniqueResult.includes(vselected[i][j]["Location"])) {
        common.push(vselected[i][j]);
      }
    }
  }
  vdata = common;
  const mySet = new Set();
  for (let i = 0; i < common.length; i++) {
    if (cdata["Country"].has(common[i]["Country"])) {
      mySet.add(common[i]["Country"]);
    }
  }
  cdata["Country"] = mySet;
  const mySet2 = new Set();
  for (let i = 0; i < common.length; i++) {
    if (cdata["Location"].has(common[i]["Location"])) {
      mySet2.add(common[i]["Location"]);
    }
  }
  cdata["Location"] = mySet2;
  const mySet3 = new Set();
  for (let i = 0; i < common.length; i++) {
    if (cdata["Season"].has(common[i]["Season"])) {
      mySet3.add(common[i]["Season"]);
    }
  }
  cdata["Season"] = mySet3;

  return {
    ...state,
    visibleData: vdata,
    visibleKeys: vkeys,
    colLoopData: cdata,
  };
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
  let columns = state.columns;
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
      columns[action.col].filter = action.filter;
      state = { ...state, columns: columns };
      state = dataDisplayUpdate(state, action);
      break;
    case "COUNTRY_DISPLAY_UPDATE":
      columns[action.col].filter = action.filter;
      state = { ...state, columns: columns, selected: action.selected };
      state = countryDisplayUpdate(state, action);
      break;
      case "SEASON_DISPLAY_UPDATE":
      columns[action.col].filter = action.filter;
      state = { ...state, columns: columns, selected: action.selected };
      state = seasonDisplayUpdate(state, action);
      break;
      case "LOCATION_DISPLAY_UPDATE":
      columns[action.col].filter = action.filter;
      state = { ...state, columns: columns, selected: action.selected };
      state = locationDisplayUpdate(state, action);
      break;
    default:
      break;
  }
  return state;
}
let countryDisplay, seasonDisplay, locationDisplay;
function setChecks(c, s, l) {
  countryDisplay = c;
  seasonDisplay = s;
  locationDisplay = l;
}
function getChecks() {
  return {
    countryDisplay,
    seasonDisplay,
    locationDisplay,
  };
}
export { getChecks };
function App() {
  const [checkedCountry, setCheckedCountry] = React.useState(false);
  const [checkedSeason, setCheckedSeason] = React.useState(false);
  const [checkedLocation, setCheckedLocation] = React.useState(false);

  const handleChangeOne = () => {
    setCheckedCountry(!checkedCountry);
  };
 
  const handleChangeTwo = () => {
    setCheckedSeason(!checkedSeason);
  };
  const handleChangeThree = () => {
    setCheckedLocation(!checkedLocation);
  };
  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };
  setChecks(checkedCountry, checkedSeason, checkedLocation);
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
    fetch(
      "https://sil-interactive-soybean-map-data-1.s3.amazonaws.com/pat_db.json"
    )
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
      <img
        src={sil_img}
        className="mx-auto d-block"
        alt="SIL logo"
        style={{ "max-width": "300px" }}
      />
      <h1 className="display-1 text-center">
        Pan-African Soybean Variety Trials (PAT) Database{" "}
      </h1>
      <h1 class="display-6">Introduction</h1>
      <p>
        The Soybean Innovation Lab’s Pan-African Soybean Variety Trials (PAT)
        fast-track the introduction and testing of commercial soybean varieties
        sourced from across Africa, the U.S., Australia, and Latin America to
        provide the private sector, farmers, and processors with access to a
        broader selection of seed than what is currently available. The program
        consortium leverages its role as an independent third party and its
        unique access to international, regional, and national supplies of
        high-yielding germplasm to swiftly bring new varieties to market.
      </p>
      <p>
        The PAT database covers results from trials in Benin, Cameroon,
        Ethiopia, Ghana, Kenya, Malawi, Mali, Mozambique, Nigeria, Rwanda,
        Sudan, Uganda, Zambia and Zimbabwe from 2015 to 2020.{" "}
        <b>
          The tool will be continuously updated to include other countries and
          seasons of testing.
        </b>
      </p>
      <h1 class="display-6">Instructions</h1>
      <p>
        To explore the PAT database start with selecting one of the filters
        below. The filters are connected, and the first selection will determine
        the options available in the other filters. You can select multiple
        options by holding the Ctrl key while clicking. If you decide to change
        the filter, you can click on another option within the same filter or
        select the option <b>clear</b>. The result of the selected filters will
        show up as a table at the bottom of the screen. Please click{" "}
        <b>Download as CSV</b> to download the data.
      </p>
      <p>
        {" "}
        Questions about this data?{" "}
        <a href="mailto:soybeaninnovationlab@illinois.edu">
          {" "}
          Please Contact SIL{" "}
        </a>{" "}
      </p>
      <div class="checkbox">
        <div class="center-text">
        <p> If you wish select multiple entries, check the category you wish to find overlaps with. 
          If you want to display all of the data, leave the checkboxes blank.</p>
          </div>
          <div class="center">
      <Checkbox
        label=" Country"
        value={checkedCountry}
        onChange={handleChangeOne}
      />
      {"    "}
      <Checkbox
        label=" Season"
        value={checkedSeason}
        onChange={handleChangeTwo}
      />
      {"    "}
      <Checkbox
        label=" Location"
        value={checkedLocation}
        onChange={handleChangeThree}
      />
      </div>
    </div>
      <div className="d-flex flex-wrap justify-content-evenly">
        {filter_els}
      </div>
      <div className="mb-5">
        <DataTable keys={visibleKeys} data={visibleData} />
      </div>
    </div>
  );
}

export default App;
