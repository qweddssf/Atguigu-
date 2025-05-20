const fs = require('fs').promises;
const path = require('path');
const { faker } = require('@faker-js/faker'); // 用于生成假数据

// 安装faker: npm install @faker-js/faker

const DATA_PATH = path.join(__dirname, '../data/products.json');




// 生成随机品牌名称
const brands = [
    'Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Oppo',
    'Vivo', 'Nike', 'Adidas', 'Sony', 'Microsoft',
    'Lenovo', 'Dell', 'HP', 'Asus', 'Acer',
    'LG', 'Panasonic', 'Philips', 'Toshiba', 'Canon'
];

// 获取所图像地址
async function getAllimgUrl() {
    const imgUrl = path.join(__dirname, '../data/imgUrl.json');
    const data = await fs.readFile(imgUrl, 'utf8');
    return JSON.parse(data);
}



// 生成100个商品数据
async function generateProductData() {
    const products = [];
    const imgList = await getAllimgUrl()
    // console.log(imgList.imgUrl);

    for (let i = 1; i <= 100; i++) {
        const createTime = faker.date.between({
            from: '2022-01-01T00:00:00Z',
            to: '2023-06-01T00:00:00Z'
        }
        ).toISOString();

        products.push({
            createTime,
            id: i,
            logoUrl: faker.helpers.arrayElement(imgList.imgUrl),
            tmName: faker.helpers.arrayElement(brands),
            updateTime: null
        });
    }

    return products;
}

// 保存数据到文件
async function saveProductsToFile() {
    try {
        const products = await generateProductData();
        await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2));
        console.log('成功生成100个商品数据并保存到 products.json');
    } catch (error) {
        console.error('生成商品数据时出错:', error);
    }
}

// 执行生成
saveProductsToFile();