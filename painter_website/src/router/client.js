const clientRouter = [
     {
        path: "/",
        component: resolve => require(['client/index'], resolve)
      },
      {
        path: "/",
        component: resolve => require(['client/common/Layout'], resolve),
        children: [
          { 
            path: "news",
            component: resolve => require(['client/news/NewsContent'], resolve),
          },
          {
            path: "news/detail",
            component: resolve => require(['client/news/NewsDetail'], resolve),
          },
          {
            path: "works",
            component: resolve => require(['client/works/WorksContent'], resolve)
          },
          {
            path: 'works/detail',
            component: resolve => require(['client/works/WorksDetail'], resolve)
          },
          {
            path: "/album",
            component: resolve => require(['client/album/AlbumContent'], resolve),
          },
          {
            path: "/contact",
            component: resolve => require(['client/contact'], resolve),
          },
          {
            path: "/profile",
            component: resolve => require(['client/profile'], resolve),
          }
        ]
      }
]

export default clientRouter