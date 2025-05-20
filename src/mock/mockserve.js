import Mock from 'mockjs';

// webpack 默认对外暴露的数据  图片 和JSON
import banner from './banner'
import floor from './floor'

Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })