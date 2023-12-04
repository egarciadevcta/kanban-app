export const bulletColors = (index) => {
  const color = ["#1574e3", "#ddc10b", "#089311"];
  if (color[index]) {
    return color[index];
  } else {
    let rand = Math.floor(Math.random() * 360);
    rand = rand + 1;
    const randomColor = `hsl(${rand}, 80%, 70%)`;
    return randomColor;
  }
};

export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};
