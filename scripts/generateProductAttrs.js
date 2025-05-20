const fs = require('fs').promises;
const path = require('path');
// const { fakerZH_CN } = require('@fakerZH_CN-js/fakerZH_CN')
const { fakerZH_CN } = require('@faker-js/faker');
const { log } = require('console');
const DATA_PATH = path.join(__dirname, '../data/category3Items.json');
async function generateProductAttrs() {
    const attrs = [];
    let attrId = 1;
    let valueId = 1;
    const data = JSON.parse(await fs.readFile(DATA_PATH, 'utf8'));
    // const category3IdLen = length(data)
    // 为每个三级分类生成3-5个属性
    for (let category3Id = 1; category3Id <= data.length; category3Id++) {
        const attrCount = fakerZH_CN.number.int({ min: 2, max: 5 });
        for (let i = 0; i < attrCount; i++) {
            const attrName = fakerZH_CN.commerce.product();
            const valueCount = fakerZH_CN.number.int({ min: 2, max: 5 });
            const attrValues = [];
            for (let j = 0; j < valueCount; j++) {
                attrValues.push({
                    id: valueId++,
                    valueName: fakerZH_CN.commerce.productMaterial(),
                    attrId: attrId
                });
            }
            attrs.push({
                id: attrId++,
                attrName,
                categoryId: category3Id,
                categoryLevel: 3,
                attrValueList: attrValues
            });
        }
    }

    await fs.writeFile(
        path.join(__dirname, '../data/productAttrs.json'),
        JSON.stringify(attrs, null, 2)
    );
    console.log('商品属性数据生成成功');
}

generateProductAttrs();