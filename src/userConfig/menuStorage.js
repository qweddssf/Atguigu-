const fs = require('fs').promises;
const { log } = require('console');
const path = require('path');

const permission_path = path.join(__dirname, '../../data/permission2.json');
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
            const isSelected = rolePermissionIds.includes(node.id);

            return {
                ...node,
                select: isSelected,
                children: node.children ? processPermissions(node.children) : []
            };
        });
    }

    return processPermissions(permissions);
}

// 根据key value找到对应的节点
function findMenuByKey(menus, key, value) {
    for (const menu of menus) {
        if (menu[key] === value) return menu;
        if (menu.children) {
            const found = findMenuByKey(menu.children, key, value);
            if (found) return found;
        }
    }
    return null;
}

async function createSubmenu(code, level, name, pid) {


    const permissions_data = await fs.readFile(permission_path, 'utf8');
    const permissionData = JSON.parse(permissions_data)

    // 辅助函数：生成新的菜单ID
    function generateNewId(menus) {
        let maxId = 0;

        function traverse(menu) {
            if (menu.pid > maxId) {
                maxId = menu.pid;
            }
            if (menu.children) {
                menu.children.forEach(child => traverse(child));
            }
        }

        menus.forEach(menu => traverse(menu));
        return maxId * 1 + 1;
    }
    //  查找父菜单
    const menuNode = findMenuByKey(permissionData, 'pid', pid);
    if (!menuNode) {
        return { code: 404, message: '未找到指定的父菜单' };
    }
    // 4. 验证level是否正确 (子菜单的level应该是父菜单的level+1)
    // if (level !== menuNode.level + 1) {
    //     return {
    //         code: 400,
    //         message: `层级错误: 子菜单的level应该是${menuNode.level + 1}`
    //     };
    // }
    // 5. 创建新菜单项
    const newId = generateNewId(permissionData);
    const now = new Date().toISOString();
    const newMenu = {
        id: "" + newId,
        createTime: now,
        updateTime: now,
        pid: parseInt(newId),
        name: name,
        code: code || null,
        toCode: null,
        type: level === 3 ? 2 : 1, // 3级菜单是按钮(2)，其他是菜单(1)
        status: null,
        level: level,
        select: true,
        children: [] // 只有1、2级菜单可以有子菜单
    };
    // 6. 将新菜单添加到父菜单的children中
    if (!menuNode.children) {
        menuNode.children = [];
    }
    menuNode.children.push(newMenu);

    // 7. 更新父菜单的updateTime
    menuNode.updateTime = now;

    // 8. 保存更新后的数据
    // fs.writeFileSync(permission_path, JSON.stringify(permissionData, null, 2), 'utf-8');
    await fs.writeFile(permission_path, JSON.stringify(permissionData, null, 2));
    return { code: 200, message: '添加成功' }
}

async function updateSubmenu(code, level, name, id) {
    const permissions_data = await fs.readFile(permission_path, 'utf8');
    const permissionData = JSON.parse(permissions_data)

    //  查找节点
    const menuNode = findMenuByKey(permissionData, 'id', id);
    if (!menuNode) {
        return { code: 404, message: '未找到指定的菜单' };
    }

    const now = new Date().toISOString();

    menuNode.code = code;
    menuNode.name = name
    // 7. 更新父菜单的updateTime
    menuNode.updateTime = now;

    // 8. 保存更新后的数据
    // fs.writeFileSync(permission_path, JSON.stringify(permissionData, null, 2), 'utf-8');
    await fs.writeFile(permission_path, JSON.stringify(permissionData, null, 2));
    return { code: 200, message: '更新成功' }
}

async function deleteSubmenu(id) {
    const permissions_data = await fs.readFile(permission_path, 'utf8');
    let permissionData = JSON.parse(permissions_data)
    let flag = false
    //  查找节点
    function removeMenuById(menus, id) {
        // 遍历一级菜单
        for (let i = 0; i < menus.length; i++) {
            // 如果找到匹配的菜单
            if (menus[i].id == id) {
                // 删除该菜单并返回新数组
                return [...menus.slice(0, i), ...menus.slice(i + 1)];
            }

            // 如果有子菜单，递归查找
            if (menus[i].children) {
                const originalChildren = menus[i].children;
                const newChildren = removeMenuById(menus[i].children, id);

                // 如果子菜单有变化，说明找到了要删除的菜单
                if (newChildren !== originalChildren) {
                    // 创建新的菜单对象，避免直接修改原对象
                    const updatedMenu = {
                        ...menus[i],
                        children: newChildren,
                        updateTime: new Date().toISOString() // 更新修改时间
                    };

                    // 返回更新后的菜单数组
                    return [
                        ...menus.slice(0, i),
                        updatedMenu,
                        ...menus.slice(i + 1)
                    ];
                }
            }
        }
        // 没有找到要删除的菜单，返回原数组
        return menus;
    }

    const updatedData = removeMenuById(permissionData, id);

    if (updatedData !== permissionData) {
        flag = true;
        permissionData = updatedData;
    }
    if (!flag) return { code: 400, message: '未找到指定id' }
    // 8. 保存更新后的数据
    await fs.writeFile(permission_path, JSON.stringify(permissionData, null, 2));
    return { code: 200, message: '删除成功' }
}

module.exports = {
    getPermissionsByRoleId,
    createSubmenu,
    updateSubmenu,
    deleteSubmenu
};
