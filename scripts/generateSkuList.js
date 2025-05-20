const fs = require('fs').promises;
const path = require('path');
const category3Id_path = path.join(__dirname, '../data/category3Items.json');
const IMG_URL_PATH = path.join(__dirname, '../data/imgUrl.json');
const SKU_PATH = path.join(__dirname, '../data/skuList.json');
const spuStorage = require('../src/spu/spuStorage');
const { fakerZH_CN } = require('@faker-js/faker');

async function generateMockSkus() {
    const mockSkus = [];
    // const brands = ['华为', '小米', '苹果', '三星', '索尼'];
    const types = ['电视', '手机', '平板', '笔记本', '显示器'];
    let category3 = await fs.readFile(category3Id_path, 'utf8')
    let category3Data = JSON.parse(category3)
    const imgData = await fs.readFile(IMG_URL_PATH, 'utf8')
    const { imgUrl } = JSON.parse(imgData);
    let brands = await spuStorage.getAllBrands();
    brands = brands.map(item => item.tmName)


    for (let i = 0; i < category3Data.length; i++) {
        const brand = brands[i % brands.length];
        const type = types[i % types.length];
        const imgIndex = i % imgUrl.length;
        const tmId = i % brands.length
        mockSkus.push({
            id: `B${i + 1}`,
            createTime: fakerZH_CN.date.between({ from: '2022-01-01T00:00:00Z', to: '2023-06-01T00:00:00Z' }).toISOString(),
            updateTime: fakerZH_CN.date.between({ from: '2022-01-01T00:00:00Z', to: '2023-06-01T00:00:00Z' }).toISOString(),
            spuId: 10 + Math.floor(i / 5),
            price: fakerZH_CN.number.int({ min: 1000, max: 20000 }),
            skuName: `${brand}${type}${fakerZH_CN.commerce.productAdjective()}${fakerZH_CN.commerce.product()}`,
            skuDesc: `${brand}${type}${fakerZH_CN.commerce.productDescription()}`,
            weight: (Math.random() * 10).toFixed(2),
            tmId: tmId,
            category3Id: i,
            skuDefaultImg: imgUrl[imgIndex],
            isSale: i % 4 !== 0 ? 1 : 0, // 大部分在售
            skuImageList: null,
            skuAttrValueList: null,
            skuSaleAttrValueList: null
        });
    }

    // 保存生成的mock数据
    await fs.writeFile(SKU_PATH, JSON.stringify(mockSkus, null, 2));
    console.log('SKU数据生成成功');
}

generateMockSkus()