const connection = require('./connection');
const getAll = async () => {
    const [users] = await connection.execute('SELECT * FROM users');
    return users;
};

const createUser = async (user) => {
    const { name, email, tags } = user;
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO users(name,email,status,tags,create_at) VALUES(?,?,?,?,?)';

    const [createdUser] = await connection.execute(query, [name, email, 'active', tags, dateUTC]);
    return { insertId: createdUser.insertId };
}

const deleteUser = async (id) => {
    const removedUser = await connection.execute('DELETE FROM users WHERE id = ?', [id]);

    return removedUser;
}
const updateUser = async (id, user) => {



    const { name, email, status, tags } = user;
    const query = 'UPDATE users SET name=?, email=?, status=?, tags=? WHERE id=?';

    const [updatedUser] = await connection.execute(query, [name, email, status, tags, id]);

    return updatedUser;
}

module.exports = { getAll, createUser, deleteUser, updateUser };