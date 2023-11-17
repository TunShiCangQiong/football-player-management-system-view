// 在这里注册你的业务页面
export default [
  {
    path: "/form",
    name: "Form",
    component: () => import(/* webpackChunkName: "form" */ "@/pages/form.vue"),
    meta: {},
  },
  {
    path: "/table",
    name: "Table",
    component: () =>
      import(/* webpackChunkName: "table" */ "@/pages/table.vue"),
    meta: {},
  },
  {
    path: "/theme",
    name: "Theme",
    component: () =>
      import(/* webpackChunkName: "theme" */ "@/pages/theme.vue"),
    meta: {},
  },
  {
    path: "/nested",
    name: "Nested",
    component: () =>
      import(/* webpackChunkName: "nested" */ "@/pages/nested/index.vue"),
    meta: {},
  },
  {
    path: "/nested/details",
    name: "NesteDetails",
    component: () =>
      import(/* webpackChunkName: "nested" */ "@/pages/nested/details.vue"),
    meta: {},
  },
];
