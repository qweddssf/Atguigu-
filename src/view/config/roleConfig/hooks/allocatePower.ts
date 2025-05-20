import {ref} from 'vue'
import {getRolePermission,reqUpdatePermission} from "@/api/config/roleConfig";
import type {PermissionResponse, PermissionNode, response} from "@/api/config/types";
import {ElMessage, TreeInstance} from 'element-plus'

export default function (treeRef: TreeInstance) {

    let drawer2 = ref<boolean>(false)
    let roleId:number = -1
    const defaultProps = {
        children: 'children',
        label: 'name',
    }
    let checkedPermission = ref<number[]>([]);
    let data = <PermissionNode[]>ref([])

    const initData = async (id:number) => {
        roleId = id
        checkedPermission.value = []
        let res:PermissionResponse = await getRolePermission(id)
        if(res.code === 200) {
            data.value = res.data
            initChecked(data.value[0])
        }else{
            data.value = []
        }
    }

    function initChecked(node:PermissionNode){
        if(Object.keys(node).length == 0){
            return
        }
        if(node.select && node.level === 4){
            checkedPermission.value.push(node.id)
        }
        if(node.children && node.children.length > 0){
            for(let i=0;i<node.children.length;i++){
                initChecked(node.children[i])
            }
        }
    }

    const allocateButton = async (id:number) => {
        drawer2.value = true
        await initData(id)
    }

    const getCheckedKey = ():number[]  => {
        if(treeRef.value)
            return treeRef.value!.getCheckedKeys(false)
        else
            return []
    }

    const confirmButton = async () => {
        const permissionIds =  getCheckedKey()
        console.log('permissionIds:',permissionIds)
        let res:response = await reqUpdatePermission(roleId,permissionIds)
        console.log(res)
        if(res.code == 200) {
            ElMessage({
                type: 'success',
                message:res.message,
            })
            drawer2.value = false
            window.location.reload()
        }

    }

    return {
        drawer2,
        data,
        defaultProps,
        checkedPermission,
        getCheckedKey,
        allocateButton,
        confirmButton,
    }

}