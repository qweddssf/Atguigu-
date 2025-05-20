const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
//  获取用户信息的  json文件
const DATA_PATH = path.join(__dirname, '../data/users.json');

// 初始化数据文件
async function init() {
    try {
        await fs.access(DATA_PATH);
    } catch (error) {
        await fs.writeFile(DATA_PATH, JSON.stringify({ users: [] }));
    }
}

// 获取所有用户
async function getAllUsers() {
    await init();
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data);
}

// 通过用户名  获取单个用户
async function getUser(key, value) {
    const users = await getAllUsers();
    // return users.find(user => user.username === username);
    return users.find(user => user[key] === value);
}

// 创建用户
async function createUser(userObj) {
    const users = await getAllUsers();
    users.push(userObj);
    await fs.writeFile(DATA_PATH, JSON.stringify({ users }, null, 2));
}



module.exports = {
    getUser,
    createUser,
    getAllUsers,

};