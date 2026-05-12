import { defineStore } from "pinia";
import {ref} from "vue";

function initState(){
    return {
        isCollapse: false
    }
}
export const useAllDataStore = defineStore("allData", () => {
    const state = ref(initState());
    return {   
        state,
    };
})

// 组合式写法（练手）
// export const useAllDataStore = defineStore("allData", () => {
//     const isCollapse = ref(false);
//     return {
//         isCollapse
//     }
// })