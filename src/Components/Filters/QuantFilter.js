import { common_filter_classes } from "./common";

function quantFunc(key) {
  const cb = (row, struct) => {
    return struct;
  };
  return [() => [], cb];
}
function QuantFilter({ col }) {
  return (
    <div className={common_filter_classes}>
      <h5> QuantFilter for {col} </h5>
      <p className="fst-italic"> Coming soon </p>
    </div>
  );
}
export { quantFunc, QuantFilter };
