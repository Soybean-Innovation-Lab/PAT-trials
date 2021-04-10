import { common_filter_classes } from "./common";

function timeFunc(key) {
  const cb = (row, struct) => {
    return struct;
  };
  return [() => [], cb];
}
function TimeFilter({ col }) {
  return (
    <div className={common_filter_classes}>
      <h5> TimeFilter for {col} </h5>
      <p className="fst-italic"> Coming soon </p>
    </div>
  );
}
export { timeFunc, TimeFilter };
