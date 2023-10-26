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

// Function to retrieve the user data from local storage
const getUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    if (serializedUser === null) {
      return null; // Return null if the user data is not found in local storage
    }
    return JSON.parse(serializedUser);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};

// Function to store the user data in local storage
const setUserToStorage = (user) => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem("user", serializedUser);
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

const saveTokensToStorage = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

export {
  formatDate,
  shortDate,
  formatBalance,
  fullDate,
  getUserFromStorage,
  setUserToStorage,
  saveTokensToStorage,
  removeTokens,
};
