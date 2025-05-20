import {defineStore} from 'pinia'

let layoutStore = defineStore('layout', {
    state:():any=>{
        return {
            flod:true,
            refsh:true,
        }
    }
})

export default layoutStore