const fileName = "app-data";

export const saveInLocalStorage = (data) => {
  localStorage.setItem(fileName, JSON.stringify(data));
};
export const getDataFromLocalStorage = () => {
  return localStorage.getItem(fileName);
};

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
