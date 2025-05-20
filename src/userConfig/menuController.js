const menuStorage = require('./menuStorage');
async function getPermission(req, res) {
    try {
        const result = await menuStorage.getPermissionsByRoleId(-1)
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

async function createSubMenu(req, res) {
    try {
        // 1. 验证请求数据
        const { code, level, name, pid } = req.body;

        if (!name || pid === undefined || level === undefined) {
            return res.status(400).json({ code: 400, message: '缺少必要参数: name, pid 或 level' });
        }

        const result = await menuStorage.createSubmenu(code, level, name, pid)

        // 9. 返回成功响应
        res.json({
            ...result,
            data: null,
            ok: true
        });

    } catch (error) {
        console.error('添加子菜单出错:', error);
        res.status(500).json({ code: 500, message: '服务器内部错误' });
    }
}

async function updateSubMenu(req, res) {
    try {
        // 1. 验证请求数据
        const { code, level, name, id } = req.body;
        if (!name || !id || level === undefined) {
            return res.status(400).json({ code: 400, message: '缺少必要参数: name, id 或 level' });
        }
        const result = await menuStorage.updateSubmenu(code, level, name, id)

        // 9. 返回成功响应
        res.json({
            ...result,
            data: null,
            ok: true
        });

    } catch (error) {
        console.error('更新菜单出错:', error);
        res.status(500).json({ code: 500, message: '服务器内部错误' });
    }
}

async function deleteSubMenu(req, res) {
    try {
        // 1. 验证请求数据
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ code: 400, message: '缺少必要参数 :id' });
        }
        const result = await menuStorage.deleteSubmenu(id)

        // 9. 返回成功响应
        res.json({
            ...result,
            data: null,
            ok: true
        });

    } catch (error) {
        console.error('删除菜单出错:', error);
        res.status(500).json({ code: 500, message: '服务器内部错误' });
    }
}
module.exports = {
    getPermission,
    createSubMenu,
    updateSubMenu,
    deleteSubMenu
}