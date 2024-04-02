const jwt = require('jsonwebtoken');

const validateIgdeBody = (request, response, next) => {
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
    if (body.password == undefined) {
        return response.status(400).json({ message: 'The field "password" is required.' });
    }
    if (body.password == '') {
        return response.status(400).json({ message: 'The field "password" cannot be empty.' });
    }

    next();

};


const validateLoginBody = (request, response, next) => {
    const { body } = request;
    if (body.password == undefined) {
        return response.status(400).json({ message: 'The field "password" is required.' });
    }
    if (body.password == '') {
        return response.status(400).json({ message: 'The field "password" cannot be empty.' });
    }
    if (body.email == undefined) {
        return response.status(400).json({ message: 'The field "email" is required.' });
    }
    if (body.email == '') {
        return response.status(400).json({ message: 'The field "email" cannot be empty.' });
    }


    next();

};

const tokenValidation = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (error) {
        return response.status(401).json({ "message": 'Falha na authenticação' });
    }



};


module.exports = { validateIgdeBody, validateLoginBody, tokenValidation };