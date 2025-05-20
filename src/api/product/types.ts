export interface  ResponseData {
    code:number,
    ok:boolean,
    message:string
}

export interface  tradeMarkItem{
    id?:1,
    tmName:string,
    logoUrl:string,
}
export type tradeMarkList = tradeMarkItem[];

export interface trademarkListResponse extends ResponseData {
    data:{
        records:tradeMarkList,
        total:number,
        size:number,
        current:number,
        pages:number,
        searchCount:boolean,
    }
}
// 商品属性的类型
// 一级分类
export interface categoryObj {
    data:{
        id:number,
        createTime?:string,
        updateTime?:string,
        category1Id?:number,
        category2Id?:number,
        name:string,
    }
}
// 二级分类

export interface categoryListResponse extends ResponseData {
    data:Array<categoryObj>
}

// 商品的属性
export type attrValue  = {
    id:number|string,
    valueName:string,
    attrId:number|string,
}

export type attrValueList = attrValue[];
export interface attrItem{
    id?:number|string,
    attrName:string,
    categoryId?:number|string,
    categoryLevel:number,
    attrValueList:attrValueList,
    isShow:boolean
}
export interface attrResponseData extends ResponseData {
    data:attrItem[];
}
// spu
export interface spuItem {
    id:number|string,
    spuName:string,
    description:string,
    category3Id:number|string,
    tmId:number|string,
    spuSaleAttrList:null,
    spuImageList:null,
    tmName?:string,
}

export type recordsList = spuItem[];
export interface spuResponseData {
    data:{
        records:recordsList;
        total:number;
        size:number;
        current:number;
        searchCount:boolean;
        pages:number;
    }
}
export interface spuResponse extends ResponseData {
    data:spuResponseData;
}
// spu 所有品牌数据类型
export interface AlltradeMark extends ResponseData {
    data:tradeMarkItem[]
}

export type tmImgItem = {
    id:number|string,
    tmName:string,
    spuId:number|string,
    imgName:string,
    imUrl:string,
}

export interface spuImgResponse extends ResponseData {
    data:tmImgItem[];
}
// 商品属性的value
export type spuSaleAttrItem = {
    id:number|string,
    createTime?:string,
    updateTime?:string,
    spuId:number|string,
    baseSaleAttrId:number|string,
    saleAttrValueName:string,
    saleAttrName:string,
    isChecked:null,
}

export interface SaleAttrItem {
    id:number|string,
    createTime?:string,
    updateTime?:string,
    spuId:number|string,
    baseSaleAttrId:number|string,
    saleAttrName:string,
    spuSaleAttrValueList:spuSaleAttrItem[],
}

export interface SaleAttrResponse extends ResponseData {
    data:SaleAttrItem[];
}
export type SaleAttrValueListItem = {
    id:number|string,
    name:string,
}
export interface SaleAttrListResponse extends ResponseData {
    data:SaleAttrValueListItem [];
}
//sku
export type skuItem = {
    id:number|string,
    createTime?:string,
    updateTime?:string,
    spuId:number|string,
    price:number|string,
    skuName:string,
    skuDesc:string,
    weight:number|string,
    tmId:number|string,
    category3Id:number|string,
    skuDefaultImg:string,
    isSale:number|string,
    skuImageList:null;
    skuSaleAttrValueList:null
}
export interface skuResponseData extends ResponseData {
    data: {
        records:skuItem[],
        total:number,
        size:number,
        current:number,
        pages:number,
    };
}