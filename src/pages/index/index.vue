<style>
.nav {
    color: red;
}
</style>
<template>
    <div>
        <nav-bar :r-list="routeList" @show-side="refreshSide"></nav-bar>
        <side-bar :side-list="sideList"></side-bar>
        <keep-alive>
            <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
                <router-view :side-list="sideList"></router-view>
            </transition>
        </keep-alive>
        <!-- <transition name="vodal-fade">
            <div v-show="show" tabindex="-1" :style="style" :class="['vodal', className]" @keyup.esc="onEsc">
                <div class="vodal-mask" v-if="mask" @click="$emit('hide')" />
                <transition :name="`vodal-${animation}`">
                    <div class="vodal-dialog" v-show="show" :style="dialogStyle">
                        <span class="vodal-close" v-if="closeButton" @click="$emit('hide')" />
                        <slot></slot>
                    </div>
                </transition>
            </div>
        </transition> -->
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex';
import NavBar from './nav_bar.vue';
import SideBar from './side_bar.vue';

export default {
    props: ['appList'],
    data: function() {
        var item = this.getCurMenu();
        return {
            routeList: this.appList,
            sideList: item.children
        };
    },
    components: {
        NavBar,
        SideBar
    },
    watch: {
        '$route': function(to, from) {
            var item = this.getCurMenu();
            this.sideList = item.children;
        }
    },

    computed: mapGetters({
        menu: 'menuitems'
    }),

    methods: {
        getCurMenu: function() {
            let route = this.$route;
            let matched = route.matched
            let firstMenu = matched[1] || this.navList[0];
            const menu = this.appList

            for (let i = 0, l = menu.length; i < l; i++) {
                const item = menu[i]
                if (item.name === firstMenu.name) {
                    return item
                }
            }
        },
        refreshSide: function(list) {
            this.sideList = list;
        }
    }
}
</script>
