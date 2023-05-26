
// 세팅 1. Redux 를 사용하려면 state 를 보관하는 통을 하나 만들어줘야함 store 라고 불리움
// 세팅 2. index.js 에 가서 <Provider store={store}></Provider> 작성
// Redux 를 사용하는 이유는 컴포넌트간 state 공유가 편함
import { configureStore, createSlice } from "@reduxjs/toolkit";


// useState() 역할과 동일하다고 생각하면 됨
// name : 'state 이름',
// initialState : 'state 값'
// 이제 이 state 를 만들었으면 하단에 등록해야 사용 가능 (중요함)
let user = createSlice({
    name : 'user',
    initialState : 'kim',
    // Redux 의 state 를 변경하고 싶을 때는
    // 1. state 를 수정해주는 함수를 만들고,
    // 2. 만든 함수 changeName() 을 export 해야함
    reducers : {
        // 1. state 를 변경해주는 함수 만들기
        // state 라고 명시한 파라미터는 initialState : 'kim' 에 있는 기존의 값 ('kim')
        changeName(state) {
            return 'john kim';
        }
    }
});

// 만든 함수 changeName() 을 export 하려면
// state 보관함인 변수 이름 user.actions
// export 하고 싶은 함수명들 이어서 작성 가능함 export let { changeName, 함수1, 함수2 } 이런식
// 2. 사용하고자 하는 페이지에서 export 한 함수를 import 해서 사용하면 됨
export let { changeName } = user.actions

let cart = createSlice({ // 상품 재고 state
    name : 'basket',
    initialState : [
        { id : 1, name : 'White and Black', count : 50 },
        { id : 2, name : 'Grey Yordan', count : 100 }
    ]
});

// 작명 : user.reducer => 작명이 귀찮으면 오른쪽에 state 이름이랑 동일하게 하고
// user.reducer => 여기서의 user 는 state name 에서 지정한 이름
export default configureStore({ // 이 코드 복붙하고 시작
    reducer : {
        user : user.reducer,
        cart : cart.reducer
    }
});