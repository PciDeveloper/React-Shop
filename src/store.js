
// 세팅 1. Redux 를 사용하려면 state 를 보관하는 통을 하나 만들어줘야함 store 라고 불리움
// 세팅 2. index.js 에 가서 <Provider store={store}></Provider> 작성
// Redux 를 사용하는 이유는 컴포넌트간 state 공유가 편함
import { configureStore, createSlice } from "@reduxjs/toolkit";
// import user from './store/userSlice.js' // let user = createSlice 함수 분리해서 관리하였음 userSlice.js

// useState() 역할과 동일하다고 생각하면 됨
// name : 'state 이름',
// initialState : 'state 값'
// 이제 이 state 를 만들었으면 하단에 등록해야 사용 가능 (중요함)
let user = createSlice({
    name : 'user',
    initialState : { name : 'kim', age : 20 },
    // Redux 의 state 를 변경하고 싶을 때는
    // 1. state 를 수정해주는 함수를 만들고(함수명은 알기 쉽게 작명),
    // 2. 만든 함수 changeName() 을 export 해야함
    reducers : {
        // 1. state 를 변경해주는 함수 만들기
        // state 라고 명시한 파라미터는 initialState : 'kim' 에 있는 기존의 값 ('kim')
        changeName(state) {
            // 변경 버튼을 누르면 name 이 park 으로 변경이 가능 2가지 방법이 있음
            // return { name : 'park', age : 30 };
            state.name = 'park'; // state 의 name 을 park 으로 변경해주세요
        },
        // increase 라고 작명한 함수를 만듬. 버튼을 클릭시 나이 + 1 증가 기능을 구현하기 위해
        // 함수 만든 후 36라인 export 부분에 이어서 추가
        // action 이라고 작명한(관례) 파라미터를 뚫어놓으면 나중에 호출해서 사용할 때 직접 값을 넣어서 사용할 수 있음
        // state 변경 함수는 관례상 action 이라고 함
        // 사용할 때는 action.payload 이렇게 사용하고 호출 할 때는 dispatch(increase(100)) 이런식으로 사용하면 됨
        // 이런식으로 파라미터를 뚫어놓으면 비슷한 함수 여러개 필요 없음
        increase(state, action) {
            state.age += action.payload;
        }
    }
});

// 상품 재고 state
// state 하나를 slice 라고 함
// 간단한 프로젝트는 props 전송하는게 코드가 훨씬 더 간결함, 컴포넌트들이 많아진다면 redux 를 사용하는게 나음
let cart = createSlice({
    name : 'cart',
    initialState : [
        { id : 1, name : 'White and Black', count : 50 },
        { id : 2, name : 'Grey Yordan', count : 100 }
    ],
    // Redux 의 state 를 변경하고 싶을 때는
    // 1. state 를 수정해주는 함수를 만들고(함수명은 알기 쉽게 작명),
    // 2. 만든 함수 changeName() 을 export 해야함
    reducers : {
        // 1. state 를 변경해주는 함수 만들기
        // state 라고 명시한 파라미터는 initialState : 'kim' 에 있는 기존의 값 ('kim')
        // addCount 라고 작명한 함수를 만듬. 버튼을 클릭시 기능을 구현하기 위해
        // 함수 만든 후 36라인 export 부분에 추가
        addCount(state, action) {
            // payload 에는 Cart.js 에서 넘겨받은 상품 id 가 담겨있음
            // 상품 array 에 있는 id 와 Cart.js 에서 넘겨받은 상품 id 가 같은 상품이면 수량 ++
            // 파라미터 a 는 state 에 있는 array 데이터
            let idx = state.findIndex( (a) => { return a.id === action.payload });
            state[idx].count++;
        },
        addItem(state, action) { // detail 에서 주문하기를 눌렀을 때
            state.push(action.payload);
        }
    }
});

// 만든 함수 changeName() 을 export 하려면
// state 보관함인 변수 이름 user.actions
// export 하고 싶은 함수명들 이어서 작성 가능함 export let { changeName, 함수1, 함수2 } 이런식
// 2. 사용하고자 하는 페이지에서 export 한 함수를 import 해서 사용하면 됨
export let { changeName, increase } = user.actions
export let { addCount, addItem } = cart.actions

// 여기에 등록하여야 사용 가능함
// 작명 : user.reducer => 작명이 귀찮으면 오른쪽에 state 이름이랑 동일하게 하고
// user.reducer => 여기서의 user 는 state name 에서 지정한 이름
export default configureStore({ // 이 코드 복붙하고 시작
    reducer : {
        user : user.reducer,
        cart : cart.reducer
    }
});