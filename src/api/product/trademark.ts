import request from "../../utils/request.ts";
import type {trademarkListResponse,tradeMarkItem,ResponseData} from './types.ts'

enum API {
    GET_TRADEMARK_LIST = '/products/trademark/getList/',
    ADD_TRADEMARK = '/products/trademark/addTM',
    UPDATE_TRADEMARK = '/products/trademark/updateTM',
    DELETE_TRADEMARK = '/products/trademark/deleteTM/',
}

export const getTrademarkList = (pageNo:number,pageSize:number) =>
    request.get<any,trademarkListResponse>(API.GET_TRADEMARK_LIST + `${pageNo}/${pageSize}`);

export const updateTrademark = (Item:tradeMarkItem) => {
    if(Item.id != -1){
        //添加商品
        return request.put<any,ResponseData>(API.UPDATE_TRADEMARK, Item);
    }else{
        return request.post<any,ResponseData>(API.ADD_TRADEMARK, Item);
    }
}
export const deleteTrademark = (id:number) => {
    return request.delete<any,ResponseData>(API.DELETE_TRADEMARK + `${id}`);
}
