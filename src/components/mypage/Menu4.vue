<template>
    <div>
        <h3>주문목록</h3>
        <br />

        
        <table>
            <tr>

            </tr>
        </table>
        
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';

export default {
    setup () {
        const state = reactive({
            items :''
        });

        const handleData = async()=> {
            const url = ``;
            const headers = {};
            const response = await axios.get(url, {headers});
            console.log(response.data);
        };

        onMounted(()=> {
            handleData();
        });

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>