import {ref,onMounted} from "vue";
import {reqAllPermissions} from "@/api/config/menuConfig";
import type{PermissionResponse,PermissionNode} from "@/api/config/types";


export default function(){
    let permissionList = ref<PermissionNode[]>([]);
    onMounted(async () => {
        await initList()
    })
    const initList = async () => {
        let res:PermissionResponse = await reqAllPermissions()
        if(res.code == 200){
            permissionList.value = res.data
        }
    }
    return {
        permissionList,
        initList,
    }
}