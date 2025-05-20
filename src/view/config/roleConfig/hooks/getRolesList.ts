import {ref} from "vue";
import type {roleItem,rolesListResponse} from "@/api/config/types";
import {reqRoleNameInfo} from "@/api/config/roleConfig";
import {ElMessage} from "element-plus";

export default function () {
    let page = ref<number>(1)
    let size = ref<number>(5)
    let total= ref<number>(100)
    let rolesList = ref<roleItem[]>([])
    let searchKey = ref<string>('')
    const vab = {
        page,
        size,
        total,
        rolesList,
        searchKey,
    }
    const changePage = async (p: number,s:number) => {
        page.value = p
        size.value = s
        await getRolesList()
    }
    const searchButton = async () => {
        await getRolesList(searchKey.value)
    }
    const resetKey = () => {
        searchKey.value = ''
    }
    const getRolesList = async (roleName?:string) => {
        let res:rolesListResponse = await reqRoleNameInfo(page.value,size.value,roleName)
        if(res.code == 200){
            total.value = res.data.total
            size.value = res.data.size
            page.value = res.data.current
            rolesList.value = res.data.records
        }else{
            ElMessage({
                type: "error",
                message: res.message,
            })
        }
    }

    return {
        ...vab,
        getRolesList,
        changePage,
        resetKey,
        searchButton
    }
}