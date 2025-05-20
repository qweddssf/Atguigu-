import {ref} from 'vue'
import type{roleItem,response} from "@/api/config/types";
import {reqCreateUpdateRole,reqDeleteRole} from "@/api/config/roleConfig";
import {ElMessage} from "element-plus";

export default function (formRef,getRolesList:Function) {
    let dialogVisible = ref(false);
    let tmpRoleName = ref<string>('');
    let id = ref<string|number>('');
    const rules = {
        roleName: {
            required: true,trigger:'blur'
        }
    }
    const addRoleName = () => {
        dialogVisible.value = true;
        tmpRoleName.value = '';
        if(formRef.value){
            formRef.value.clearValidate('roleName');
        }
    }
    const confirmRoleName = async () => {
        dialogVisible.value = false;
        let res:response = await reqCreateUpdateRole({roleName: tmpRoleName.value,id:id.value});
        if(res.code === 200){
            ElMessage({
                type: 'success',
                message: res.message,
            })
            id.value = ''
            getRolesList()
        }else{
            ElMessage({
                type:'error',
                message: res.message,
            })
        }
    }

    const cancelRoleName = () => {
        dialogVisible.value = false;
    }

    const editRoleName = (row:roleItem) => {
        if(formRef.value){
            formRef.value.clearValidate('roleName');
        }
        dialogVisible.value = true;
        tmpRoleName.value = row.roleName;
        id.value = row.id;
    }

    const deleteRole = async (id:number) => {
        let res:response = await reqDeleteRole(id);
        if(res.code == 200){
            ElMessage({
                type: 'success',
                message: res.message,
            })
            getRolesList()
        }else {
            ElMessage({
                type:'error',
                message: res.message,
            })
        }
    }
    return {
        rules,
        dialogVisible,
        tmpRoleName,
        addRoleName,
        editRoleName,
        confirmRoleName,
        cancelRoleName,
        deleteRole,
    }
}