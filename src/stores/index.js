import { defineStore } from "pinia";
import {ref, watch} from "vue";
import router from "@/router";
import { formatRoutes } from "@/utils/formatRoutes";

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

    watch(state, (newObj) => {
        if (!newObj.token) return;
        localStorage.setItem("store", JSON.stringify(newObj));
    }, { deep: true }
    );

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
    // 登录不同账号清理标签页数据
    function clearTags(){
        state.value.tags = [
            {
                path: "/home",
                label: "首页",
                name: "home",
                icon: "home"
            }
        ];
    }
    // 登录页根据不同用户更新不同的菜单列表
    function updateMenuList(val){
        state.value.menuList = val;
    }
    // 动态路由
    function addMenu(router, type){
        // 如果为刷新
        if(type === "refresh"){
            if(localStorage.getItem("store")){
                state.value = JSON.parse(localStorage.getItem("store"));
                state.value.routerList = [];
            } else {
                return;
            }
        }
            
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
        // 修复多账号登录时路由的问题
        state.value.routerList = [];
        let routes = router.getRoutes();
        routes.forEach(item => {
            if(item.name == "main" || item.name == "login"){
                return;
            }else{
                router.removeRoute(item.name);
            }
        })

        // 格式化路由数据，添加meta.label属性
        const formattedRoutes = formatRoutes(routeArr);

        formattedRoutes.forEach(item => {
            // push保存了“删除路由的方法”在routerList,方便下面的clean函数调用
            state.value.routerList.push(router.addRoute("main",item));
        })
    }
    
    function clean(){
        state.value.routerList.forEach(item => {
            // 每个删除路由方法都执行一遍
            if(item){
                item();
            }
            //重置state的数据
            state.value=initState();
            localStorage.removeItem('store')          
        });
    }

    return {   
        state,
        selectMenu,
        updateMenu,
        updateMenuList,
        addMenu,
        clearTags,
        clean
    };

})