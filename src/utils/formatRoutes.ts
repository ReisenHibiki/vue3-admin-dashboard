interface RouteItem {
  path: string
  name?: string
  label?: string
  component?: any
  children?: RouteItem[]
  meta?: Record<string, any>
  [key: string]: any
}

// 格式化路由数据，添加meta.label属性
export function formatRoutes(routes: RouteItem[]): RouteItem[] {
  return routes.map(({ label, children, ...rest }) => {
    const route: RouteItem = {
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