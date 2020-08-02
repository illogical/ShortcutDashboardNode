function logger(message) {
  const formattedMessage = new Date().toISOString() + " - " + message;
  console.log(formattedMessage);
}

module.exports = logger;
