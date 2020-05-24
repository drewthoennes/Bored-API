const expressMiddleware = require('./express');

exports.validate = (schema) => {
    return (req, res, next) => {
        let err = schema.validate(req.body).error;
        if (err != null) {
            res.error(`Invalid fields: ${err}`);
            return;
        }

        next();
   };
}

exports.express = function(router) {
	// Add res.error method for error reporting
	router.use((req, res, next) => {
		res.error = function(err) {
			res.json({'error': err});
		};

		next();
	});
}
