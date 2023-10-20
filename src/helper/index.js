function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return inputDate.toLocaleString("en-US", options);
}

const shortDate = (date) => {
  const inputDate = new Date(date);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
};

const fullDate = (inputDate) => {
  const date = new Date(inputDate);

  const options = {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

const formatBalance = (amount) => {
  const res = amount.toLocaleString("en-US", {
    currency: "NGN", // Change the currency as needed
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `₦${res}`;
};

export { formatDate, shortDate, formatBalance, fullDate };
