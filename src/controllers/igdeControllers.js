const igdeModel = require('../models/igdeModels');
const jwt = require('jsonwebtoken');

const loginIgdes = async (request, response) => {
    require('dotenv').config();
    const login = await igdeModel.loginIgdes(request.body);

    if (login.length < 1) {
        return response.status(401).json({ 'message': 'Falha na autenticação' });
    }
    const token = jwt.sign({
        'usuario': login.name, 'email': login.email, 'id_usuario': login.id,


    },
        process.env.JWT_KEY,
        {
            expiresIn: '1h',
        })
    return response.status(200).json({ 'Message': 'Autenticação feita com sucesso', 'token': token });

}

const getAllIgdes = async (_request, response) => {
    const igdes = await igdeModel.getAllIgdes();
    return response.status(200).json(igdes);
};
const createIgde = async (request, response) => {
    const createdIgde = await igdeModel.createIgde(request.body);
    return response.status(201).json(createdIgde);
}

const deleteIgde = async (request, response) => {
    const { id } = request.params;
    await igdeModel.deleteIgde(id);
    return response.status(204).json();
}

const updateIgde = async (request, response) => {
    const { id } = request.params;
    await igdeModel.updateIgde(id, request.body);
    return response.status(204).json();
}
module.exports = { loginIgdes, getAllIgdes, createIgde, deleteIgde, updateIgde };