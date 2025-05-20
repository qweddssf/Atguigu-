const fs = require('fs').promises;
const path = require('path');

const USER_PATH = path.join(__dirname, '../../data/users.json');
const roles_path = path.join(__dirname, './all_roles.json')


async function getUserRoles(userId) {
    try {
        let ALL_ROLES = await fs.readFile(roles_path, 'utf8');
        ALL_ROLES = JSON.parse(ALL_ROLES)
        const data = await fs.readFile(USER_PATH, 'utf8');
        const users = JSON.parse(data);
        const user = users.find(u => u.id === parseInt(userId));

        if (!user) {
            return null;
        }

        // 获取用户已有角色
        const assignRoles = ALL_ROLES.filter(role =>
            user.roles.includes(role.roleName)
        );

        return {
            assignRoles,
            allRolesList: ALL_ROLES
        };
    } catch (error) {
        console.error('读取用户角色失败:', error);
        return null;
    }
}

async function assignRolesToUser(userId, roleIdList) {
    try {
        const data = await fs.readFile(USER_PATH, 'utf8');
        const users = JSON.parse(data);
        const userIndex = users.findIndex(u => u.id === parseInt(userId));

        if (userIndex === -1) {
            return { success: false, message: '用户不存在' };
        }

        // 获取要分配的角色名称
        const rolesToAssign = ALL_ROLES
            .filter(role => roleIdList.includes(role.id))
            .map(role => role.roleName);

        if (rolesToAssign.length !== roleIdList.length) {
            return { success: false, message: '包含无效的角色ID' };
        }

        // 更新用户角色（去重）
        const currentRoles = users[userIndex].roles || [];
        const newRoles = [...new Set([...currentRoles, ...rolesToAssign])];

        users[userIndex] = {
            ...users[userIndex],
            roles: newRoles,
            updateTime: new Date().toISOString()
        };

        await fs.writeFile(USER_PATH, JSON.stringify(users, null, 2));
        return { success: true, message: '职位分配成功' };
    } catch (error) {
        console.error('分配角色失败:', error);
        return { success: false, message: '服务器错误' };
    }
}

async function getAllRoles(page = 1, size = 10, roleName = '') {
    try {
        const data = await fs.readFile(roles_path, 'utf8');
        let roles = JSON.parse(data);

        // 筛选角色名称
        if (roleName) {
            const searchTerm = roleName.toLowerCase();
            roles = roles.filter(role =>
                role.roleName.toLowerCase().includes(searchTerm)
            );
        }

        // 分页处理
        const start = (page - 1) * size;
        const end = start + size;
        const records = roles.slice(start, end);

        return {
            records,
            total: roles.length,
            size,
            current: page,
            pages: Math.ceil(roles.length / size),
            orders: [],
            optimizeCountSql: true,
            hitCount: false,
            countId: null,
            maxLimit: null,
            searchCount: true
        };
    } catch (error) {
        console.error('读取角色数据失败:', error);
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

async function createRole(roleData) {
    try {
        const data = await fs.readFile(roles_path, 'utf8');
        const roles = JSON.parse(data);

        // 检查角色名是否已存在
        const exists = roles.some(role => role.roleName === roleData.roleName);
        if (exists) {
            return { success: false, message: '角色名称已存在' };
        }

        // 创建新角色
        const newId = roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 0;
        const newRole = {
            id: newId,
            roleName: roleData.roleName,
            createTime: new Date().toISOString(),
            updateTime: null,
            remark: null
        };

        roles.push(newRole);
        await fs.writeFile(roles_path, JSON.stringify(roles, null, 2));

        return { success: true, message: '角色创建成功', data: newRole };
    } catch (error) {
        console.error('创建角色失败:', error);
        return { success: false, message: '服务器错误' };
    }
}

async function updateRole(roleData) {
    try {
        const data = await fs.readFile(roles_path, 'utf8');
        const roles = JSON.parse(data);
        const roleIndex = roles.findIndex(r => r.id === roleData.id);

        if (roleIndex === -1) {
            return { success: false, message: '角色不存在' };
        }

        // 检查角色名是否被其他角色使用
        const nameExists = roles.some(r =>
            r.id !== roleData.id && r.roleName === roleData.roleName
        );
        if (nameExists) {
            return { success: false, message: '角色名称已存在' };
        }

        // 更新角色
        roles[roleIndex] = {
            ...roles[roleIndex],
            roleName: roleData.roleName,
            updateTime: new Date().toISOString()
        };

        await fs.writeFile(roles_path, JSON.stringify(roles, null, 2));
        return { success: true, message: '角色更新成功', data: roles[roleIndex] };
    } catch (error) {
        console.error('更新角色失败:', error);
        return { success: false, message: '服务器错误' };
    }
}

async function deleteRole(roleId) {
    try {
        const data = await fs.readFile(roles_path, 'utf8');
        let roles = JSON.parse(data);
        const initialLength = roles.length;

        // 过滤掉要删除的角色
        roles = roles.filter(role => role.id !== parseInt(roleId));

        if (roles.length === initialLength) {
            return { success: false, message: '角色不存在' };
        }

        await fs.writeFile(roles_path, JSON.stringify(roles, null, 2));
        return { success: true, message: '角色删除成功' };
    } catch (error) {
        console.error('删除角色失败:', error);
        return { success: false, message: '服务器错误' };
    }
}

module.exports = {
    getUserRoles,
    assignRolesToUser,
    getAllRoles,
    updateRole,
    createRole,
    deleteRole
};