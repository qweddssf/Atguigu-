import {ref} from 'vue'
import {CheckboxValueType, ElNotification} from 'element-plus'
import {reqRolesAndList,reqUpdateRole} from "@/api/config/userConfig";
import type {rolesResponse, rolesLoaderData, response} from "@/api/config/types";

export default function (getUserInfoList:Function){

    let drawer2 = ref<boolean>(false)


    let usn = ref<string>('')
    let roles = ref<string[]>([])
    const allocate = async (row) => {
        drawer2.value = true
        usn.value = row.username
        await getRolesInitData(row.id)
    }
    const checkAll = ref(false)
    const isIndeterminate = ref(true)
    let checkedRoles = ref([''])
    const handleCheckAllChange = (val: CheckboxValueType) => {
        checkedRoles.value = val ? roles.value : []
        isIndeterminate.value = false
    }
    const handleCheckedRolesChange = (value: CheckboxValueType[]) => {
        const checkedCount = value.length
        checkAll.value = checkedCount === roles.value.length
        isIndeterminate.value = checkedCount > 0 && checkedCount < roles.value.length
    }

    const checkBoxObj = {
        drawer2,
        usn,
        allocate,
        checkAll,
        isIndeterminate,
        checkedRoles,
        handleCheckAllChange,
        handleCheckedRolesChange,
        roles,
    }
    let userId = 0

    const getRolesInitData = async (id:number) => {
        let res:rolesResponse = await reqRolesAndList(id)
        if(res.code == 200) {
            userId = id
            roles.value = res.data.allRolesList.map(role => {
                return role.roleName
            })
            checkedRoles.value = res.data.assignRoles.map(role => {
                return role.roleName
            })
        }
    }

    const updateRole = async (data:rolesLoaderData) => {
        let res:response = await reqUpdateRole(data)
        if(res.code == 200) {
            ElNotification.success({
                type: 'success',
                title: res.message,
            })
            await getUserInfoList()
            drawer2.value = false

        }else{
            ElNotification.error({
                type: 'error',
                title: res.message,
            })
        }

    }
    const confirmRole = async () => {
        const data = {
            userId,
            roleIdList:checkedRoles.value.map((item) => {
                return roles.value.indexOf(item)
            })
        }
        await updateRole(data)
    }
    return {
        ...checkBoxObj,
        confirmRole,
    }

}