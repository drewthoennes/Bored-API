function stringSanitize(input) {
  return input.replace(/[|&;$%@"<>()+,]/g, "");
}

function generateKey() {
  return String(1000000 + Math.floor(Math.random() * 9000000));
}

module.exports = {
  stringSanitize: stringSanitize,
  generateKey: generateKey
}
