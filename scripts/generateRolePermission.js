const fs = require('fs');

// 读取职位数据
const roles = require('../src/userConfig/all_roles.json'); // 请确保文件路径正确
// 读取权限数据
const permissions = require('../data/permission.json'); // 之前生成的权限文件

// 获取所有权限ID的扁平化数组
function getAllPermissionIds(permissions) {
    const ids = [];

    function traverse(nodes) {
        if (!nodes) return;

        for (const node of nodes) {
            ids.push(node.id);
            if (node.children) {
                traverse(node.children);
            }
        }
    }

    traverse(permissions);
    return ids;
}

// 获取所有权限ID
const allPermissionIds = getAllPermissionIds(permissions);

// 为每个角色生成随机权限
function generateRolePermissions() {
    const rolePermissions = {};

    roles.forEach(role => {
        // 超级管理员拥有所有权限
        if (role.id === 0) {
            rolePermissions[role.id] = allPermissionIds;
            return;
        }

        // 其他角色随机分配部分权限
        const count = Math.floor(Math.random() * 10) + 5; // 5-15个随机权限
        const shuffled = [...allPermissionIds].sort(() => 0.5 - Math.random());
        rolePermissions[role.id] = shuffled.slice(0, count).sort((a, b) => a - b);
    });

    return rolePermissions;
}

// 生成权限分配数据
const rolePermissionData = generateRolePermissions();

// 转换为需要的数组格式
const result = {};
for (const [roleId, permissionIds] of Object.entries(rolePermissionData)) {
    result[roleId] = permissionIds;
}

// 写入文件
fs.writeFileSync('role_permission.json', JSON.stringify(result, null, 2), 'utf-8');

console.log('role_permission.json 文件已生成');