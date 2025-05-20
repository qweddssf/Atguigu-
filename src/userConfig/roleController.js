const roleStorage = require('./roleStorage');

async function getRolesList(req, res) {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                code: 400,
                message: '必须提供有效的用户ID',
                ok: false
            });
        }

        const rolesData = await roleStorage.getUserRoles(id);

        if (!rolesData) {
            return res.status(404).json({
                code: 404,
                message: '用户不存在',
                ok: false
            });
        }

        res.json({
            code: 200,
            message: '成功',
            data: rolesData,
            ok: true
        });
    } catch (error) {
        console.error('获取角色列表失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function assignRoles(req, res) {
    try {
        const { roleIdList, userId } = req.body || {};
        // 参数验证
        if (!userId || !roleIdList || !Array.isArray(roleIdList)) {
            return res.status(400).json({
                code: 400,
                message: '必须提供有效的用户ID和角色ID列表',
                ok: false
            });
        }

        const result = await roleStorage.assignRolesToUser(userId, roleIdList);
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
        console.error('分配角色失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function getAllRoles(req, res) {
    try {
        const { page, size } = req.params;
        const { roleName = '' } = req.query;
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

        const result = await roleStorage.getAllRoles(pageNum, pageSize, roleName);

        res.json({
            code: 200,
            message: "成功",
            data: result,
            ok: true
        });
    } catch (error) {
        console.error('获取角色列表失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function createRole(req, res) {
    try {
        const { roleName } = req.body;

        if (!roleName) {
            return res.status(400).json({
                code: 400,
                message: '必须提供角色名称',
                ok: false
            });
        }

        const result = await roleStorage.createRole({ roleName });

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
        console.error('创建角色失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function updateRole(req, res) {
    try {
        const { id, roleName } = req.body;

        if (!id || !roleName) {
            return res.status(400).json({
                code: 400,
                message: '必须提供角色ID和角色名称',
                ok: false
            });
        }

        const result = await roleStorage.updateRole({ id, roleName });

        if (!result.success) {
            const statusCode = result.message === '角色不存在' ? 404 : 400;
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
        console.error('更新角色失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function deleteRole(req, res) {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                code: 400,
                message: '必须提供有效的角色ID',
                ok: false
            });
        }

        const result = await roleStorage.deleteRole(id);

        if (!result.success) {
            const statusCode = result.message === '角色不存在' ? 404 : 500;
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
        console.error('删除角色失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}


module.exports = {
    getRolesList,
    assignRoles,
    getAllRoles,
    createRole,
    updateRole,
    deleteRole
};