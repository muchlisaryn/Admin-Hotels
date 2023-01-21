export const convertDate = (input) => {
  const pad = (s) => {
    return s < 10 ? "0" + s : s;
  };
  var d = new Date(input);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
};
