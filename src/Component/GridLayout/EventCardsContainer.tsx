import React from "react";
import {
  convertedDataType,
  data,
  id,
  structuredDataType,
} from "../../utils/types";
import { Td } from "@chakra-ui/table";
import EventCard from "./EventCard";
import { useDroppable } from "@dnd-kit/core";
import { DateTime } from "luxon";

type EventCardsContainerProps = {
  todaysEventsIds: id[];
  convertedData: convertedDataType;
  contextId: string;
  structuredData: structuredDataType;
  currenDate: DateTime;
};

export default function EventCardsContainer(props: EventCardsContainerProps) {
  const {
    convertedData,
    todaysEventsIds,
    contextId,
    structuredData,
    currenDate,
  } = props;

  const { setNodeRef } = useDroppable({
    id: contextId,
    data: {
      type: "container",
      containerData: structuredData[contextId],
      containerTimestamp: currenDate.toSeconds(),
    },
  });

  return (
    <Td
      bgColor={"#494949"}
      border={"1px solid rgba(255, 255, 255, 0.5)"}
      height={"40px"}
      ref={setNodeRef}
    >
      {todaysEventsIds?.map((eventId) => {
        const todaysEvent = convertedData.collection[eventId];
        return <EventCard todaysEvent={todaysEvent} />;
      })}
    </Td>
  );
}
