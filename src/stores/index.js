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
        menuList: [],
        token: "",
        routerList:[]
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
    function updateMenu(item){
        let index = state.value.tags.findIndex(tag => tag.name === item.name);
        state.value.tags.splice(index,1);
    }
    // 登录页根据不同用户更新不同的菜单列表
    function updateMenuList(val){
        state.value.menuList = val;
    }
    // 动态路由
    function addMenu(router){
        const menu = state.value.menuList;
        const modules = import.meta.glob("../views/**/**.vue");
        const routeArr = [];
        menu.forEach(item => {
            if(item.children){
                item.children.forEach(child => {
                    let url = `../views/${child.url}.vue`;
                    child.component = modules[url];
                    routeArr.push(...item.children);
                });
            } else {
                let url = `../views/${item.url}.vue`;
                item.component = modules[url];
                routeArr.push(item);
            }
        })
        routeArr.forEach(item => {
            // push保存了“删除路由的方法”
            state.value.routerList.push(router.addRoute("main",item));
        })
    }

    return {   
        state,
        selectMenu,
        updateMenu,
        updateMenuList,
        addMenu
    };

})