// 生成一级分类
const fs = require('fs').promises;
const path = require('path');

const categories = [
    "图书/音像/电子书刊",
    "手机",
    "家用电器",
    "数码",
    "家居家装",
    "电脑办公",
    "厨具",
    "个护化妆",
    "服饰内衣",
    "钟表",
    "鞋靴",
    "母婴",
    "礼品箱包",
    "食品饮料/保健食品",
    "珠宝",
    "汽车用品",
    "运动健康",
    "测试一级分类"
];

async function generateCategories() {
    const data = categories.map((name, index) => ({
        id: index + 1,
        createTime: new Date().toISOString(),
        updateTime: null,
        name
    }));

    await fs.writeFile(
        path.join(__dirname, '../data/categories1.json'),
        JSON.stringify(data, null, 2)
    );
    console.log('分类数据生成成功');
}

generateCategories();