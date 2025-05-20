import type{userInfoResponse,userInfoItem} from "@/api/config/types";
import {reqSearchUserInfo} from "@/api/config/userConfig";
import {ElMessage} from "element-plus";
import {ref} from 'vue'

type searchParam = {
    page:number,
    size:number,
    total:number,
    userInfoList:userInfoItem[]
}

export default function (obj:searchParam){
    let searchKey = ref<string>('')
    const searchButton = async () => {
        const {page,size,userInfoList,total} = obj;
        let res:userInfoResponse = await reqSearchUserInfo(page.value,size.value,searchKey.value);
        if(res.code == 200){
            userInfoList.value = res.data.records;
            total.value = res.data.total;
            ElMessage({
                type:"success",
                message:res.message
            })
        }
    }
    const resetButton = () => {
        searchKey.value = ''
    }

    return {
        searchKey,
        resetButton,
        searchButton,
    }
}