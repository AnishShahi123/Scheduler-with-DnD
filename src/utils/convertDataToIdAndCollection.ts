import { DateTime } from "luxon";
import { data } from "./types";

export async function convertDataToIdsAndCollection(
  dataToConvert: Array<data>
) {
  const ids: Array<string | number> = [];
  const collection: { [id: string | number]: data } = {};
  dataToConvert.forEach((data) => {
    ids.push(data.id);
    const currentDataDateTime = DateTime.fromSeconds(+data.timestamp);
    const curretDataDay = currentDataDateTime.day;
    const currentHour = currentDataDateTime.hour;
    const containerId = `${curretDataDay}-${currentHour}`;
    const newData = { ...data, containerId };
    collection[data.id] = newData;
  });
  return { ids, collection };
}
