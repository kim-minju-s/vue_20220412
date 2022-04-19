<template>
    <div>
        <h3>이미지</h3>
        <br />
        {{state.imageUrl}} <br />
        {{state.imageFile}} <br />

        <hr />
        <input type="text" placeholder="제품명" v-model="state.iname" /> <br />
        <input type="text" placeholder="가격" v-model="state.iprice" /> <br />
        <img :src="state.imageUrl" style="width:100px" /> <br />
        <input type="file" @change="handleImage($event)" /> <br />

        <button @click="handleImgInsert"> 등록하기 </button>

        <hr />
        <h3> 이미지 여러개 선택 </h3>
        <div v-for="(tmp, idx) in 2" :key="tmp">
            <input type="text" placeholder="제품명" v-model="state.iname1[idx]" /> <br />
            <input type="text" placeholder="가격" v-model="state.iprice1[idx]" /> <br />
            <img :src="state.imageUrl1[idx]" style="width:100px" /> <br />
            <input type="file" @change="handleImage1($event, idx)" /> <br />

        </div>
        <button @click="handleImgInsert1"> 등록하기 </button>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';

export default {
    setup () {
        const state = reactive({
            iname: 'aaa',
            iprice: 123,
            imageUrl : require('../assets/logo.png'),
            imageFile : null,

            // 이미지 여러개 추가
            iname1: ['aaa1', 'aaa2'],
            iprice1: [123, 123],
            imageUrl1 : [require('../assets/logo.png'), require('../assets/logo.png')],
            imageFile1 : [null, null],
        });

        // 이미지 파일 선택
        const handleImage = (e) => {
            if (e.target.files[0]) {
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.imageFile = e.target.files[0];
            }
            else {
                state.imageUrl = require('../assets/logo.png');
                state.imageFile = null;
            }
        }

        const handleImage1 = (e, idx)=> {
            console.log(e);
            console.log(idx);
            
            if (e.target.files[0]) {
                state.imageUrl1[idx] = URL.createObjectURL(e.target.files[0]);
                state.imageFile1[idx] = e.target.files[0];
            }
            else {
                state.imageUrl1[idx] = require('../assets/logo.png');
                state.imageFile1[idx] = null;
            }
        }

        // 이미지 1개 추가 버튼
        const handleImgInsert = async()=> {
            const url = `/ROOT/api/product/insert.json`;
            const headers = {"Content-Type":"form-data"};
            const body = new FormData();
            body.append("name", state.iname);
            body.append("price", state.iprice);
            body.append("file", state.imageFile);

            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                // 
            }
        }

        const handleImgInsert1 = async()=> {
            const url = `/ROOT/api/product/insertbatch.json`;
            const headers = {"Content-Type":"Multipart/form-data"};
            const body = new FormData();
            for(let i=0;i<state.iname1.length;i++){
                body.append("name", state.iname1[i]);
                body.append("price", state.iprice1[i]);
                body.append("file", state.imageFile1[i]);

            }

            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                // 
            }
        }
    
        return {
            state, 
            handleImage, 
            handleImgInsert, 
            handleImage1,
            handleImgInsert1
        }
    }
}
</script>

<style lang="scss" scoped>

</style>