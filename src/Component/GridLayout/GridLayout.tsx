import React from "react";
import MOCK_DATA from "../../MockData/MOCK_DATA.json";
import {
  convertedDataType,
  data,
  id,
  structuredDataType,
} from "../../utils/types";
import { convertDataToIdsAndCollection } from "../../utils/convertDataToIdAndCollection";
import { getStructuredData } from "../../utils/getStructuredData";
import GridLayoutTable from "./GridLayoutTable";
import { getWeekDates } from "../../utils/getWeekDates";
import { DateTime } from "luxon";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import EventCard from "./EventCard";
import { arrayMove } from "@dnd-kit/sortable";

export default function GridLayoutContainer({
  currentDesriedWeek,
}: {
  currentDesriedWeek: number;
}) {
  const [convertedData, setConvertedData] =
    React.useState<null | convertedDataType>(null);

  const [structuredData, setStructuredData] =
    React.useState<null | structuredDataType>(null);

  const [currentWeekDates, setCurrentWeekDates] = React.useState<
    DateTime[] | null
  >(null);

  React.useEffect(() => {
    async function initialMethods() {
      const { collection, ids } = await convertDataToIdsAndCollection(
        MOCK_DATA
      );
      setConvertedData({ ids, collection });

      const response = await getStructuredData({ ids, collection });
      setStructuredData(response);

      const dates = await getWeekDates(currentDesriedWeek);
      setCurrentWeekDates(dates);
    }
    initialMethods();
  }, [currentDesriedWeek]);

  React.useEffect(() => {
    async function initialMethods() {
      if (!convertedData) return;
      const response = await getStructuredData(convertedData);
      setStructuredData(response);
    }
    initialMethods();
  }, [convertedData]);

  // drag handlers
  const [activeTask, setActiveTask] = React.useState<null | id>(null);

  return (
    <>
      <DndContext
        onDragStart={dragStartHandler}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <GridLayoutTable
          {...{ convertedData, structuredData, currentWeekDates }}
        />
        {convertedData && activeTask && (
          <DragOverlay>
            <EventCard todaysEvent={convertedData.collection[activeTask]} />
          </DragOverlay>
        )}
      </DndContext>
    </>
  );

  function dragStartHandler(event: DragStartEvent) {
    const activeTaskId = event.active.id;
    setActiveTask(activeTaskId);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || !structuredData) return;

    const activeItemContainerId = active.data.current?.sortable?.containerId;

    const activeContainerItems = structuredData[activeItemContainerId];
    const activeContainerEventIndex = activeContainerItems.indexOf(active.id);
    const overEventIndex = activeContainerItems.indexOf(over?.id);

    setStructuredData((oldData) => {
      if (oldData) {
        const newEventsCollection = arrayMove(
          oldData[activeItemContainerId],
          activeContainerEventIndex,
          overEventIndex
        );
        oldData[activeItemContainerId] = newEventsCollection;
        return oldData;
      } else return oldData;
    });

    setActiveTask(null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over || !structuredData || !convertedData || !active) return;

    const isOverTask = over.data.current?.type === "data";

    if (isOverTask) {
      setConvertedData((oldData) => {
        if (!oldData) return oldData;
        const newData: data = {
          id: active.id,
          title: active.data.current?.todaysEvent.title,
          timestamp: over.data.current?.todaysEvent.timestamp,
          containerId: over.data.current?.todaysEvent.containerId,
        };
        return {
          ids: oldData?.ids,
          collection: {
            ...oldData.collection,
            [active.id]: newData,
          },
        };
      });
    }
    const isOverContainer = over.data.current?.type === "container";

    if (isOverContainer) {
      setConvertedData((oldData) => {
        if (!oldData) return oldData;
        const newData: data = {
          id: active.id,
          title: active.data.current?.todaysEvent.title,
          timestamp: over.data.current?.containerTimestamp,
          containerId: over.id.toString(),
        };
        return {
          ids: oldData?.ids,
          collection: {
            ...oldData.collection,
            [active.id]: newData,
          },
        };
      });
    }
  }
}
