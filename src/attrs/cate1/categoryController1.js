const categoryStorage = require('./categoryStorage1');

async function getTopCategories(req, res) {
    try {
        // 1. 获取所有分类
        const categories = await categoryStorage.getAllCategories();

        // 2. 构建响应数据
        const response = {
            code: 200,
            message: 'success',
            data: categories,
            ok: true
        };

        res.json(response);
    } catch (error) {
        console.error('获取分类失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

module.exports = {
    getTopCategories
};