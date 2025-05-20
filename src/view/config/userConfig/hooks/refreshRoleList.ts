import type {userInfoResponse} from "@/api/config/types";
import {reqUserInfoConfigList} from "@/api/config/userConfig";
import {ref} from "vue";
import type{userInfoItem} from "@/api/config/types";

export default function (){


    let page = ref<number>(1)
    let size = ref<number>(5)
    let total= ref<number>(100)
    let userInfoList = ref<userInfoItem[]>([]);
    const variableObj = {
        userInfoList,
        page,
        size,
        total,
    }

    const getUserInfoList = async () => {
        let res:userInfoResponse = await reqUserInfoConfigList(page.value, size.value);
        if(res.code == 200){
            userInfoList.value = res.data.records;
            total.value = res.data.total
            page.value = res.data.current;
            size.value = res.data.size;
        }else{
            userInfoList.value = []
        }
    }

    const changePage = async (p: number,s:number) => {
        page.value = p;
        size.value = s;
        await getUserInfoList()
    }

    return {
        ...variableObj,
        changePage,
        getUserInfoList,
    }
}