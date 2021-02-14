import React from "react";

// reactstrap components
// import {
//
// } from "reactstrap";

// Core Components
import Table1 from "components/tables/Table1.js";
import Table2 from "components/tables/Table2.js";
import Table3 from "components/tables/Table3.js";
import Table4 from "components/tables/Table4.js";
import Table5 from "components/tables/Table5.js";

function TablesSection() {
  return (
    <>
      <div className="cd-section" id="tables">
        <Table1 />
        <Table2 />
        <Table3 />
        <Table4 />
        <Table5 />
      </div>
    </>
  );
}

export default TablesSection;
