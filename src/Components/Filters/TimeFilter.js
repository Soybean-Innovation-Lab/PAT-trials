import { common_filter_classes } from "./common";

function timeFunc(key) {
  const cb = (row, struct, accepted, responsible) => {
    return struct;
  };
  return [() => [], cb];
}
function TimeFilter({ col }) {
  return (
    <div className={`${common_filter_classes} d-none`}>
      <h5> TimeFilter for {col} </h5>
      <p className="fst-italic"> Coming soon </p>
    </div>
  );
}
export { timeFunc, TimeFilter };
