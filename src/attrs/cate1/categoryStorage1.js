const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '../../../data/categories1.json');

async function getAllCategories() {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('读取分类数据失败:', error);
        return [];
    }
}

module.exports = {
    getAllCategories
};