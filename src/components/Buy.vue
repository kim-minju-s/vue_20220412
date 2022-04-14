<template>
    <div>
        <h3>주문하기</h3>

        주문할 물품명: <input type="text" v-model="state.itemno" /> <br />
        주문 수량 : <input type="text" v-model="state.buycnt" /> <br />

        <button @click="handleBuy">주문하기</button>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import { onMounted } from '@vue/runtime-core';
import mqtt from 'mqtt';

export default {
    setup () {
        const state = reactive({
            itemno : 26,
            buycnt : 10,

            token : sessionStorage.getItem("TOKEN"),

            message : '',   // 보낼 메세지
            client : '',    // 접속한 클라이언트 객체

            host : '1.234.5.158',   // 서버주소
            port : 11884,    //web용 포트번호

            options : {
                clean : true,   // 세션 초기화
                reconnectPeriod: 20000,  // 주기적인 접속 시간

                // 고유한 값
                clientId : 'd206_'+ new Date().getTime(),
                username : 'ds606', // 아이디
                password : 'ds606', // 암호
            },

            topic : 'ds/class606/#',
            qos : 0  // 0 부터 2까지의 숫자
        });

        // 1. 서버연결
        const createConnection = ()=> {
            
            const url = `ws://${state.host}:${state.port}`;
            try {
                state.client = mqtt.connect(url, state.options);
                console.log(state.client);

                state.client.on('connect', ()=> {
                    console.log('connect success!!');
                });

                state.client.on('error', ()=> {
                    console.log('connect error!!');
                });

                // 메세지 받기
                state.client.on('message', (topic, message) => {
                    console.log(topic, JSON.parse(message));
                });

            } catch (e) {
                console.log('mqtt error', e);
            }
            
        };

        // 4. 메세지 보내기
        const sendMessage = ()=> {
            // json object => String : JSON.stringify()
            // string => json object : JSON.parse()
            const payload = JSON.stringify({ 
                msg: state.message,
                userid : 'd206' 
            });

            // 보낼 토픽, 보내는 내용(문자), QOS(0~2)
            state.client.publish('ds/class606/d206', payload, 0, error => {
                if (error) {
                    console.log('publish error', error);
                    return;
                }
            });
        }

        const handleBuy = async()=> {
            const url = `/ROOT/api/buy/insert2`;
            const headers = {
                "Content-Type":"application/json",
                "token": state.token
            };
            const body = {
                cnt : state.buycnt,
                item : {
                    icode : state.itemno
                }
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                console.log('주문 성공');
                // 신호 전송
                sendMessage();
            }
        }

        onMounted(()=> {
            createConnection();
        });

        return {state, handleBuy}
    }
}
</script>

<style lang="scss" scoped>

</style>