const path = require('path');
const { URL } = require('url');

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                code: 400,
                message: '请上传图片文件'
            });
        }

        // 构建完整的图片URL
        const fullUrl = new URL(
            `/uploads/${req.file.filename}`,
            `${req.protocol}://${req.get('host')}`
        ).toString();

        res.json({
            code: 200,
            message: '图片上传成功',
            data: {
                url: fullUrl,
                name: req.file.filename,
                path: `/uploads/${req.file.filename}`
            }
        });
    } catch (error) {
        console.error('上传图片失败:', error);
        res.status(500).json({
            code: 500,
            message: error.message || '图片上传失败'
        });
    }
};