const fs = require('fs').promises;
const path = require('path');

// 一级分类ID映射到二级分类名称
const category2Map = {
    1: ["电子书", "网络文学", "音像", "英文原版", "杂志"],
    2: ["智能手机", "老人机", "对讲机", "以旧换新"],
    3: ["电视", "空调", "洗衣机", "冰箱", "厨卫大电"],
    4: ["相机", "摄像机", "数码相框", "单反"],
    5: ["家纺", "灯具", "生活日用", "家装软饰"],
    6: ["笔记本", "台式机", "平板电脑", "办公设备"],
    7: ["烹饪锅具", "刀剪菜板", "厨房配件", "水具酒具"],
    8: ["面部护肤", "身体护理", "口腔护理", "香水彩妆"],
    9: ["男装", "女装", "内衣", "袜子"],
    10: ["瑞士表", "国表", "日韩表", "欧美表"],
    11: ["休闲鞋", "商务鞋", "正装鞋", "拖鞋"],
    12: ["奶粉", "纸尿裤", "洗护用品", "童车童床"],
    13: ["钱包", "手提包", "双肩包", "单肩包"],
    14: ["白酒", "葡萄酒", "饮料", "茶叶"],
    15: ["黄金", "K金", "钻石", "玉石"],
    16: ["车载电器", "车身装饰", "维修保养", "清洁用品"],
    17: ["跑步机", "健身车", "瑜伽用品", "运动护具"],
    18: ["测试子分类1", "测试子分类2", "测试子分类3"]
};

async function generateCategory2Items() {
    let items = [];
    let id = 1;

    for (const [category1Id, names] of Object.entries(category2Map)) {
        for (const name of names) {
            items.push({
                id: id++,
                createTime: new Date().toISOString(),
                updateTime: null,
                name,
                category1Id: parseInt(category1Id)
            });
        }
    }

    await fs.writeFile(
        path.join(__dirname, '../data/category2Items.json'),
        JSON.stringify(items, null, 2)
    );
    console.log('二级分类数据生成成功');
}

generateCategory2Items();