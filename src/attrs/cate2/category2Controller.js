const category2Storage = require('./category2Storage');

async function getCategory2Items(req, res) {
    try {
        const category1Id = req.params.id;

        if (!category1Id || isNaN(parseInt(category1Id))) {
            return res.status(400).json({
                code: 400,
                message: '必须提供有效的一级分类ID',
                ok: false
            });
        }

        const items = await category2Storage.getCategory2Items(category1Id);

        res.json({
            code: 200,
            message: 'success',
            data: items,
            ok: true
        });
    } catch (error) {
        console.error('获取二级分类失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

module.exports = {
    getCategory2Items
};