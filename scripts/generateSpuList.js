const fs = require('fs').promises;
const path = require('path');
const { fakerZH_CN } = require('@faker-js/faker');
async function generateSpuList() {
    const spus = [];
    const brands = ['Apple', '三星', '华为', '小米', 'OPPO', 'Vivo', 'Nike', 'Adidas', 'Sony', 'Microsoft',
        'Lenovo', 'Dell', 'HP', 'Asus', 'Acer',
        'LG', 'Panasonic', 'Philips', 'Toshiba', 'Canon'];

    const DATA_PATH = path.join(__dirname, '../data/category3Items.json');
    const data = JSON.parse(await fs.readFile(DATA_PATH, 'utf8'));
    // 为每个三级分类生成3-5个SPU
    for (let category3Id = 1; category3Id <= data.length; category3Id++) {
        const spuCount = fakerZH_CN.number.int({ min: 3, max: 5 });

        for (let i = 0; i < spuCount; i++) {
            const brand = fakerZH_CN.helpers.arrayElement(brands)
            spus.push({
                id: category3Id * 100 + i,
                spuName: brand,
                description: fakerZH_CN.commerce.productDescription(),
                category3Id,
                tmId: brands.indexOf(brand),
                spuSaleAttrList: null,
                spuImageList: null
            });
        }
    }

    await fs.writeFile(
        path.join(__dirname, '../data/spuList.json'),
        JSON.stringify(spus, null, 2)
    );
    console.log('SPU数据生成成功');
}

generateSpuList();