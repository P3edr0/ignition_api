const validateUserBody = (request, response, next) => {
    const { body } = request;
    if (body.name == undefined) {
        return response.status(400).json({ message: 'The field "name" is required.' });
    }
    if (body.name == '') {
        return response.status(400).json({ message: 'The field "name" cannot be empty.' });
    }
    if (body.email == undefined) {
        return response.status(400).json({ message: 'The field "email" is required.' });
    }
    if (body.email == '') {
        return response.status(400).json({ message: 'The field "email" cannot be empty.' });
    }
    if (body.status == undefined) {
        return response.status(400).json({ message: 'The field "status" is required.' });
    }
    if (body.status == '') {
        return response.status(400).json({ message: 'The field "status" cannot be empty.' });
    }
    if (body.tags == undefined) {
        return response.status(400).json({ message: 'The field "email" is required.' });
    }
    next();

};
module.exports = { validateUserBody };