exports.validate = (schema) => {
    return (req, res, next) => {
        let err = schema.validate(req.body).error;
        if (err != null) {
            res.send({'error': 'Invalid fields: ' + err});
            return;
        }

        next();
   };
}
