import React from "react";
import { data } from "../../utils/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardBody } from "@chakra-ui/card";
import { Icon } from "@chakra-ui/icon";
import { RxDragHandleDots2 } from "react-icons/rx";
import { Text } from "@chakra-ui/layout";

export default function EventCard({ todaysEvent }: { todaysEvent: data }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todaysEvent?.id,
    data: {
      type: "data",
      todaysEvent,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      style={{ ...style, height: "50px", opacity: isDragging ? 0.5 : 1 }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {/* <p>{todaysEvent.title}</p> */}
      <Card
        borderRadius={20}
        height={"30px"}
        width={"154px"}
        display={"flex"}
        textAlign={"center"}
        justifyContent={"center"}
        bgColor={"rgba(126, 136, 146, 1)"}
        margin={"5px"}
        overflow={"hidden"}
        userSelect={"none"}
      >
        <CardBody display={"flex"} alignItems={"center"}>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              width: "25px",
            }}
          >
            <Icon as={RxDragHandleDots2} h={"30px"} />
          </div>
          <Text
            fontSize="12px"
            fontWeight={"500px"}
            lineHeight={"12px"}
            marginLeft={"3px"}
            color={"white"}
          >
            {todaysEvent?.title?.slice(0, 20)}
          </Text>
        </CardBody>
      </Card>
    </div>
  );
}
