export type id = string | number;

export type data = {
  id: id;
  title: string;
  timestamp: string | number;
  containerId?: string;
};

export type convertedDataType = {
  ids: Array<string | number>;
  collection: {
    [id: string | number]: data;
  };
};

export type structuredDataType = {
  [key: string]: Array<id>;
};
