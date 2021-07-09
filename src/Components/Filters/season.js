import React, { useState, useRef, useEffect } from "react";
import Modal from "bootstrap/js/dist/modal";

const SeasonModal = () => {
  let [modal, setModal] = useState();
  let modalRef = useRef(null);

  useEffect(() => {
    setModal(new Modal(modalRef.current, {}));
  }, [modalRef]);

  const toggle = () => {
    modal && modal.toggle();
  };
  //const vline = "border-end vline";
  const vline = "";
  return (
    <div>
      <div ref={modalRef} class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Country Specific Season Information</h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                onClick={toggle}
              />
            </div>
            <div class="modal-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th
                      class="table-active text-center"
                      colspan="2"
                      scope="col"
                    >
                      Season 1
                    </th>
                    <th
                      class="table-active text-center"
                      colspan="2"
                      scope="col"
                    >
                      Season 2
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">Country</th>
                    <th scope="col">Name</th>
                    <th scope="col">Planting</th>
                    <th scope="col">Name</th>
                    <th scope="col">Planting</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Kenya</th>
                    <td>Long Rain</td>
                    <td className={vline}>March</td>
                    <td>Short Rain</td>
                    <td>September</td>
                  </tr>

                  <tr>
                    <th scope="row">Malawi</th>
                    <td>Winter</td>
                    <td className={vline}>June</td>
                    <td>Summer</td>
                    <td>November</td>
                  </tr>
                  <tr>
                    <th scope="row">Zimbabwe</th>
                    <td>Winter</td>
                    <td className={vline}>June</td>
                    <td>Summer</td>
                    <td>November</td>
                  </tr>
                  <tr>
                    <th scope="row">Uganda</th>
                    <td>A</td>
                    <td className={vline}>May</td>
                    <td>B</td>
                    <td>October</td>
                  </tr>
                  <tr>
                    <th scope="row">Rawanda</th>
                    <td>-</td>
                    <td className={vline}>March</td>
                    <td>-</td>
                    <td>October</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onClick={toggle}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-primary my-1" onClick={toggle}>
        {" "}
        View Season Information{" "}
      </button>
    </div>
  );
};

export { SeasonModal };
