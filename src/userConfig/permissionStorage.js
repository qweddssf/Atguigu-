const fs = require('fs').promises;
const path = require('path');

const permission_path = path.join(__dirname, '../../data/permission.json');
const role_permission_path = path.join(__dirname, '../../data/role_permission.json');

async function getPermissionsByRoleId(roleId) {

    const permissions_data = await fs.readFile(permission_path, 'utf8');
    const permissions = JSON.parse(permissions_data)

    const rolepermissions_data = await fs.readFile(role_permission_path, 'utf8');
    const rolePermissions = JSON.parse(rolepermissions_data)
    // 获取该角色拥有的权限ID数组
    const rolePermissionIds = rolePermissions[roleId] || [];

    // 递归处理权限树
    function processPermissions(nodes) {
        return nodes.map(node => {
            // 检查当前权限ID是否在角色权限数组中
            const isSelected = rolePermissionIds.includes(parseInt(node.id));
            return {
                ...node,
                select: isSelected,
                children: node.children ? processPermissions(node.children) : []
            };
        });
    }

    return processPermissions(permissions);
}

async function updateRolePermissions(roleId, permissionIds) {
    try {
        const data = await fs.readFile(role_permission_path, 'utf8');
        const rolePermissions = JSON.parse(data);

        // 更新角色权限
        rolePermissions[roleId] = permissionIds.map(item => parseInt(item));

        await fs.writeFile(role_permission_path, JSON.stringify(rolePermissions, null, 2));
        return { success: true, message: '角色权限更新成功' };
    } catch (error) {
        console.error('更新角色权限失败:', error);
        return { success: false, message: '服务器错误' };
    }
}

// 更新导出
module.exports = {
    getPermissionsByRoleId,
    updateRolePermissions
};
