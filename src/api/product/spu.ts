import request from "@/utils/request";
import type {spuResponse,AlltradeMark,spuImgResponse,SaleAttrResponse,SaleAttrListResponse} from "@/api/product/types";

enum API {
    GET_SPU_LIST = '/products/spu/getList/',
    GET_ALL_TRADEMARK = '/products/spu/getAllTrademarks',
    GET_ALLTM_IMGLIST = '/products/spu/ImageList/',
    GET_SPU_SALAE_ATTR = '/products/spu/getSaleAttr/',
    GET_SPU_ATTR_LIST = '/products/spu/getSpuAttrList/',
}

export const reqSpuList = (page:number|string,size:number|string,category3Id:number|string) =>
    request.get<any,spuResponse>(API.GET_SPU_LIST + `${page}/${size}/?category3Id=${category3Id}`);

export const reqGetAllTrademarks = () =>
    request.get<any,AlltradeMark>(API.GET_ALL_TRADEMARK);

export const reqTmImglist = (spuId:number|string) =>
    request.get<any,spuImgResponse>(API.GET_ALLTM_IMGLIST + spuId);

export const reqSaleAttr = (spuId:number|string) =>
    request.get<any,SaleAttrResponse>(API.GET_SPU_SALAE_ATTR + spuId);

export const reqSaleAttrList = (spuId:number|string) =>
    request.get<any,SaleAttrListResponse>(API.GET_SPU_ATTR_LIST + spuId);