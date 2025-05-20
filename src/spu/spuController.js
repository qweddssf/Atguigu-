const spuStorage = require('./spuStorage');

async function getSpuList(req, res) {
    try {
        const currentPage = parseInt(req.params.currentPage) || 1;
        const pageSize = parseInt(req.params.pageSize) || 10;
        const category3Id = req.query.category3Id ? parseInt(req.query.category3Id) : null;

        // 获取所有SPU
        let allSpus = await spuStorage.getAllSpus();

        // 按三级分类筛选
        if (category3Id) {
            allSpus = allSpus.filter(spu => spu.category3Id === category3Id);
        }

        // 分页处理
        const total = allSpus.length;
        const pages = Math.ceil(total / pageSize);
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const records = allSpus.slice(startIndex, endIndex);

        res.json({
            code: 200,
            message: "成功",
            data: {
                records,
                total,
                size: pageSize,
                current: currentPage,
                searchCount: true,
                pages
            },
            ok: true
        });
    } catch (error) {
        console.error('获取SPU列表失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function getAllBrands(req, res) {
    try {
        const brands = await spuStorage.getAllBrands();

        res.json({
            code: 200,
            message: "成功",
            data: brands,
            ok: true
        });
    } catch (error) {
        console.error('获取品牌列表失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function getBrandImages(req, res) {
    try {
        const { spuId } = req.params;
        // 参数验证
        if (!spuId || isNaN(parseInt(spuId))) {
            return res.status(400).json({
                code: 400,
                message: '必须提供有效的品牌ID',
                ok: false
            });
        }

        const images = await spuStorage.getBrandImagess(spuId);
        res.json({
            code: 200,
            message: "成功",
            data: images,
            ok: true
        });
    } catch (error) {
        console.error('获取品牌图片失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function getSpuSaleAttrs(req, res) {
    try {
        const { spuId } = req.params;

        if (!spuId || isNaN(parseInt(spuId))) {
            return res.status(400).json({
                code: 400,
                message: '必须提供有效的SPU ID',
                ok: false
            });
        }

        const saleAttrs = await spuStorage.getSpuSaleAttrs(spuId);

        res.json({
            code: 200,
            message: '成功',
            data: saleAttrs,
            ok: true
        });
    } catch (error) {
        console.error('获取销售属性失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

async function getSpuAttrNames(req, res) {
    try {
        const { spuId } = req.params;

        if (!spuId || isNaN(parseInt(spuId))) {
            return res.status(400).json({
                code: 400,
                message: '必须提供有效的SPU ID',
                ok: false
            });
        }

        const attrNames = await spuStorage.getSpuAttrNames(spuId);

        const path = require('path');
        const fs = require('fs').promises;
        const DATA_PATH3 = path.join(__dirname, '../../data/attrList.json');
        let allAttrdata = await fs.readFile(DATA_PATH3, 'utf8');
        allAttrdata = JSON.parse(allAttrdata)
        let rest = allAttrdata.baseSaleAttrs.filter(item1 => {
            return !attrNames.some(item2 => item2.id === item1.id)
        })

        res.json({
            code: 200,
            message: '成功',
            data: rest,
            ok: true
        });
    } catch (error) {
        console.error('获取销售属性名称失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            ok: false
        });
    }
}

module.exports = {
    getSpuList,
    getAllBrands,
    getBrandImages,
    getSpuSaleAttrs,
    getSpuAttrNames
};