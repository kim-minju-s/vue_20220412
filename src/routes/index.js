import { createWebHashHistory, createRouter } from "vue-router";

import Home from '@/components/Home.vue'; //메인 컴포넌트 호출
import About from '@/components/About.vue';
import Board from '@/components/Board.vue';
import BoardWrite from '@/components/BoardWrite.vue';
import BoardOne from '@/components/BoardOne.vue';
import Mqtt from '@/components/Mqtt.vue';
import Join from '@/components/Join.vue';
import Login from '@/components/Login.vue';
import Mypage from '@/components/Mypage.vue';
import Buy from '@/components/Buy.vue';
import Product from '@/components/Product.vue';


const routes = [
    { path:'/', name:"Home", component:Home },
    { path:'/about', name:"About", component:About },
    { path:'/board', name:"Board", component:Board },
    { path:'/boardwrite', name:"BoardWrite", component:BoardWrite },
    { path:'/boardone', name:"BoardOne", component:BoardOne },
    { path:'/mqtt', name:"Mqtt", component:Mqtt },
    { path:'/join', name:"Join", component:Join },
    { path:'/login', name:"Login", component:Login },
    { path:'/mypage', name:"Mypage", component:Mypage },
    { path:'/buy', name:"Buy", component:Buy },
    { path:'/product', name:"Product", component:Product },
];
  
const router = createRouter({
    history : createWebHashHistory(),
    routes : routes,
});
  
export default router;