export const addYearsToDate = (dateString: string, yearsToAdd: number) => {
  const dateArray = dateString.split("-");
  const year = dateArray[0];
  const validYear = JSON.stringify(parseInt(year) + yearsToAdd);
  dateArray[0] = validYear;
  return dateArray.join("-");
};

export const validDateByConvertingToDate = (
  dateString: string,
  yearsToAdd: number
) => {
  const dateFormat = new Date(dateString);
  const validMonth = `${dateFormat.getMonth() + 1}`.padStart(2, "0");
  const validYear = `${dateFormat.getFullYear() + yearsToAdd}`;
  const validDay = `${dateFormat.getDate()}`.padStart(2, "0");
  return `${validYear}-${validMonth}-${validDay}`;
};
