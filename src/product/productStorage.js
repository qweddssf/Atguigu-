const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '../../data/products.json');

async function getAllProducts() {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading products file:', error);
        return [];
    }
}

async function pushProduct(productData) {
    try {
        const products = await this.getAllProducts();

        // 生成新ID (当前最大ID + 1)
        const newId = products.length > 0
            ? Math.max(...products.map(p => p.id)) + 1
            : 1;

        const newProduct = {
            ...productData,
            id: newId,
            createTime: new Date().toISOString(),
            updateTime: null
        };

        products.push(newProduct);
        await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2));

        return newProduct;
    } catch (error) {
        console.error('创建商品失败:', error);
        throw error;
    }
}

async function updateProduct(id, updatedData) {
    try {
        const products = await this.getAllProducts();
        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            return null; // 未找到商品
        }

        // 保留原始创建时间，只更新指定字段和更新时间
        const updatedProduct = {
            ...products[productIndex],
            ...updatedData,
            updateTime: new Date().toISOString()
        };

        products[productIndex] = updatedProduct;
        await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2));

        return updatedProduct;
    } catch (error) {
        console.error('更新商品失败:', error);
        throw error;
    }
}

async function deleteProduct(id) {
    try {
        const products = await this.getAllProducts();
        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            return false; // 未找到商品
        }

        // 从数组中删除商品
        products.splice(productIndex, 1);

        // 保存更新后的数据
        await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2));

        return true;
    } catch (error) {
        console.error('删除商品失败:', error);
        throw error;
    }
}

module.exports = {
    getAllProducts,
    pushProduct,
    updateProduct,
    deleteProduct
};