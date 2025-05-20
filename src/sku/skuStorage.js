const fs = require('fs').promises;
const path = require('path');

const SKU_PATH = path.join(__dirname, '../../data/skuList.json');



async function getAllSkus() {
    try {
        const skuData = await fs.readFile(SKU_PATH, 'utf8')
        const skus = JSON.parse(skuData);
        return skus;
    } catch (error) {
        console.error('读取SKU数据失败:', error);
        return [];
    }
}

// 生成mock数据


module.exports = {
    getAllSkus
};