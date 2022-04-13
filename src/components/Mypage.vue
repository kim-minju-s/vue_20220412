<template>
    <div>
        <h3>마이페이지</h3>
        <br />
        <button @click="state.menu = 1">암호변경</button>
        <button @click="state.menu = 2">정보수정</button>
        <button @click="state.menu = 3">회원탈퇴</button>
        <button @click="state.menu = 4">주문목록</button>
        <hr />

        <menu-1 v-if="state.menu === 1"></menu-1>
        <menu-2 v-if="state.menu === 2"></menu-2>
        <menu-3 v-if="state.menu === 3"></menu-3>
        <menu-4 v-if="state.menu === 4"></menu-4>

    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';

import Menu1 from './mypage/Menu1.vue';
import Menu2 from './mypage/Menu2.vue';
import Menu3 from './mypage/Menu3.vue';
import Menu4 from './mypage/Menu4.vue';

export default {
    components:{
        Menu1, Menu2, Menu3, Menu4
    },
    setup () {
        const state = reactive({
            menu : 1
        });

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>