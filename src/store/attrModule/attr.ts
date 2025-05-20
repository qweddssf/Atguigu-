import  {defineStore} from "pinia";
import {reqC1,reqC2,reqC3} from "@/api/product/att";
import type {categoryObj,categoryLis1tResponse} from "@/api/product/types";
interface categoryState {
    c1Array: Array<categoryObj>;
    c2Arr: Array<categoryObj>,
    c3Arr: Array<categoryObj>,
    c1Id: string | number;
    c2Id: string | number;
    c3Id: string | number;
}
let cateGoryStore = defineStore('categoryStore', {
    state: ():categoryState => {
        return {
            c1Arr: Array<categoryObj>,
            c2Arr: Array<categoryObj>,
            c3Arr: Array<categoryObj>,
            c1Id:'',
            c2Id:'',
            c3Id:''
        }
    },
    actions: {
         async getC1(){
             let res:categoryLis1tResponse = await reqC1()
             if(res.code == 200){
                 this.c1Arr = res.data
                 return 'success'
             }else{
                 return Promise.reject(new Error('1获取失败'))
             }
         },
         async getC2(id:number){
             let res:categoryLis1tResponse = await reqC2(id)
             if(res.code == 200){
                 this.c2Arr = res.data
                 return 'success'
             }else{
                 return Promise.reject(new Error('2获取失败'))
             }
         },
        async getC3(id:number){
            let res:categoryLis1tResponse = await reqC3(id)
            if(res.code == 200){
                this.c3Arr = res.data
                return 'success'
            }else{
                return Promise.reject(new Error('3获取失败'))
            }

        }
    }
})

export default cateGoryStore;