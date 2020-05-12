exports.stringSanitize = (input) => {
	return input.replace(/[|&;$%@"<>()+,]/g, "");
};

exports.generateKey = () => {
	return String(1000000 + Math.floor(Math.random() * 9000000));
};
