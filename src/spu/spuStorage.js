const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '../../data/spuList.json');
const DATA_PATH2 = path.join(__dirname, '../../data/products.json');
const DATA_PATH3 = path.join(__dirname, '../../data/spuSaleAttrs.json');

async function getAllSpus() {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('读取SPU数据失败:', error);
        return [];
    }
}

async function getAllBrands() {
    try {
        const data = await fs.readFile(DATA_PATH2, 'utf8');
        const products = JSON.parse(data);

        // 去重处理 - 使用Map按tmName去重
        const brandMap = new Map();
        products.forEach(product => {
            if (!brandMap.has(product.tmName)) {
                brandMap.set(product.tmName, {
                    id: product.id,
                    tmName: product.tmName,
                    logoUrl: product.logoUrl
                });
            }
        });

        return Array.from(brandMap.values());
    } catch (error) {
        console.error('读取品牌数据失败:', error);
        return [];
    }
}

async function getBrandImagess(spuId) {
    try {
        const data = await fs.readFile(DATA_PATH2, 'utf8');
        const products = JSON.parse(data);

        // 1. 先找到对应spuId的品牌信息
        const brand = products.find(p => p.id === parseInt(spuId));
        if (!brand) {
            return [];
        }

        // 2. 获取该品牌(tmName)的所有产品图片
        const brandProducts = products.filter(p => p.tmName === brand.tmName);

        // 3. 转换为需要的格式
        return brandProducts.map((product, index) => ({
            id: product.id,
            tmName: product.tmName,
            spuId: parseInt(spuId),
            imgName: `image_${index + 1}`,
            createTime: product.createTime,
            updateTime: product.updateTime,
            imgUrl: product.logoUrl // 使用logoUrl作为图片URL，你可以根据需要修改
        }));
    } catch (error) {
        console.error('读取品牌图片失败:', error);
        return [];
    }
}

async function getSpuSaleAttrs(spuId) {
    try {
        const data = await fs.readFile(DATA_PATH3, 'utf8');
        const allAttrs = JSON.parse(data);
        return allAttrs.filter(attr => attr.spuId === parseInt(spuId));
    } catch (error) {
        console.error('读取销售属性失败:', error);
        return [];
    }
}

async function getSpuAttrNames(spuId) {
    try {
        const data = await fs.readFile(DATA_PATH3, 'utf8');
        const allAttrs = JSON.parse(data);
        const spuAttrs = allAttrs.filter(attr => attr.spuId === parseInt(spuId));

        // 提取不重复的属性名称
        const attrMap = new Map();
        spuAttrs.forEach(attr => {
            if (!attrMap.has(attr.baseSaleAttrId)) {
                attrMap.set(attr.baseSaleAttrId, {
                    id: attr.baseSaleAttrId,
                    name: attr.saleAttrName
                });
            }
        });

        return Array.from(attrMap.values());
    } catch (error) {
        console.error('读取销售属性名称失败:', error);
        return [];
    }
}

module.exports = {
    getAllSpus,
    getAllBrands,
    getBrandImagess,
    getSpuSaleAttrs,
    getSpuAttrNames
};