import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "./../store.js"; // Redux state 변경 함수 import 후 useDispatch() 라는 훅 사용하고 진행


// Redux 를 사용하면 컴포넌트들이 props 없이 state 공유가 가능함 좋음
// 단, 컴포넌트간 state 공유가 필요 없으면 그냥 Redux 에 보관하지 않고
// 사용하고자 하는 컴포넌트에서 useState() 사용하는게 더 편할 듯
function Cart() {

    // store.js 에서 만든 Redux store 를 가져와서 사용하는 방법
    // useSelector( (state) => { return state }); => Redux store 에 있던 object 자료 state 가 남음
    let a = useSelector( (state) => { return state } );

    let c = useSelector( (state) => { return state } );
    // console.log(c.basket);

	let dispatch = useDispatch(); // store.js 로 요청을 하는 함수

    return (
        <div>

			{/* 최종적으로 변경 버튼을 누를시 dispatch() 를 사용하여 stroe.js 에서 만든 state 를 변경하는 작업을 해보았음.
				Redux 를 이용하여 state 변경 하는 과정이 다소 복잡할 수 있지만,
				서비스의 규모가 커질수록 버그 같은 것을 방지할 수 있어서 좋은 방법임 */}
			{a.user} 의 장바구니

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
											dispatch(changeName()); 
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