import React from "react";
import { convertedDataType, structuredDataType } from "../../utils/types";
import { DateTime } from "luxon";
import { Tbody, Td, Tr } from "@chakra-ui/react";
import { SortableContext } from "@dnd-kit/sortable";
import EventCardsContainer from "./EventCardsContainer";

export type TableBodyPropType = {
  structuredData: structuredDataType | null;
  convertedData: convertedDataType | null;
  currentWeekDates: DateTime[] | null;
};

export default function TableBody(props: TableBodyPropType) {
  const { convertedData, structuredData, currentWeekDates } = props;

  if (!structuredData || !convertedData) return <></>;

  return (
    <Tbody>
      {Array.from({ length: 5 })
        .fill(0)
        .map((currNum, index) => {
          return (
            <Tr>
              <Td color={"rgba(255, 255, 255, 0.5)"} w={100}>
                {`${index}`.padStart(2, "0").padEnd(5, ":00")}
              </Td>
              {currentWeekDates?.map((currenDate) => {
                const currentDay = currenDate.day;
                const todaysEventsIds =
                  structuredData[`${currentDay}-${index}`];
                const contextId = `${currentDay}-${index}`;
                return (
                  <SortableContext items={todaysEventsIds || []} id={contextId}>
                    <EventCardsContainer
                      {...{
                        todaysEventsIds,
                        convertedData,
                        contextId,
                        structuredData,
                        currenDate,
                      }}
                    />
                  </SortableContext>
                );
              })}
            </Tr>
          );
        })}
    </Tbody>
  );
}
