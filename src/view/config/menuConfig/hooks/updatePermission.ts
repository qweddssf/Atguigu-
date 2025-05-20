import {ref} from 'vue'
import type {PermissionNode, menuPostData, response} from "@/api/config/types";
import {reqUpdateMenu,reqDeleteMenu} from "@/api/config/menuConfig";
import {ElMessage} from "element-plus";

export default function (initList:Function,formRef) {
    let name =ref<string>()
    let code =ref<string>()
    let level = 0
    let id:string|number = ''
    let pid:number = 0
    let dialogVisible = ref<boolean>(false);
    const rules = {
    }
    const variableObj = {name,code,dialogVisible,rules};

    const addNameCode =  (row:PermissionNode) => {
        if(formRef.value){
            formRef.value.clearValidate('name');
            formRef.value.clearValidate('code');
        }
        name.value = ''
        code.value = ''
        id = ''
        dialogVisible.value = true;
        level = row.level + 1;
        pid = row.pid;
        // dialogVisible.value = false;
    }

    const editNameCode =  (row:PermissionNode) => {
        if(formRef.value){
            formRef.value.clearValidate('name');
            formRef.value.clearValidate('code');
        }
        name.value = row.name
        code.value = row.code
        id = row.id;
        pid = row.id;
        level = row.level;
        dialogVisible.value = true;
    }

    const cancelDialog = ()=>{
        dialogVisible.value = false;
    }

    const confirmDialog = async ()=>{
        let data:menuPostData = {}
        data.code = code.value
        data.name = name.value
        data.level = level
        data.pid = pid
        data.id = id
        let res:response = await reqUpdateMenu(data)
        if(res.code == 200){
            ElMessage({
                type:"success",
                message:res.message,
            })
            initList()
        }
        dialogVisible.value = false;

    }

    const deleteMenu = async (id:number)=>{

        let res:response = await reqDeleteMenu(id)
        if(res.code == 200){
            ElMessage({
                type:"success",
                message:res.message,
            })
            initList()
        }else {
            ElMessage({
                type:"error",
                message:res.message,
            })
        }
    }
    return{
        ...variableObj,
        addNameCode,
        editNameCode,
        confirmDialog,
        cancelDialog,
        deleteMenu,
    }
}