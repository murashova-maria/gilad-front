export const selectCheckbox = (id: number, list: number[]): number[] => {
  if (list.includes(id)) {
    const index = list.indexOf(id);
    let newItems = [...list];
    newItems.splice(index, 1);
    return newItems;
  }
  return [...list, id];
};
