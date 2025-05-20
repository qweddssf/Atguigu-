const permissionStorage = require('./permissionStorage');

async function getRolePerm(req, res) {
    try {
        const roleId = parseInt(req.params.roleId);

        if (isNaN(roleId)) {
            return res.status(400).json({ error: 'Invalid role ID' });
        }

        const result = await permissionStorage.getPermissionsByRoleId(roleId)
        res.json({
            code: 200,
            message: '获取成功',
            ok: true,
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateRolePermissions(req, res) {
    try {
        let { roleId, permissionIds } = req.query;

        permissionIds = permissionIds.split(',')

        // 参数验证
        if (!roleId || isNaN(parseInt(roleId))) {
            return res.status(400).json({
                code: 400,
                message: '必须提供有效的角色ID',
                ok: false
            });
        }

        if (!Array.isArray(permissionIds)) {
            return res.status(400).json({
                code: 400,
                message: '必须提供有效的权限ID数组',
                ok: false
            });
        }

        const result = await permissionStorage.updateRolePermissions(roleId, permissionIds);

        if (!result.success) {
            return res.status(500).json({
                code: 500,
                message: result.message,
                ok: false,
                data: null
            });
        }

        res.json({
            code: 200,
            message: result.message,
            data: null,
            ok: true
        });
    } catch (error) {
        console.error('更新角色权限失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}
module.exports = {
    getRolePerm,
    updateRolePermissions
};