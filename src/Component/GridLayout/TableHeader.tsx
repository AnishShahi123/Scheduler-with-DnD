import { Th, Thead, Tr } from "@chakra-ui/react";
import { DateTime } from "luxon";

export default function TableHeader({
  currentWeekDates,
}: {
  currentWeekDates: DateTime[] | null;
}) {
  return (
    <Thead h={60}>
      <Tr>
        <Th></Th>
        {currentWeekDates?.map((dateObj) => {
          return (
            <Th
              w={"200px"}
              borderRight={"1px solid"}
              borderRightColor={"rgba(73, 73, 73, 0.61)"}
              color={"rgba(255, 255, 255, 0.5)"}
              fontSize={"15px"}
              fontWeight={"400"}
              lineHeight={"16px"}
            >
              {dateObj.toFormat("dd/MM")}
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
}
