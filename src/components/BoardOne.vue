<template>
    <div>
        <h3>게시글 내용</h3>
        {{state.item}}
        <hr />
        <div v-if="state.item">
            글번호: {{state.item.bno}} <br />
            글제목: {{state.item.btitle}} <br />
            글내용: {{state.item.bcontent}} <br />
            조회수: {{state.item.bhit}} <br />
            등록일: {{state.item.bregdate}} <br />

        </div>
        <hr />
        <button>이전글</button>
        <button @click="handleNextPage">다음글</button>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            no : route.query.no
        });

        const handleData = async()=> {
            const url = `/ROOT/api/board/selectone?bno=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                state.item = response.data.result;
            }
        };

        const handleNextPage = async()=> {
            const url = `/ROOT/api/board/nextboard?no=${state.item.bno}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                const item1 = response.data.result;
                state.item.bno = item1.no;
                state.item.btitle = item1.title;
                state.item.bcontent = item1.content;
                state.item.bhit = item1.hit;
                state.item.bregdate = item1.regdate;
                router.push({name:'BoardOne', query:{no:item1.no}})
            }
        }

        onMounted(()=>{
            handleData();
        });
        

        return {state, handleNextPage}
    }
}
</script>

<style lang="scss" scoped>

</style>