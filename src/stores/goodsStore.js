import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGoodsStore = defineStore('goods', () => {
  // 商品列表（存在Pinia里）
  const goodsList = ref([
    { id: 1, name: '无线蓝牙耳机', price: 99, stock: 200, desc: '高清音质超长续航' },
    { id: 2, name: '机械键盘', price: 129, stock: 150, desc: '电竞游戏专用' },
    { id: 3, name: '快充数据线', price: 29, stock: 500, desc: '兼容安卓苹果' },
    { id: 4, name: '电竞鼠标', price: 89, stock: 320, desc: '炫酷灯光手感舒适' },
    { id: 5, name: '桌面小台灯', price: 45, stock: 180, desc: '护眼宿舍学习' },
    { id: 6, name: '运动手环', price: 159, stock: 90, desc: '心率监测计步' }
  ])

  // 新增商品
  const addGoods = (goods) => {
    goods.id = Date.now()
    goodsList.value.unshift(goods)
  }

  // 编辑商品
  const updateGoods = (goods) => {
    const index = goodsList.value.findIndex(item => item.id === goods.id)
    goodsList.value[index] = { ...goods }
  }

  // 删除商品
  const deleteGoods = (id) => {
    goodsList.value = goodsList.value.filter(item => item.id !== id)
  }

  return {
    goodsList,
    addGoods,
    updateGoods,
    deleteGoods
  }
})