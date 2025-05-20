import request from '@/utils/request'
import type {skuResponseData} from "@/api/product/types";

enum API  {
    GET_SKU_LIST = '/products/sku/list/'
}

export const reqSkuList = (page:number|string,size:number|string) =>
    request.get<any,skuResponseData>(API.GET_SKU_LIST + `${page}/${size}`)