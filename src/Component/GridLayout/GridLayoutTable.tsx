import React from "react";
import { convertedDataType, structuredDataType } from "../../utils/types";
import { Table } from "@chakra-ui/react";
import { DateTime } from "luxon";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export type GridLayoutTablePropType = {
  structuredData: structuredDataType | null;
  convertedData: convertedDataType | null;
  currentWeekDates: DateTime[] | null;
};

export default function GridLayoutTable(props: GridLayoutTablePropType) {
  const { convertedData, structuredData, currentWeekDates } = props;
  return (
    <div style={{ backgroundColor: "black" }}>
      <Table cellSpacing={0} w={"100%"}>
        <TableHeader currentWeekDates={currentWeekDates} />
        <TableBody {...{ convertedData, structuredData, currentWeekDates }} />
      </Table>
    </div>
  );
}
