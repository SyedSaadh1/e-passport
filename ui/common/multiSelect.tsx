import { MultiSelectItem, MultiSelect, Text } from "@tremor/react";
import React from "react";

function MultiSelectItems() {
  const statusTypes = [
    { id: "1", type: "ACTIVE" },
    { id: "2", type: "INACTIVE" },
    { id: "3", type: "DELETED" },
    { id: "3", type: "VERIFIED" },
    { id: "3", type: "REJECTED" },
  ]
  return <div>
    <p className="text-sm font-medium px-1 ">Status</p>
    <MultiSelect>
      {
        statusTypes?.map(({ id, type }) => <MultiSelectItem key={id} value={id}> {type} </MultiSelectItem>)
      }
    </MultiSelect>
  </div>;
}

export default MultiSelectItems;
