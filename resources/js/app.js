import TypeIt from "typeit";

window.axios    = require('axios');
window.moment   = require('moment');
window.Vue      = require('vue');

Object.defineProperty(Vue.prototype, 'axios',  { value: axios  });
Object.defineProperty(Vue.prototype, 'moment', { value: moment });

/**
    Vue
 */

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const app = new Vue({
    el: '#app',
});

/**
    TypeIt
 */

new TypeIt('#typeit', {loop: true})
    .type('2suc')
    .pause(500)
    .delete(4)
    .type('4sucres.org')
    .pause(2000)
    .delete()
    .type('lebunker.net')
    .pause(2000)
    .delete()
    .type('onche.')
    .options({speed: 400})
    .type('org')
    .pause(300)
    .options({speed: 100})
    .delete(3)
    .type('fr')
    .pause(600)
    .delete(2)
    .type('party')
    .pause(600)
    .delete()
    .type('onche.onche.party')
    .pause(1500)
    .delete()
    .type('avenoel.org')
    .pause(1500)
    .delete()
    .go();