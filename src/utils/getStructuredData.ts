import { convertedDataType, structuredDataType } from "./types";

export async function getStructuredData(convertedData: convertedDataType) {
  const { ids, collection } = convertedData;

  const structuredData: structuredDataType = {};

  ids.forEach((id) => {
    const currentData = collection[id];
    const containerId = currentData.containerId;
    if (!containerId) return;
    if (!structuredData[containerId]) {
      structuredData[containerId] = [id];
    } else {
      structuredData[containerId].push(id);
    }
  });
  console.log(structuredData);
  return structuredData;
}
