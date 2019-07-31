import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'

export default[{
    path: '/about',
    component: About
},
    {
        path: '/home',
        component: Home,
        children: [{
            path: '/home/news',
            component: News
        }]
    },
    // {
    //     path: '/',
    //     redirect: '/about'
    // }
]
