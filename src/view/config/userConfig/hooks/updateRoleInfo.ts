import {ref,nextTick} from 'vue'
import type {createUserInfoResponse, response, userInfoItem} from "@/api/config/types";
import {ElNotification} from "element-plus";
import {reqCreateUserInfo, reqUpdateUserInfo} from "@/api/config/userConfig";
// import refreshRolesList from '@/view/config/userConfig/hooks/refreshRoleList'

export function formUpdate(formRef:Ref<any>,getUserInfoList:Function){
    // const {getUserInfoList} = refreshRolesList()
    let showDrawer = ref(false);
    let title = ref<string>("");
    let userInfoForm = ref<userInfoItem>({
        username: "",
        name:'',
        password:'',
    })
    const initUserForm = (obj) => {
      if(Object.keys(obj).length == 0){
        userInfoForm.value.username = ''
        userInfoForm.value.password = ''
        userInfoForm.value.name = ''
      }else{
        // 深度拷贝
        Object.assign(userInfoForm.value, obj);
      }
    }
    const addUserConfig = () => {
      title.value = '添加用户'
      initUserForm({})
      showDrawer.value = true
      nextTick(() => {
          formRef.value.clearValidate('name')
          formRef.value.clearValidate('password')
          formRef.value.clearValidate('username')
      }).then(()=>{})
    }
    const editUserConfig = (row) => {
        title.value = '编辑用户'
        const {name, password,username} = row
        initUserForm({name, password,username})
        userInfoForm.value.id = row.id
        showDrawer.value = true
    }
    const clickCancel = () => {
        showDrawer.value = false
    }
    const clickConfirm = async () => {
        let isValidate = false
        await formRef.value.validate().then(()=>{
            isValidate = true
        }).catch( (error)=> {
            ElNotification.error({
                type: 'error',
                title: error[Object.keys(error)[0]][0].message,
            })
        })
        if(!isValidate) return
        if(!userInfoForm.value.id) {
            let res: createUserInfoResponse = await reqCreateUserInfo(userInfoForm.value);
            if (res.code == 200) {
                ElNotification.success({
                    type: 'success',
                    title: res.message,
                })
                showDrawer.value = false
                await getUserInfoList()
            }
        }else{
            let res:response = await reqUpdateUserInfo(userInfoForm.value);
            console.log(res)
            if (res.code == 200) {
                ElNotification.success({
                    type: 'success',
                    title: res.message,
                })
                showDrawer.value = false
                await getUserInfoList()
                userInfoForm.value.id = ''
                window.location.reload()
            }
        }
    }

    // 表单校验
    const val_name = (rule, value, callback) => {
        if(value.trim().length == 0){
            callback(new Error('此项必填'))
            return
        }
        if(value.trim().length <= 7){
            callback()
        }else{
            callback(new Error('用户昵称不得超过7位'))
        }
    }
    const val_pasd = (rule, value, callback) => {
        if(value.trim().length == 0){
            callback(new Error('此项必填'))
            return
        }
        if(value.trim().length >= 6){
            callback()
        }else {
            callback(new Error('密码不得少于6位'))
        }
    }
    const val_usname = (rule, value, callback) => {
        if(value.trim().length == 0){
            callback(new Error('此项必填'))
            return
        }
        if(value.trim().length <= 7){
            callback()
        }else {
            callback(new Error('用户名大于7位'))
        }
    }
    const rules = {
        name: [{required: true,trigger:'blur',validator:val_name}],
        password: [{required:true,trigger:'blur',validator:val_pasd}],
        username: [{required:true,trigger:'blur',validator:val_usname}]
    }

    const variableObj = {
        showDrawer,
        title,
        userInfoForm,
        rules,
    }
    return {
        ...variableObj,
        editUserConfig,
        clickCancel,
        clickConfirm,
        addUserConfig
    }
}