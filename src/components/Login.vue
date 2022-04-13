<template>
    <div>
        <h3>로그인</h3>
        <br />

        아이디: <input type="text" v-model="state.uemail" /> <br />
        암호: <input type="text" v-model="state.upw" /> <br />
        <button @click="handleLogin">로그인</button>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import {useRouter} from 'vue-router';

export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            uemail : '',
            upw : ''
        });

        const handleLogin = async()=> {
            const url = `/ROOT/api/customer/login`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                uemail : state.uemail,
                upw : state.upw
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                alert(JSON.stringify(state.uemail) +'님 환영');
                sessionStorage.setItem("TOKEN", response.data.token);
                router.push({name:'Home'});
            }
        }

        return {state, handleLogin}
    }
}
</script>

<style lang="scss" scoped>

</style>