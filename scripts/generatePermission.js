const fs = require('fs');
const path = require('path');
// 读取原始文件
const rawDataPath = path.join(__dirname, '../data/allPermission.json');
const rawData = fs.readFileSync(rawDataPath, 'utf-8');
const allPermission = JSON.parse(rawData);

// ID生成器
let idCounter = 1;

// 转换函数
function convertData(data, level = 1, pid = 0) {
    const result = [];

    for (const [name, children] of Object.entries(data)) {
        const currentId = idCounter++;
        const currentTime = new Date().toISOString();
        const node = {
            id: "" + currentId,
            createTime: currentTime,
            updateTime: currentTime,
            pid: currentId,
            name,
            code: null,
            toCode: null,
            type: level === 1 ? 0 : (Object.keys(children || {}).length > 0 ? 1 : 2),
            status: null,
            level,
            select: false,
            children: null
        };

        if (children && typeof children === 'object' && !Array.isArray(children)) {
            node.children = convertData(children, level + 1, currentId);
        }

        result.push(node);
    }

    return result.length > 0 ? result : null;
}

// 执行转换
const permissionData = convertData(allPermission, 1);

// 写入新文件
fs.writeFileSync('permission.json', JSON.stringify(permissionData, null, 2), 'utf-8');

console.log('permission.json 文件已生成');