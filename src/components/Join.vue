<template>
    <div>
        <h3>회원가입</h3>
        <br />
        이메일: <input type="text" v-model="state.uemail" /> <br />
        암호: <input type="text" v-model="state.upw" /> <br />
        이름: <input type="text" v-model="state.uname" /> <br />
        연락처: <input type="text" v-model="state.uphone" /> <br />
        <button @click="handleJoin">회원가입</button>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            uemail: '',
            upw: '',
            uname: '',
            uphone: ''
        });

        const handleJoin = async()=> {
            const url = `/ROOT/api/customer/join`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                uemail : state.uemail,
                upw : state.upw,
                uname : state.uname,
                uphone : state.uphone
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                alert('회원가입 완료');
                router.push({name:'Login'});
            }
        }

        return {state, handleJoin}
    }
}
</script>

<style lang="scss" scoped>

</style>