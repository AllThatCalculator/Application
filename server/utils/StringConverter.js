module.exports = {
  DateTimeToString: (dateTime) => {
    return dateTime.toISOString().slice(0, 10).replace(/-/g, ".");
  },
};
