// 三方库
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// 登录的授权管理
const authController = require('./authController');
//产品管理
const productController = require('./product/productController')
// 图片上传管理
const upload = require('./uploadfile/uploadMiddleware');
const uploadController = require('./uploadfile/uploadController');
// 三级分类
const categoryController = require('./attrs/cate1/categoryController1.js');
const category2Controller = require('./attrs/cate2/category2Controller');
const category3Controller = require('./attrs/cate3/category3Controller');
// 商品属性
const productAttrController = require('./attrs/productAttrController');
//spu
const spuController = require('./spu/spuController');
//sku
const skuController = require('./sku/skuController');
// 用户管理
const userController = require('./userConfig/userController');
// 角色和对应职位管理
const roleController = require('./userConfig/roleController');
const permissionController = require('./userConfig/permissionController');
// 菜单管理
const menuController = require('./userConfig/menuController.js')

const app = express();
const PORT = 3000;

// 中间件
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));


// 路由 /myServer
app.post('/user/login', authController.login);
app.post('/user/register', authController.register);
app.get('/user/info', authController.getUserInfo);
// 商品品牌接口
app.get('/products/trademark/getList/:pageNo/:pageSize', productController.getProductList);
app.post('/products/trademark/addTM', productController.addProduct);
app.put('/products/trademark/updateTM', productController.updateProduct);
app.delete('/products/trademark/deleteTM/:id', productController.deleteProduct);
// 图片上传接口
app.post('/upload', upload.single('file'), uploadController.uploadImage);
// 商品属性的接口
app.get('/products/attr/getCategory1', categoryController.getTopCategories);
app.get('/products/attr/getCategory2/:id', category2Controller.getCategory2Items);
app.get('/products/attr/getCategory3/:id', category3Controller.getCategory3Items);
app.get('/products/attr/InfoList/:category1Id/:category2Id/:category3Id', productAttrController.getProductAttrs);
app.post('/products/attr/saveInfo', productAttrController.saveProductAttr);
app.delete('/products/attr/deleteInfo/:id', productAttrController.deleteProductAttr);
// spu 接口
app.get('/products/spu/getList/:currentPage/:pageSize', spuController.getSpuList);
app.get('/products/spu/getAllTrademarks', spuController.getAllBrands);
app.get('/products/spu/ImageList/:spuId', spuController.getBrandImages);
app.get('/products/spu/getSaleAttr/:spuId', spuController.getSpuSaleAttrs);
app.get('/products/spu/getSpuAttrList/:spuId', spuController.getSpuAttrNames);

// sku
app.get('/products/sku/list/:page/:size', skuController.getAllSkus);

// 用户管理
app.get('/config/user/getUserInfo/:page/:size', userController.getUserInfo);
app.post('/config/user/createUserInfo', userController.createUser);
app.post('/config/user/updateUserInfo', userController.updateUser);
app.get('/config/roles/rolesList/:id', roleController.getRolesList);
app.post('/config/roles/assign', roleController.assignRoles);
app.delete('/config/user/deleteUserInfo/:userId', userController.deleteUser);
app.delete('/config/user/batchRemove', userController.batchDeleteUsers);
app.get('/config/user/searchUserInfo/:page/:size', userController.searchUserInfo);
// 角色管理
app.get('/config/roles/rolesAllList/:page/:size', roleController.getAllRoles);
app.post('/config/roles/createRoles', roleController.createRole);
app.put('/config/roles/updateRoles', roleController.updateRole);
// 若id不存在或者 id=-1 则返回所有的权限，select全部为false
app.get('/config/roles/permissions/:roleId', permissionController.getRolePerm);
app.post('/config/roles/updatePermissions', permissionController.updateRolePermissions);
app.delete('/config/roles/deleteRoles/:id', roleController.deleteRole);
// 菜单管理
app.get('/config/menu/permissions', menuController.getPermission);
// pid 是父节点id，
app.post('/config/menu/createMenu', menuController.createSubMenu);
// id是需要修改节点的当前id 
app.put('/config/menu/updateMenu', menuController.updateSubMenu)
// id是当前节点id 不是父节点
app.delete('/config/menu/deleteMenu/:id', menuController.deleteSubMenu)
// 启动服务器
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});