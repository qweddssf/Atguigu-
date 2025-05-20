

// 二级分类ID映射到三级分类名称
// const category3Map = {
//     // 图书/音像/电子书刊下的二级分类
//     1: ["编程电子书", "文学电子书", "科技电子书"],
//     2: ["网络小说", "原创文学", "影视原著"],
//     3: ["音乐CD", "电影DVD", "戏曲音像"],
//     4: ["英文小说", "英文教材", "英文杂志"],
//     5: ["科技杂志", "时尚杂志", "财经杂志"],

//     // 手机下的二级分类
//     6: ["5G手机", "4G手机", "折叠手机"],
//     7: ["大字手机", "长待机手机"],
//     8: ["民用对讲机", "商用对讲机"],
//     9: ["苹果以旧换新", "华为以旧换新"],

//     // 家用电器下的二级分类
//     10: ["智能电视", "OLED电视", "曲面电视"],
//     11: ["壁挂空调", "中央空调", "移动空调"],
//     12: ["滚筒洗衣机", "波轮洗衣机", "迷你洗衣机"],
//     13: ["双门冰箱", "对开门冰箱", "迷你冰箱"],
//     14: ["油烟机", "燃气灶", "消毒柜"],

//     // 其他分类的三级分类...
//     // 可以根据需要继续补充
//     15: ["单反相机", "微单相机", "拍立得"],
//     16: ["4K摄像机", "运动摄像机"],
//     17: ["电子相框", "数码相册"],
//     18: ["入门单反", "专业单反", "中画幅单反"],

//     19: ['家纺1', '家纺2', '家纺3', '家纺4'],
//     20: ["灯具1", "灯具1"],
// };

const fs = require('fs').promises;
const path = require('path');
const category2Items = require('../data/category2Items.json');

async function generateCategory3Items() {
    let items = [];
    let id = 1;

    // 读取二级分类数据
    const category2Data = category2Items;

    // 为每个二级分类生成2个三级分类
    for (const category2 of category2Data) {
        items.push({
            id: id++,
            createTime: new Date().toISOString(),
            updateTime: null,
            name: `${category2.name}三级1`,
            category2Id: category2.id
        });

        items.push({
            id: id++,
            createTime: new Date().toISOString(),
            updateTime: null,
            name: `${category2.name}三级2`,
            category2Id: category2.id
        });
    }

    await fs.writeFile(
        path.join(__dirname, '../data/category3Items.json'),
        JSON.stringify(items, null, 2)
    );
    console.log('简化版三级分类数据生成成功');
}

generateCategory3Items();