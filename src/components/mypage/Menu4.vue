<template>
    <div>
        <h3>주문목록</h3>
        <br />

        
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
export default {
    setup () {
        const state = reactive({
            items :''
        });

        const handleData = ()=> {
            console.log(state.items);
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