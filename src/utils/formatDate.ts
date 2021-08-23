function formatDate(data: Date) {
  let date = new Date(data);
  let day = date.getDate();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear();
  let formatted = `${day}/${month}/${year}`;
  return formatted;
}

export default formatDate;
