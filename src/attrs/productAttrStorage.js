const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '../../data/productAttrs.json');

async function getProductAttrs(category1Id, category2Id, category3Id) {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        const allAttrs = JSON.parse(data);

        // 这里可以根据需要按不同级别分类筛选
        // 示例中我们按三级分类ID筛选
        return allAttrs.filter(attr => attr.categoryId === parseInt(category3Id));
    } catch (error) {
        console.error('读取商品属性失败:', error);
        return [];
    }
}

async function getAllProductAttrs() {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('读取商品属性失败:', error);
        return [];
    }
}

async function saveProductAttrs(attrs) {
    await fs.writeFile(DATA_PATH, JSON.stringify(attrs, null, 2));
}

async function saveOrUpdateProductAttr(attrData) {
    const attrs = await getAllProductAttrs();

    if (attrData.id) {
        // 修改属性
        const index = attrs.findIndex(a => a.id === attrData.id);
        if (index !== -1) {
            attrs[index] = { ...attrs[index], ...attrData };
        }
    } else {
        // 新增属性
        const newId = attrs.length > 0 ? Math.max(...attrs.map(a => a.id)) + 1 : 1;
        const newAttr = {
            ...attrData,
            id: newId,
            attrValueList: attrData.attrValueList.map(value => ({
                ...value,
                id: value.id || Date.now() + Math.floor(Math.random() * 1000),
                attrId: value.attrId || newId
            }))
        };
        attrs.push(newAttr);
    }

    await saveProductAttrs(attrs);
    return attrData.id ? '修改成功' : '新增成功';
}

async function deleteProductAttr(id) {
    const attrs = await getAllProductAttrs();
    const initialLength = attrs.length;

    // 过滤掉要删除的属性
    const updatedAttrs = attrs.filter(attr => attr.id !== parseInt(id));

    if (updatedAttrs.length === initialLength) {
        return false; // 没有找到对应ID的属性
    }

    await saveProductAttrs(updatedAttrs);
    return true;
}

module.exports = {
    getProductAttrs,
    saveOrUpdateProductAttr,
    getAllProductAttrs,
    deleteProductAttr
};