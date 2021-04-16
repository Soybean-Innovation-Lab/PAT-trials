import { common_filter_classes } from "./common";

function quantFunc(key) {
  const cb = (row, struct, accepted, responsible) => {
    return struct;
  };
  return [() => [], cb];
}
function QuantFilter({ col }) {
  return (
    <div className={`${common_filter_classes} d-none`}>
      <h5> QuantFilter for {col} </h5>
      <p className="fst-italic"> Coming soon </p>
    </div>
  );
}
export { quantFunc, QuantFilter };
