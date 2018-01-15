import VueRouter from 'vue-router/dist/vue-router.min.js';
import foo from '../component/foo.component.js';
import bar from '../component/bar.component.js';

export default {
    router: new VueRouter({
        routes: [
            { path: '/foo', component: foo },
            { path: '/bar', component: bar }
        ]
    })
}