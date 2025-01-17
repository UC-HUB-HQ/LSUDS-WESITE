export const textReducer = (text, length) => {
  const text_list = text.split(" ");
  if (text_list.length > length) {
    return text_list.splice(0, length).join(" ") + "...";
  }
  return text;
};
