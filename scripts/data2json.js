#!/bin/env node
/*
  Very basic utility to transform data from a tsv with (at least) columns
  "Bundle" and "Location" to a json object with first key being the location and
  second key being bundle and the rest of the data after that
*/

let proc = require("process");
let fs = require("fs");
let Papa = require("papaparse");
const assert = require("assert");

if (proc.argv.length != 4) {
    console.error(`USAGE: ${proc.argv[0]} ${proc.argv[1]} MAIN_DATA_FILE AVG_DATA_FILE`);
    proc.exit(1);
}

let data = Papa.parse(fs.createReadStream(proc.argv[2]), {
    delimiter: ",",
    header: true,
    dynamicTyping: true,
    error: function(err, file, inputElem, reason)
    {
	console.error(err);
    },
    complete: function(results) {
	if (results.errors.length != 0) {
	    for (let err of results.errors) {
		console.error(err);
	    }
	}
	let keys = {};
	for (let key of Object.keys(results.data[0])) {
	    const split = key.split(";");
	    if (split.length == 1) {
		keys[key] = {
		    "display": false,
		    "filterType": "",
		    "raw": key,
		};
	    } else {
		let flags = new Set(split[1].trim());
		let d = flags.delete("D");
		assert(flags.size < 2, `Flags (${[...flags.values()].join(",")}) should only be of length 2 or less`);
		let f = [...flags.values()].join("");
		keys[split[0]] = {
		    "display": d,
		    "filterType": f,
		    "raw": key,
		};
	    }
	}
	let data = [];
	const keyslist = Object.keys(keys);
	for (let i = 0; i < results.data.length; i++) {
	    let row = {};
	    for (let j = 0; j < keyslist.length; j++) {
		const raw = keys[keyslist[j]].raw;
		const clean = keyslist[j];
		let cell = results.data[i][raw];
		if (typeof cell === "string") {
		    cell = cell.trim();
		    switch(cell) {
		    case ".":
			cell = "";
			break;
		    default:
			break;
		    }
		} else if (cell === null) {
		    cell = "";
		}
		row[clean] = cell;
	    }
	    data.push(row);
	}
	Papa.parse(fs.createReadStream(proc.argv[3]), {
	    delimiter: ",",
	    header: true,
	    dynamicTyping: true,
	    error: function(err, file, inputElem, reason)
	    {
		console.error(err);
	    },
	    complete: function(results) {
		if (results.errors.length != 0) {
		    for (let err of results.errors) {
			console.error(err);
		    }
		}
		for (let row of results.data) {
		    let comb_row = {};
		    for (let key of Object.keys(keys)) {
			if (row[key]) {
			    comb_row[key] = row[key]
			}
		    }
		    comb_row["Location"] = "average across country";
		    data.push(comb_row);
		}
		console.log(JSON.stringify({
		    "keys": keys,
		    "data": data
		}));
	    }
	});
    }
});
