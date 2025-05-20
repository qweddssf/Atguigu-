const skuStorage = require('./skuStorage');

async function getAllSkus(req, res) {
    try {
        const skus = await skuStorage.getAllSkus();
        const page = parseInt(req.params.page) || 1;
        const size = parseInt(req.params.size) || 3;
        const total = skus.length;
        const pages = Math.ceil(total / size);
        const start = (page - 1) * size;
        const paginatedSkus = skus.slice(start, start + size);

        res.json({
            code: 200,
            message: "成功",
            data: {
                records: paginatedSkus,
                total,
                size,
                current: page,
                pages
            },
            ok: true
        });
    } catch (error) {
        console.error('获取SKU列表失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

module.exports = {
    getAllSkus
};