const fs = require('fs').promises;
const path = require('path');
const { faker } = require('@faker-js/faker');

// 基础销售属性类型
const baseSaleAttrs = [
    { id: 1, name: "颜色" },
    { id: 2, name: "版本" },
    { id: 3, name: "尺寸" },
    { id: 4, name: "容量" },
    { id: 5, name: "套餐" }
];

// 属性值选项
const attrValues = {
    "颜色": ["黑色", "白色", "金色", "银色", "蓝色", "红色"],
    "版本": ["标准版", "豪华版", "尊享版", "旗舰版"],
    "尺寸": ["小号", "中号", "大号", "加大号"],
    "容量": ["64GB", "128GB", "256GB", "512GB", "1TB"],
    "套餐": ["官方标配", "套餐一", "套餐二", "尊享套餐"]
};

async function generateSpuSaleAttrs() {
    const attrs = [];
    let id = 1;
    let valueId = 1;

    // 为每个SPU(1-100)生成1-3个销售属性
    for (let spuId = 1; spuId <= 100; spuId++) {
        const attrCount = faker.number.int({ min: 1, max: 3 });
        const usedAttrTypes = new Set();

        for (let i = 0; i < attrCount; i++) {
            // 随机选择一个未使用的属性类型
            let baseAttr;
            do {
                baseAttr = faker.helpers.arrayElement(baseSaleAttrs);
            } while (usedAttrTypes.has(baseAttr.id));
            usedAttrTypes.add(baseAttr.id);

            // 为每个属性生成2-4个属性值
            const valueCount = faker.number.int({ min: 2, max: 4 });
            const values = [];

            for (let j = 0; j < valueCount; j++) {
                const availableValues = attrValues[baseAttr.name];
                const valueName = faker.helpers.arrayElement(availableValues);

                values.push({
                    id: valueId++,
                    createTime: null,
                    updateTime: null,
                    spuId,
                    baseSaleAttrId: baseAttr.id,
                    saleAttrValueName: valueName,
                    saleAttrName: baseAttr.name,
                    isChecked: null
                });
            }

            attrs.push({
                id: id++,
                createTime: null,
                updateTime: null,
                spuId,
                baseSaleAttrId: baseAttr.id,
                saleAttrName: baseAttr.name,
                spuSaleAttrValueList: values
            });
        }
    }

    await fs.writeFile(
        path.join(__dirname, '../data/spuSaleAttrs.json'),
        JSON.stringify(attrs, null, 2)
    );
    console.log('SPU销售属性数据生成成功');
}

generateSpuSaleAttrs();