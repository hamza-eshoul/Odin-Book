import { format } from "date-fns";

const formatDate = (date) => {
  const formattedDate = format(new Date(date), "PPP");
  return formattedDate;
};

export default formatDate;
