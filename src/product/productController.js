const productStorage = require('./productStorage');
const userStorage = require('../userStorage');

async function getProductList(req, res) {
    try {
        // 1. 验证Token
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: '未提供Token' });
        }

        // 查找拥有此Token的用户
        const users = await userStorage.getAllUsers();
        const user = users.find(u => u.token === token);
        if (!user) {
            return res.status(401).json({ message: '无效Token' });
        }

        // 2. 从路由参数获取分页参数
        const pageNo = parseInt(req.params.pageNo) || 1;
        const pageSize = parseInt(req.params.pageSize) || 10;

        // 3. 获取所有商品
        const allProducts = await productStorage.getAllProducts();

        // 4. 计算分页数据
        const startIndex = (pageNo - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedProducts = allProducts.slice(startIndex, endIndex);
        const total = allProducts.length;
        const pages = Math.ceil(total / pageSize);

        // 5. 构建响应
        const response = {
            countId: null,
            current: pageNo,
            hitCount: false,
            maxLimit: null,
            optimizeCountSql: true,
            orders: [],
            pages: pages,
            records: paginatedProducts,
            searchCount: true,
            size: pageSize,
            total: total
        };

        res.json({
            code: 200,
            ok: true,
            data: response,
            message: '获取成功'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '服务器错误' });
    }
}

async function addProduct(req, res) {
    try {
        // 1. 验证Token
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: '未提供Token' });
        }

        // 验证用户权限
        const users = await userStorage.getAllUsers();
        const user = users.find(u => u.token === token);
        if (!user) {
            return res.status(401).json({ message: '无效Token' });
        }

        // 2. 验证请求参数
        const { tmName, logoUrl } = req.body;

        if (!tmName || !logoUrl) {
            return res.status(400).json({
                message: '必须提供品牌名称(tmName)和Logo URL(logoUrl)'
            });
        }

        // 3. 创建商品
        const newProduct = await productStorage.pushProduct({
            tmName,
            logoUrl
        });

        // 4. 返回成功响应 (排除不需要的字段)
        res.json({
            code: 200,
            message: '商品添加成功',
            data: null,
            ok: true
        });

    } catch (error) {
        console.error('添加商品错误:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误，添加商品失败'
        });
    }
}

async function updateProduct(req, res) {
    try {
        // 1. 验证Token
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: '未提供Token' });
        }

        // 验证用户权限
        const users = await userStorage.getAllUsers();
        const user = users.find(u => u.token === token);
        if (!user) {
            return res.status(401).json({ message: '无效Token' });
        }

        // 2. 获取参数
        const { tmName, logoUrl, id } = req.body;

        // 3. 参数验证
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: '必须提供有效的商品ID' });
        }

        if (!tmName && !logoUrl) {
            return res.status(400).json({
                message: '必须提供至少一个更新字段(tmName或logoUrl)'
            });
        }

        // 4. 构建更新数据
        const updateData = {};
        if (tmName) updateData.tmName = tmName;
        if (logoUrl) updateData.logoUrl = logoUrl;

        // 5. 执行更新
        const updatedProduct = await productStorage.updateProduct(
            parseInt(id),
            updateData
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: '未找到指定商品' });
        }

        // 6. 返回成功响应
        res.json({
            code: 200,
            message: '商品更新成功',
            data: null,
            ok: true
        });

    } catch (error) {
        console.error('更新商品错误:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误，更新商品失败'
        });
    }
}

async function deleteProduct(req, res) {
    try {
        // 1. 验证Token
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: '未提供Token' });
        }

        // 验证用户权限
        const users = await userStorage.getAllUsers();
        const user = users.find(u => u.token === token);
        if (!user) {
            return res.status(401).json({ message: '无效Token' });
        }

        // 2. 获取商品ID
        const id = parseInt(req.params.id) || -1
        // 3. 参数验证
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: '必须提供有效的商品ID' });
        }

        // 4. 执行删除
        const isDeleted = await productStorage.deleteProduct(parseInt(id));

        if (!isDeleted) {
            return res.status(404).json({ message: '未找到指定商品' });
        }

        // 5. 返回成功响应
        res.json({
            code: 200,
            message: '商品删除成功',
            data: null,
            ok: true
        });

    } catch (error) {
        console.error('删除商品错误:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误，删除商品失败'
        });
    }
}

// 更新导出
module.exports = {
    getProductList,
    addProduct,
    updateProduct,
    deleteProduct
};
