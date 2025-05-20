const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '../../../data/category2Items.json');

async function getCategory2Items(category1Id) {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        const allItems = JSON.parse(data);
        return allItems.filter(item => item.category1Id === parseInt(category1Id));
    } catch (error) {
        console.error('读取二级分类数据失败:', error);
        return [];
    }
}

module.exports = {
    getCategory2Items
};