const category3Storage = require('./category3Storage');

async function getCategory3Items(req, res) {
    try {
        const category2Id = req.params.id;

        if (!category2Id || isNaN(parseInt(category2Id))) {
            return res.status(400).json({
                code: 400,
                message: '必须提供有效的二级分类ID',
                ok: false
            });
        }

        const items = await category3Storage.getCategory3Items(category2Id);

        res.json({
            code: 200,
            message: 'success',
            data: items,
            ok: true
        });
    } catch (error) {
        console.error('获取三级分类失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

module.exports = {
    getCategory3Items
};