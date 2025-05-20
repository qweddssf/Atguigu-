const userStorage = require('./userStorage');

async function getUserInfo(req, res) {
    try {
        const page = parseInt(req.params.page) || 1;
        const size = parseInt(req.params.size) || 10;

        // 参数验证
        if (isNaN(page) || isNaN(size) || page < 1 || size < 1) {
            return res.status(400).json({
                code: 400,
                message: '分页参数无效',
                ok: false
            });
        }

        const userData = await userStorage.getUsersByPage(page, size);

        res.json({
            code: 200,
            message: "成功",
            data: userData,
            ok: true
        });
    } catch (error) {
        console.error('获取用户信息失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function createUser(req, res) {
    try {
        const { username, name, password } = req.body;

        // 参数验证
        if (!username || !name || !password) {
            return res.status(400).json({
                code: 400,
                message: '必须提供用户名、姓名和密码',
                ok: false
            });
        }

        const result = await userStorage.createUser({ username, name, password });

        if (!result.success) {
            return res.status(400).json({
                code: 400,
                message: result.message,
                ok: false
            });
        }

        res.json({
            code: 200,
            message: result.message,
            data: null,
            ok: true
        });
    } catch (error) {
        console.error('创建用户失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function updateUser(req, res) {
    try {
        const { id, username, name } = req.body;

        // 参数验证
        if (!id || !username || !name) {
            return res.status(400).json({
                code: 400,
                message: '必须提供用户ID、用户名和姓名',
                ok: false
            });
        }

        const result = await userStorage.updateUser({ id, username, name });

        if (!result.success) {
            const statusCode = result.message === '用户不存在' ? 404 : 400;
            return res.status(statusCode).json({
                code: statusCode,
                message: result.message,
                ok: false
            });
        }

        res.json({
            code: 200,
            message: result.message,
            data: null,
            ok: true
        });
    } catch (error) {
        console.error('更新用户失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function deleteUser(req, res) {
    try {
        const { userId } = req.params;

        if (!userId || isNaN(parseInt(userId))) {
            return res.status(400).json({
                code: 400,
                message: '必须提供有效的用户ID',
                ok: false
            });
        }

        const result = await userStorage.deleteUser(userId);

        if (!result.success) {
            const statusCode = result.message === '用户不存在' ? 404 : 500;
            return res.status(statusCode).json({
                code: statusCode,
                message: result.message,
                ok: false
            });
        }

        res.json({
            code: 200,
            message: result.message,
            data: null,
            ok: true
        });
    } catch (error) {
        console.error('删除用户失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function batchDeleteUsers(req, res) {
    try {
        const idList = req.body || [];
        if (!idList || !Array.isArray(idList) || idList.length === 0) {
            return res.status(400).json({
                code: 400,
                message: '必须提供有效的用户ID列表',
                ok: false
            });
        }

        // 验证所有ID都是数字
        if (idList.some(id => isNaN(parseInt(id)))) {
            return res.status(400).json({
                code: 400,
                message: 'ID列表包含无效的用户ID',
                ok: false
            });
        }

        const result = await userStorage.batchDeleteUsers(idList);

        if (!result.success) {
            return res.status(404).json({
                code: 404,
                message: result.message,
                ok: false
            });
        }

        res.json({
            code: 200,
            message: result.message,
            data: null,
            ok: true
        });
    } catch (error) {
        console.error('批量删除用户失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function searchUserInfo(req, res) {
    try {
        const { page, size } = req.params;
        const { username = '' } = req.query;

        // 参数验证
        const pageNum = parseInt(page) || 1;
        const pageSize = parseInt(size) || 10;

        if (isNaN(pageNum) || isNaN(pageSize) || pageNum < 1 || pageSize < 1) {
            return res.status(400).json({
                code: 400,
                message: '分页参数无效',
                ok: false
            });
        }

        const result = await userStorage.searchUsersByUsername(username, pageNum, pageSize);

        res.json({
            code: 200,
            message: "搜索成功",
            data: result,
            ok: true
        });
    } catch (error) {
        console.error('搜索用户失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}


module.exports = {
    getUserInfo,
    createUser,
    updateUser,
    deleteUser,
    batchDeleteUsers,
    searchUserInfo
};