import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRotateRight, faCircleCheck, faCircleChevronDown, faCircleChevronUp, faCirclePlus, faCircleXmark, faGear, faLock, faRightFromBracket, faTrashCan, faUserCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
import { plugin, defaultConfig } from '@formkit/vue'


import App from './App.vue';
import router from './router';

library.add(
    faArrowRotateRight,
    faCircleCheck, 
    faCircleChevronDown,
    faCircleChevronUp,
    faCirclePlus,
    faGear,
    faLock,
    faRightFromBracket,
    faTrashCan,
    // faUser,
    faUserCheck,
    faXmark,
    faCircleXmark
);

createApp(App)
    .use(router)
    .use(plugin, defaultConfig)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
