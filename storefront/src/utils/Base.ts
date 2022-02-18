const findItemArr = async (
  arr: any[],
  key: string,
  values: string | number
) => {
  let item = await arr.find((x) => x[key] == values);
  if (item) return item;
  return null;
};

const findIndexArr = async (
  arr: any[],
  key: string,
  values: string | number
) => {
  let item = await arr.findIndex((x) => x[key] == values);
  if (item < 0) return null;
  return item;
};

const deleteItemArr = async (
  arr: any[],
  index: number,
  totalDelete: number
) => {
  if (index > arr.length - 1 || totalDelete > arr.length) return arr;
  return await arr.splice(index, totalDelete);
};

// LocalStorage
const GetItemStorage = async (name: string, select?: string) => {
  let data = await localStorage.getItem(name);
  data = data ? JSON.parse(data) : null;
  if (select && data) {
    data = JSON.parse(data[select]);
  }
  return data;
};

const isEmptyObject = (obj: object) => {
  if (obj && Object.keys(obj).length > 0 && obj.constructor === Object) {
    return true;
  }
  return false;
};

export default {
  findItemArr,
  findIndexArr,
  deleteItemArr,
  GetItemStorage,
  isEmptyObject,
};
