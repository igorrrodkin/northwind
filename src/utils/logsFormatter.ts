export const sqlSyntaxUpperCase = (logs: string) => {
  const logsArr = logs.split(" ");
  const formattedLogs = logsArr
    .map((item) => {
      if (
        item == "select" ||
        item == "from" ||
        item == "left" ||
        item == "join" ||
        item == "on" ||
        item == "where"
      ) {
        item = item.toUpperCase();
      }
      return item;
    })
    .join(" ");
  return formattedLogs;
};
