import CateView from './components/CateView.vue'
import Index from './components/Index.vue'
import Issues from './components/Issues.vue'

const langs = ['zh', 'en']

const genRouteMap = (routeMap, lang, isChild) =>
  routeMap.reduce((res, item) => {
    const route = {
      path: isChild ? item.path : `/${lang}/${item.path}`,
      name: item.name[lang],
      component:
        typeof item.component === 'string'
          ? () => import(`./md/${lang}/${item.component}.md`)
          : item.component,
      meta: Object.assign({ lang }, item.meta),
      children: genRouteMap(item.children || [], lang, true)
    }
    res.push(route)
    return res
  }, [])

const routeMap = [
  {
    // 首页
    path: 'index',
    name: {
      zh: '文档',
      en: 'Documentation'
    },
    component: 'index',
    meta: {
      hidden: true
    }
  },
  {
    // 开始
    path: 'start',
    component: CateView,
    name: {
      zh: '开始',
      en: 'Get Start'
    },
    children: [
      {
        path: 'installation',
        component: 'start-installation',
        name: {
          zh: '安装',
          en: 'Installation'
        }
      },
      {
        path: 'usage',
        component: 'start-usage',
        name: {
          zh: '快速上手',
          en: 'Usage'
        }
      },
      {
        path: 'base',
        component: 'start-base',
        name: {
          zh: '基础',
          en: 'Base'
        }
      }
    ]
  },
  {
    path: 'CesiumViewer',
    name: {
      zh: '场景',
      en: 'Viewer'
    },
    component: CateView,
    children: [
      {
        path: 'cesium-viewer',
        component: 'cesium-viewer',
        name: {
          zh: '场景容器',
          en: 'CesiumViewer'
        }
      }
    ]
  },
  {
    path: 'layer',
    name: {
      zh: '图层',
      en: 'Layer'
    },
    component: CateView,
    children: [
      {
        path: 'arcgis-imagery-layer',
        component: 'arcgis-imagery-layer',
        name: {
          zh: 'ArcGIS影像服务图层',
          en: 'ArcGISImageryLayer'
        }
      },
      {
        path: 'supermap-imagery-layer',
        component: 'supermap-imagery-layer',
        name: {
          zh: 'SuperMap影像服务图层',
          en: 'SuperMapImageryLayer'
        }
      },
      {
        path: 'urltemplate-imagery-layer',
        component: 'urltemplate-imagery-layer',
        name: {
          zh: '通用模板影像图层',
          en: 'UrlTemplateImageryLayer'
        }
      },
      {
        path: 'tianditu-imagery-layer',
        component: 'tianditu-imagery-layer',
        name: {
          zh: '天地图服务图层',
          en: 'TiandituImageryLayer'
        }
      },
      {
        path: 'bingmaps-imagery-layer',
        component: 'bingmaps-imagery-layer',
        name: {
          zh: 'BingMaps影像服务图层',
          en: 'BingMapsImageryLayer'
        }
      },
      {
        path: 'singletile-imagery-layer',
        component: 'singletile-imagery-layer',
        name: {
          zh: '单文件影像图层',
          en: 'SingleTileImageryLayer'
        }
      }
    ]
  }
]

export default [
  {
    path: '/',
    component: Index
  },
  {
    path: '/issues',
    name: 'ISSUE',
    component: Issues,
    meta: {
      hidden: true
    }
  },
  ...langs.reduce((map, lang) => map.concat(genRouteMap(routeMap, lang)), [])
]
