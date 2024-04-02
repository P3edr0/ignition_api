const connection = require('./connection');
const crypto = require('bcrypt');
const randomic = require('node:crypto');

const loginIgdes = async (login) => {

    const { email, password } = login;
    const [igde] = await connection.execute('SELECT * FROM igdes WHERE email = ?', [email]);
    if (igde.length < 1) {
        return [];
    }

    const isValidPassword = await crypto.compare(password, igde[0].password);

    if (isValidPassword) {
        return igde;
    } else {
        return [];
    }

};
const getAllIgdes = async () => {
    const [igdes] = await connection.execute('SELECT * FROM igdes');
    return igdes;
};

const createIgde = async (igde) => {
    const { name, email, password } = igde;
    const dateUTC = new Date(Date.now()).toUTCString();
    const randomSalt = randomic.randomInt(10, 16);
    const hashPassword = await crypto.hash(password, randomSalt);
    const query = 'INSERT INTO igdes(name,email,password,create_at) VALUES(?,?,?,?)';

    const [createdIGDE] = await connection.execute(query, [name, email, hashPassword, dateUTC]);
    return { insertId: createdIGDE.insertId };
}

const deleteIgde = async (id) => {
    const removedIGDE = await connection.execute('DELETE FROM igdes WHERE id = ?', [id]);

    return removedIGDE;
}
const updateIgde = async (id, igde) => {

    const { name, email, password, } = igde;
    const query = 'UPDATE igdes SET name=?, email=?, password=? WHERE id=?';
    const randomSalt = randomic.randomInt(10, 16);
    const hashPassword = await crypto.hash(password, randomSalt);
    const [updatedIGDE] = await connection.execute(query, [name, email, hashPassword, id]);

    return updatedIGDE;
}

module.exports = { loginIgdes, getAllIgdes, createIgde, deleteIgde, updateIgde };