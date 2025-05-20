const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '../../../data/category3Items.json');

async function getCategory3Items(category2Id) {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        const allItems = JSON.parse(data);
        return allItems.filter(item => item.category2Id === parseInt(category2Id));
    } catch (error) {
        console.error('读取三级分类数据失败:', error);
        return [];
    }
}

module.exports = {
    getCategory3Items
};