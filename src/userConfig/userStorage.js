const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const DATA_PATH = path.join(__dirname, '../../data/users.json');

async function getUsersByPage(page = 1, size = 10) {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        const allUsers = JSON.parse(data);

        // 转换roles为roleName字符串
        const processedUsers = allUsers.map(user => ({
            id: user.id,
            createTime: user.createTime,
            updateTime: user.updateTime,
            username: user.username,
            password: user.password,
            name: user.name,
            phone: null,
            roleName: user.roles.join(', ')
        })
        );

        const start = (page - 1) * size;
        const end = start + size;
        const records = processedUsers.slice(start, end);

        return {
            records,
            total: allUsers.length,
            size,
            current: page,
            pages: Math.ceil(allUsers.length / size),
            orders: [],
            optimizeCountSql: true,
            hitCount: false,
            countId: null,
            maxLimit: null,
            searchCount: true
        };
    } catch (error) {
        console.error('读取用户数据失败:', error);
        return {
            records: [],
            total: 0,
            size,
            current: page,
            pages: 0,
            orders: [],
            optimizeCountSql: true,
            hitCount: false,
            countId: null,
            maxLimit: null,
            searchCount: true
        };
    }
}

async function createUser(userData) {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        const users = JSON.parse(data);

        // 检查用户名是否已存在
        const exists = users.some(user => user.username === userData.username);
        if (exists) {
            return { success: false, message: '用户名已存在' };
        }

        userData.password = await bcrypt.hash(userData.password, 10);
        // 创建新用户
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString(),
            username: userData.username,
            password: userData.password,
            name: userData.name,
            phone: null,
            roles: [],
            avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.0zh4Xdq7QcSAvEclMibKPwAAAA?rs=1&pid=ImgDetMain',
            token: userData.username + ' Token',
            buttons: [],
            routes: []
        };
        users.push(newUser);
        await fs.writeFile(DATA_PATH, JSON.stringify(users, null, 2));

        return { success: true, message: '用户创建成功' };
    } catch (error) {
        console.error('创建用户失败:', error);
        return { success: false, message: '服务器错误' };
    }
}

async function updateUser(userData) {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        let users = JSON.parse(data);

        // 查找用户索引
        const userIndex = users.findIndex(u => u.id === userData.id);
        if (userIndex === -1) {
            return { success: false, message: '用户不存在' };
        }

        // 检查用户名冲突（排除自己）
        const usernameExists = users.some(u =>
            u.id !== userData.id && u.username === userData.username
        );
        if (usernameExists) {
            return { success: false, message: '用户名已存在' };
        }

        // 更新用户信息
        users[userIndex] = {
            ...users[userIndex],
            username: userData.username,
            name: userData.name,
            updateTime: new Date().toISOString()
        };

        await fs.writeFile(DATA_PATH, JSON.stringify(users, null, 2));
        return { success: true, message: '用户信息更新成功' };
    } catch (error) {
        console.error('更新用户失败:', error);
        return { success: false, message: '服务器错误' };
    }
}

async function deleteUser(userId) {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        let users = JSON.parse(data);
        const initialLength = users.length;

        users = users.filter(user => user.id !== parseInt(userId));

        if (users.length === initialLength) {
            return { success: false, message: '用户不存在' };
        }

        await fs.writeFile(DATA_PATH, JSON.stringify(users, null, 2));
        return { success: true, message: '用户删除成功' };
    } catch (error) {
        console.error('删除用户失败:', error);
        return { success: false, message: '服务器错误' };
    }
}

async function batchDeleteUsers(idList) {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        let users = JSON.parse(data);
        const initialLength = users.length;

        // 过滤掉要删除的用户
        users = users.filter(user => !idList.includes(user.id));

        if (users.length === initialLength) {
            return { success: false, message: '未找到匹配的用户' };
        }

        await fs.writeFile(DATA_PATH, JSON.stringify(users, null, 2));
        return {
            success: true,
            message: `成功删除 ${initialLength - users.length} 个用户`,
            deletedCount: initialLength - users.length
        };
    } catch (error) {
        console.error('批量删除用户失败:', error);
        return { success: false, message: '服务器错误' };
    }
}

async function searchUsersByUsername(username = '', page = 1, size = 10) {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        let users = JSON.parse(data);

        // 模糊搜索用户名
        if (username) {
            const searchTerm = username.toLowerCase();
            users = users.filter(user =>
                user.username.toLowerCase().includes(searchTerm)
            );
        }

        // 分页处理
        const start = (page - 1) * size;
        const end = start + size;
        const records = users.slice(start, end);

        return {
            records,
            total: users.length,
            size,
            current: page,
            pages: Math.ceil(users.length / size),
            orders: [],
            optimizeCountSql: true,
            hitCount: false,
            countId: null,
            maxLimit: null,
            searchCount: true
        };
    } catch (error) {
        console.error('搜索用户失败:', error);
        return {
            records: [],
            total: 0,
            size,
            current: page,
            pages: 0,
            orders: [],
            optimizeCountSql: true,
            hitCount: false,
            countId: null,
            maxLimit: null,
            searchCount: true
        };
    }
}

module.exports = {
    getUsersByPage,
    createUser,
    updateUser,
    deleteUser,
    batchDeleteUsers,
    searchUsersByUsername
};