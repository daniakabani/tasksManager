exports.errorHandler = ({ message, status, reason }) => {
  return {
    data: {
      error: "Your request can not be processed",
      status,
      reason,
      message,
    },
  };
};
