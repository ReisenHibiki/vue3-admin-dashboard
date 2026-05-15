import { defineStore } from "pinia";
import {ref} from "vue";

function initState(){
    return {
        isCollapse: false,
        tags: [
        {
        path: "/home",
        label: "首页",
        name: "home",
        icon: "home"
        },
        ],
        CurrentMenu: null,
    }
}
export const useAllDataStore = defineStore("allData", () => {
    const state = ref(initState());

    // commontab组件的标签页功能
    function selectMenu(item){
        if(item.path === "home"){
            state.value.CurrentMenu = null;
        }else{
            let index = state.value.tags.findIndex(tag => tag.path === item.path);
            index === -1 ? state.value.tags.push(item) : "";
        }
    }
    return {   
        state,
        selectMenu
    };
})