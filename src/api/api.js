/**
 * 我在此处对整个项目api的统一管理
 */
import request from "./request";

export default {
    // 获取左侧表格数据
    getTableData() {
        return request({
            url: '/api/home/getTableData/',
            method: 'get',
        });
    },
};