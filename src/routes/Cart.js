import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "./../store/userSlice.js"; // Redux state 변경 함수 import 후 useDispatch() 라는 훅 사용하고 진행
import { addCount } from "./../store.js";
import { memo, useMemo, useState } from "react";

// 성능개선 2 => 자식 컴포넌트 재렌더링 막기
// memo => Child 컴포넌트가 꼭 필요할 때만 재렌더링 되게 하는 방법임
// memo 함수의 원리 => 특정 상황에서 (props가 변할 때만) 재렌더링을 시켜주는 원리
let Child = memo(function () {
    console.log('재렌더링됨');
    return <div>자식 컴포넌트임</div>
});

function 함수() {
    return
}


// Redux 를 사용하면 컴포넌트들이 props 없이 state 공유가 가능함 좋음
// 단, 컴포넌트간 state 공유가 필요 없으면 그냥 Redux 에 보관하지 않고
// 사용하고자 하는 컴포넌트에서 useState() 사용하는게 더 편할 듯
function Cart() {
    // useMemo => 컴포넌트 렌더링시 1회만 실행해줌
    // useMemo( () => { return 함수() }, []); => useMemo 또한 [] dependency 를 제공함
    // useMemo == useEffect 똑같은 원리이긴 한데
    // useEffect 는 html 동작 후 실행되지만,
    // useMemo 렌더링 될 때 같이 실행 됨
    // 결론은 실행 시점이 다를 뿐이지 기능은 유사함
    let result = useMemo( () => { return 함수() }, []);

    // Redux store 즉, store.js 에서 만든 state를 가져와서 사용하는 방법
    // useSelector( (state) => { return state }); => Redux store 에 있던 object 자료 state 가 남음
    // (state) => { return state } 이렇게 한 이유는 공식문서에 이렇게 사용하라고 나와있음
    // 현재는 store 에 2개의 state 가 있음 (user, cart) 그래서 그에 맞게 변수 두개 만들고 사용했음
    let a = useSelector( (state) => { return state } );
    let c = useSelector( (state) => { return state } );
    // console.log(a.user);
    // console.log(a.cart);

	// store.js 로 요청을 하는 함수
	let dispatch = useDispatch();

    let [count, setCount] = useState(0); // Cart 컴포넌트가 재렌더링 되는 상황 만들기

    return (
        <div>
            {/* Child 컴포넌트가 꼭 필요할 때만 재렌더링 되게 하는 방법은 memo */}
            <Child></Child>
            <button onClick={ () => { setCount(count + 1) } }>+</button>

			{/* 최종적으로 변경 버튼을 누를시 dispatch() 를 사용하여 stroe.js 에서 만든 state 를 변경하는 작업을 해보았음.
				Redux 를 이용하여 state 변경 하는 과정이 다소 복잡할 수 있지만,
				서비스의 규모가 커질수록 버그 같은 것을 방지할 수 있어서 좋은 방법임 */}
			<h6> { a.user.name } { a.user.age } 의 장바구니</h6>
            <button onClick={ () => { dispatch(increase(1)) } }>버튼</button>

            <Table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // store.js 에서 만든 array object 자료를 map 을 이용하여 데이터 출력
						// map 반복문에는 key 속성 값을 넣어으면 경고메세지 출력 방지할 수 있음
                        c.cart.map(function(a, i) { 
                            return (
                                <tr key={i}>
                                    <td>{c.cart[i].id}</td>
                                    <td>{c.cart[i].name}</td>
                                    <td>{c.cart[i].count}</td>
									<td>
										<button onClick={ () => {
											// 최종 결론 => 1. state 변경함수 만들기 => store.js 에 만들었음
											// 2. store.js 에서 만든 state 변경 함수를 export
											// 3. 변경 함수 만들어논 store.js 를 import 후
											// 4. let dispatch = useDispatch(); store.js 로 요청을 하는 함수를 만들고,
											// 5. 최종적으로 변수명 dispatch() 안에 state import 해온 변경 함수를 넣어주면 됨
                                            // dispatch(addCount(c.cart[i].id)); => 해당 상품의 고유 id 값의 버튼이 클릭되면,
                                            // store.js payload 에 id 값을 넘기고
											dispatch(addCount(c.cart[i].id));
										}}> + </button>
									</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;