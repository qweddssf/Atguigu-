import request from "@/utils/request";
import type {categoryListResponse,attrResponseData,attrItem,ResponseData} from "@/api/product/types";

enum API {
    // get c1 url
    C1_URL = 'products/attr/getCategory1',
    // get c2 url
    C2_URL = 'products/attr/getCategory2/',
    // get c3 url
    C3_URL = 'products/attr/getCategory3/',
    ATTR_URL = '/products/attr/InfoList/',
    ATTR_UPDATE_ADD = 'products/attr/saveInfo',
    DELETE_ATTR = 'products/attr/deleteInfo/',
}
export const reqC1 = () => request.get<any,categoryListResponse>(API.C1_URL);
export const reqC2 = (category1id:number|string) => request.get<any,any>(API.C2_URL+ category1id);
export const reqC3 = (category2id:number|string) => request.get<any,any>(API.C3_URL+ category2id);
export const reqAttrInfoList = (category1id:number|string,category2id:number|string,category3id:number|string) => {
    return request.get<any,attrResponseData>(API.ATTR_URL+ `${category1id}/${category2id}/${category3id}`);
}
export const attrAdd_Update = (data:attrItem) => request.post<any,ResponseData>(API.ATTR_UPDATE_ADD, data);
export const deleteAttr = (id:number) => request.delete<any,ResponseData>(API.DELETE_ATTR + id);