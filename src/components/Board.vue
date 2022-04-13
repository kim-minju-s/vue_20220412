<template>
    <div>
        <h3>Board</h3>
        <hr />
        <router-link to="/boardwrite">글쓰기</router-link>
        <div v-if="state.items">

            <table>
                <tr>
                    <th>글번호</th>
                    <th>글제목</th>
                    <th>글내용</th>
                    <th>조회수</th>
                    <th>등록일</th>
                </tr>
                <tr v-for="obj of state.items" :key="obj">
                    <td>{{obj.bno}}</td>
                    <td><a @click="handlePage(obj.bno)" style="cursor:pointer">{{obj.btitle}}</a></td>
                    <td>{{obj.bcontent}}</td>
                    <td>{{obj.bhit}}</td>
                    <td>{{obj.bregdate}}</td>
                </tr>

            </table>

        </div>

    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            page:1,
        });

        const handlePage = async(no)=> {
            // 조회수 증가
            const url = `/ROOT/api/board/updatehit?bno=${no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.put(url, {}, {headers});
            console.log(response.data);

            // 상세 페이지로 이동
            router.push({ name:'BoardOne', query:{no:no} });
        }

        const handleData = async() => {
            const url = `/ROOT/api/board/selectlist?page=${state.page}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                state.items = response.data.result;
            }
        };


        onMounted(()=> {
            handleData();
        });

        return {state, handlePage}
    }
}
</script>

<style lang="scss" scoped>

</style>