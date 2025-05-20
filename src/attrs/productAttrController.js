const productAttrStorage = require('./productAttrStorage');

async function getProductAttrs(req, res) {
    try {
        const { category1Id, category2Id, category3Id } = req.params;

        // 参数验证
        if (!category1Id || !category2Id || !category3Id) {
            return res.status(400).json({
                code: 400,
                message: '必须提供完整的分类ID',
                ok: false
            });
        }

        const attrs = await productAttrStorage.getProductAttrs(category1Id, category2Id, category3Id);

        res.json({
            code: 200,
            message: '成功',
            data: attrs,
            ok: true
        });
    } catch (error) {
        console.error('获取商品属性失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function saveProductAttr(req, res) {
    try {
        const { id, attrName, attrValueList, categoryId, categoryLevel } = req.body;

        // 参数验证
        if (!attrName || !attrValueList || !categoryId || categoryLevel !== 3) {
            return res.status(400).json({
                code: 400,
                message: '参数不完整或分类级别不正确',
                ok: false
            });
        }

        // 验证属性值列表
        if (!Array.isArray(attrValueList)) {
            return res.status(400).json({
                code: 400,
                message: 'attrValueList必须是数组',
                ok: false
            });
        }

        const result = await productAttrStorage.saveOrUpdateProductAttr({
            id,
            attrName,
            attrValueList,
            categoryId: parseInt(categoryId),
            categoryLevel
        });

        res.json({
            code: 200,
            message: result,
            data: null,
            ok: true
        });
    } catch (error) {
        console.error('保存商品属性失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function deleteProductAttr(req, res) {
    try {
        const { id } = req.params;

        // 参数验证
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                code: 400,
                message: '必须提供有效的属性ID',
                ok: false
            });
        }

        const isDeleted = await productAttrStorage.deleteProductAttr(id);

        if (!isDeleted) {
            return res.status(404).json({
                code: 404,
                message: '未找到指定属性',
                ok: false
            });
        }

        res.json({
            code: 200,
            message: '删除成功',
            data: null,
            ok: true
        });
    } catch (error) {
        console.error('删除商品属性失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误，删除失败',
            ok: false
        });
    }
}

// 更新导出

module.exports = {
    getProductAttrs,
    saveProductAttr,
    deleteProductAttr
};