// 格式化路由数据，添加meta.label属性
export function formatRoutes(routes) {
  return routes.map(({ label, children, ...rest }) => {
    const route = {
      ...rest,
      meta: {
        ...(rest.meta || {}),
        label
      }
    }

    if (children?.length) {
      route.children = formatRoutes(children)
    }

    return route
  })
}