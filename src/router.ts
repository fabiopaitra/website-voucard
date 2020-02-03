import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/HomePage.vue';
import SignUp from '@/views/SignUp/SignUp.vue';
import ConfirmEmail from '@/views/SignUp/ConfirmEmail/ConfirmEmail.vue';
import Registration from '@/views/SignUp/Registration/Registration.vue';
import ApprovalProcess from '@/views/ApprovalProcess/ApprovalProcess.vue';


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: { name: 'Home' },
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'O cartão que te leva a novos horizontes - Voucard',
        metaTags: [
          {
            name: 'description',
            content:
              'O cartão internacional com a menor taxa de IOF. Conheça a Voucard',
          },
        ],
      },
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      meta: {
        title: 'Comece a usar o Voucard',
        metaTags: [
          {
            name: 'description',
            content:
              'Reduza seu tempo e investimento. Segurança, alta performance e dados em tempo real.',
          },
        ],
      },
    },
    {
      path: '/signup/confirm-email',
      name: 'ConfirmEmail',
      component: ConfirmEmail,
      meta: {
        title: 'Confirme seu e-mail',
        metaTags: [
          {
            name: 'description',
            content:
              'Reduza seu tempo e investimento. Segurança, alta performance e dados em tempo real.',
          },
        ],
      },
    },
    {
      path: '/signup/registration',
      name: 'Registration',
      component: Registration,
      meta: {
        title: 'Registre-se para utilizar Voucard',
        metaTags: [
          {
            name: 'description',
            content:
              'Reduza seu tempo e investimento. Segurança, alta performance e dados em tempo real.',
          },
        ],
      },
    },
    {
      path: '/approval-process',
      name: 'ApprovalProcess',
      component: ApprovalProcess,
      meta: {
        title: 'Approval Process',
        metaTags: [
          {
            name: 'description',
            content:
              'Approval Process',
          },
        ],
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
Vue.use(VueRouter);

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  /* tslint:disable */
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]'))
    .map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router;