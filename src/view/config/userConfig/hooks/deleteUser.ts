import {reqDeleteUser,reqBatchRemove} from "@/api/config/userConfig";
import type{response} from "@/api/config/types";
import {ElMessage} from "element-plus";
import type {userInfoItem} from "@/api/config/types";

export default function (getUserInfoList:Function){

    const DeleteUserConfirm = async (userId:number) => {
        let res:response = await reqDeleteUser(userId)
        if(res.code == 200){
            ElMessage({
                type:"success",
                message:res.message,
            })
            getUserInfoList()
        }
    }
    let idList:number[] = []

    const confirmBatchRemove = async () => {
        let res:response = await reqBatchRemove(idList)
        if(res.code == 200){
            ElMessage({
                type:"success",
                message:res.message,
            })
            getUserInfoList()
        }
    }
    const getListId = (infoList:userInfoItem[]) => {
        idList = infoList.map((item:userInfoItem) => {
            return item.id
        })

    }

    return {
        DeleteUserConfirm,
        getListId,
        confirmBatchRemove,
    }
}