import logo from './logo.svg';
import './App.css';
import { Navbar, Container, Nav, Form, Card } from 'react-bootstrap'  // 리액트 부트스트랩 라이브러리
import { lazy, Suspense, createContext, useEffect, useState, useTransition, useDeferredValue } from 'react';
// import 작명 from './data.js'; // data.js 에서 만든 변수 한개 import 방법
// import { a, b } from './data.js'; // data.js 에서 만든 변수 여러개 import 방법
import data from './data.js'; // data 라고 되어있는 변수는 자유롭게 작명하지만 export 하는 변수와 동일하게 작명하는 것이 인지하기 좋음
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

import axios from 'axios';
import { useQuery } from 'react-query';

// import Detail from './routes/Detail.js';
// import Cart from './routes/Cart.js';
// 메인 첫 페이지에서는 먼저 로드할 필요가 없으니 성능 개선을 위해서
// lazy() 하게 로딩 하라는 코드임 필요해질 때 import 해달라는 뜻
// 사이트 발행할 떄도 별도의 js 파일로 분리됨
// 단점 => detail, cart 페이지 이동시 로딩이 발생됨 => 이럴 때는 Suspense import 후 <Suspense></Suspense>로 감싸면 로딩중 UI 넣기 가능
const Detail = lazy( () => import('./routes/Detail.js'));
const Cart = lazy( () => import('./routes/Cart.js'));

export let Context1 = createContext(); // 세팅 1 => Context 를 하나 만들어줌 state 보관하는 역할, 가져다 쓰기 위한 export

// 성능개선 3 => useTransition 성능 향상을 해보기위해 성능 저하를 일으켜보는 중
let a = new Array(10000).fill(0)

function App() {

  // DB 저장 없이 웹브라우저 개발자모드 localStorage 에 저장하는 방법이 있는데
  // object 또는 array 자료형은 저장 못함. 이러한 자료들은 JSON 으로 변환 후 저장하면 가능함
  // let obj = { name : 'park' }
  // localStorage.setItem('data', JSON.stringify(obj)); // JSON.stringify => object 또는 array 자료형을 문자열로 변환
  // let 꺼낸거 = localStorage.getItem('data');
  
  // console.log(JSON.parse(꺼낸거)); // JSON.parse => 다시 object 또는 array 로 변환
  // console.log(꺼낸거);

  let [shoes, setShoes] = useState(data);

  // 10 => 0 번째 상품의 재고, 11 => 1 번째 상품의 재고, 12 => 2 번째 상품의 재고
  // Context API 사용하여 Detail, Tab 컴포넌트에서 사용하려고 만듬
  let [재고] = useState([10, 11, 12]);

  let navigate = useNavigate(); // 페이지 이동을 도와주는 함수. 훅의 일종
  let [loding, setLoding] = useState(false); // 로딩 상태를 저장하는 state

  // 서버에서 유저 이름 가져와서 보여주기
  // react-query로 ajax 요청하는 법
  // then 파라미터 a 에 유저 데이터 결과값 들어있음
  // 사용법 => useQuery('작명', () => {}
  // useQuery 장점 => 성공, 실패, 로딩중 쉽게 파악이 가능함
  // result.data => 요청에 성공했을 때 가져오는 데이터가 있음
  // result.isLoading => 요청중, 로딩중일 때 isLoading true 로 됨
  // result.error => 요청에 실패했을 때 error true
  // 장점 2 => 틈만나면 자동으로 실시간으로 refetch 해줌 (SNS, 코인거래소 등 유용함)
  // let result = useQuery('작명', () =>
  //   axios.get('https://codingapple1.github.io/userdata.json').then((response) => response.data)
  // );

  // 위의 코드에서 useQuery의 콜백 함수를 async 함수로 변경하고, 
  // await을 사용하여 비동기 작업을 처리하였음.
  // 이렇게 함으로써 데이터를 제대로 가져올 수 있었음
  let result = useQuery('작명', async () => {
    const response = await axios.get('https://codingapple1.github.io/userdata.json');
    console.log('요청완료')
    return response.data;
  });

  // 성능개선 3 => useTransition 성능개선 사용하기 위한 state
  // 성능 저하를 시키고있는 부분을 startTransition 으로 state 변경 감싸기 => 현재는 setName state 가 저하시키는 원인임
  // 관례상 startTransition(늦게처리) 라고 작명함.
  // isPending 은 startTransition 이 동작하고 있을 때 true 로 됨
  // 사용 예시 => 1. UI 요소를 부드럽게 전환하기 위해 사용됨 (사용자가 특정 버튼을 클릭했을 때 애니메이션 효과) 등
  // useDeferredValue 훅 또한 useTransition 와 동일한 기능을 하는 훅
  // useDeferredValue 에 성능 저하의 state 를 안에 넣어주고 그것을 담은 변수를 가지고 활용하면 됨
  let [name, setName] = useState('');
  let [isPending, 늦게처리] = useTransition();
  let state = useDeferredValue(name);

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">ELSI</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={ () => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={ () => { navigate('/cart') }}>Cart</Nav.Link>
          </Nav>

          <Nav className='ms-auto'>
            {/* 왼쪽이 true 이면 && 오른쪽 값 */}
            {/* 쌩 리액트는 우선 state 부터 만들었어야 했음 */}
            { result.data && result.data.name }
            { result.isLoading && '로딩중' }
            { result.error && '에러' }
          </Nav>

        </Container>
      </Navbar>

      {/* 라우터로 페이지 나누는 방법 */}
      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route path='/' element={
            <>
            {/* <div className='main-bg' style={ { backgroundImage : 'url(' + img + ')' } }></div> */}
            <div className='main-bg'></div>
          
            <div className="container">
              <div className="row">
                {/* process.env.PUBLIC_URL => public 폴더 이미지를 사용하는 권장 방식 */}
                {/* <img src={ process.env.PUBLIC_URL + '/shoes1.jpg' } width="80%" alt=''/> */}

                {
                  shoes.map(function(a, i) {
                    return (
                      // 하단에 Goods 컴포넌트 생성
                      // key 값을 넣으면 배열을 렌더링 할 때 성능을 최적화 하는데 도움을 줌
                      <Goods shoes={ shoes[i] } i={i} key={i} ></Goods>
                    )
                  })
                }
              </div>
            </div>

            <button onClick={ () => { // axios 터미널에서 라이브러리 설치 후 import

              setLoding(true); // 버튼을 누른 직후 로딩 UI 띄우기 위해 setLoding state 를 true 로 바꿔줌

              axios.get('https://codingapple1.github.io/shop/data2.json').then( (result) => { // 데이터 결과값은 result 에 있음
                console.log(result.data); // result 에서 data 만 출력
                console.log(shoes); // ajax 에서 받아온 데이터도 shoes 에 있는 데이터와 형식이 같음 [ { } ] array 안에 object 형식
                let copy = [...shoes, ...result.data]; // 복사본을 만들어서 shoes 데이터와 ajax 에서 받아온 result.data 괄호를 벗겨주고 카피본 생성
                setShoes(copy)
                setLoding(false); // 데이터 가져오기에 성공했을 때 setLoding state 를 false 로 바꾸어줌
              }).catch( () => { // 데이터 가져오기 실패했을 때 예외처리
                console.log('실패');
                setLoding(false); // 데이터 가져오기에 성공했을 때 setLoding state 를 false 로 바꾸어줌
              });

              // 더보기 버튼을 최초 누르면 첫번째 ajax 통신. 한번더 더보기 버튼을 누르면 두번째 ajax 통신 연습
              // axios.get('https://codingapple1.github.io/shop/data2.json')
              //   .then((result) => {
              //     console.log(result.data);
              //     console.log(shoes);
              //     let copy = [...shoes, ...result.data];
              //     setShoes(copy);
              //     return axios.get('https://codingapple1.github.io/shop/data3.json');
              //   })
              //   .then((result) => {
              //     console.log(result.data);
              //     console.log(shoes);
              //     let copy = [...shoes, ...result.data];
              //     setShoes(copy);
              //   })
              //   .catch(() => {
              //     console.log('실패');
              //   });

              // axios.post('asd', { name : 'park' }) // 서버로 데이터 전송하는 POST 요청하는 방법

              // Promise.all( [ axios.get('/url1'), axios.get('/url2') ]).then( () => { // 동시에 ajax 요청 여러개 하는 방법
              // });

              // 참고 !!! => 원래는 서버와 문자만 주고 받을 수 있음
              // let copy = [...shoes, ...result.data]; 방금 서버에서 array 데이터 온 것 같지만 
              // 이런식으로 object 자료에 "{ "name" : "park" }" 따옴표를 작성하면 array, object 도 주고 받기 가능함
              // 일명 문자 취급을 받는 JSON 이라고 함. 그래서 위의 데이터는 실제로는 JSON 데이터로 온거임
              // JSON 형태로 온 데이터를 axios 가 다시 array, object 로 자동으로 바꾸어줌

              // axios 라이브러리를 사용하지 않고도 fetch 라는 JS 기본 문법으로도 GET 요청 가능함.
              // fetch('https://codingapple1.github.io/shop/data2.json')
              // .then(result => result.json()) JSON => array, object 로 직접 변환 과정이 필요함
              // .then(data => {})
              // 결론 => axios 는 변환 과정 없이 JSON 형태로 온 데이터를 array, object 로 자동으로 바꾸어주어서 더 편리함

            }}>더보기
              {loding && <div>로딩 중...</div>}
            </button>

            {/* 성능개선 3 => useTransition 으로 느린 컴포넌트 성능을 향상시키는 방법 (카드 돌려막기) */}
            {/* 성능 저하를 일으키기위해 상단에 실험용 a 변수에 array 자료 만들어놨음 */}
            {/* input 에 타이핑을 할 때마다 그 name 값이 렌더링되는 중임 */}
            <input onChange={ (e) => { 
                // 성능 저하를 시키고있는 부분을 startTransition 함수로 state 변경 감싸기 => 현재는 setName state 가 저하시키는 원인임
                // 브라우저는 싱글스레드라서 동시 작업을 못함. 한번에 하나의 작업만 가능함
                // 그래서 useTransition 원리는 현재 성능 문제가 되는 setName 코드 시작을 뒤로 늦춰주는 원리
                늦게처리( () => {
                  setName(e.target.value)  
                });
              }} />
            {
              // isPending == true 이면 '로딩중' UI 보여주고 그게 아니면 반복문 보여줌
              // useDeferredValue 훅 또한 useTransition 와 동일한 기능을 하는 훅
              // useDeferredValue 에 성능 저하의 state 를 안에 넣어주고 그것을 담은 변수명(state)을 가지고 활용하면 됨
              isPending ? '로딩중' :
              a.map( () => {
                return <div>{name}</div> // 현재 {name} state 는 setName 즉 input 에 입력한 값을 name state 가 가지고있음
                // return <div>{state}</div>
              })
            }
            </>
          } />

          {/* Detail.js 파일을 따로 만들어서 컴포넌트 관리 후 import */}
          {/* Detail.js 에 만들어놓은 컴포넌트에서 props 를 사용하여 데이터 전송 받아서 사용하기 */}
          {/* /detail/:id => URL 파라미터 문법 */}
          {/* 세팅 2 => <Context1.Provider> 보관함.Provider로 state 공유를 원하는 컴포넌트 감싸기 */}
          {/* 세팅 3 => 공유를 원하는 state 항목을 Context1.Provider 에 value 추가 */}
          {/* 결론 => 현재 Detail.js 컴포넌트 안에 모든 컴포넌트는 value 에 작성한 state 를 자유롭게 사용 가능 */}
          <Route path='/detail/:id' element={
            <Context1.Provider value={ { shoes, 재고 } }>
              <Detail shoes={ shoes }/>
            </Context1.Provider>
          } />

          {/* Nested Routes => 태그 안에 태그가 들어간 Routes */}
          {/* 언제 사용하면 좋은지 => 유사한 관련 여러가지 페이지가 필요할 때 */}
          <Route path='/about' element={ <About /> } >
            <Route path='member' element={ <div> 직원들 </div> } />
            <Route path='location' element={ <div> 오시는 길 </div> } />
          </Route>

          <Route path='/event' element={ <Event /> } >
            <Route path='one' element={ <div> 첫 주문시 양배추즙 서비스 </div> } />
            <Route path='two' element={ <div> 생일 기념 쿠폰 받기 </div> } />
          </Route>

          {/* 지정된 경로 외에 다른 모든 페이지 접속시 404 Error */}
          <Route path='*' element={ <div>404 Error !!!</div> } />

          <Route path='/cart' element={ <Cart />} />
        </Routes>
      </Suspense>
    </div>
  );
}

// 컴포넌트 만드는 방법
// 1. function 만들기
// 2. return () 안에 html 담기
// 3. <함수명> </함수명> 쓰기
// html 병렬 기입하면 에러이므로 <> </> 프래그먼트 문법을 사용

// 컴포넌트를 사용하면 좋은 예 3가지
// 1. 반복적인 UI 를 사용하여야 할 때 사용
// 2. 자주 변경되는 UI 
// 3. 큰 페이지들 또한 컴포넌트 사용하는게 좋음

// 단점
// 1. state 를 가져다가 사용할 때 문제가 생김
// state 를 가져다 쓰려면 props 방식을 사용하면 됨
// 변수 선언을 const 로 하게되면 console 에 에러 메세지가 찍혀서 좋음
function Goods(props) {
  // let [modalTitle, setModalTitle] = useState(0); 여기에 선언해도 되지만 
  // state 가 App, Goods 등등 여러곳에서 필요하다면 가장 상위 부모 컴포넌트에 만드는게 좋음
  return (
    <div className="col-md-4" onClick={ () => window.location.href = '/detail/' + props.i }>
    {/* 기존 이미지 URL  => https://codingapple1.github.io/shop/shoes1 ,2, 3 */}
    {/* i 라는 이름으로 1,2,3 전송해서 URL 파라미터로 숫자를 넘겨서 이미지를 보여주는 방법 (함수 파라미터 문법) */}
    <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="80%" alt=''/> 
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }</p>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>회사 소개</h4>
      {/* Outlet 은 <Route path='member' element={ <div> 직원들 </div> } /> 안에 있는 element 를 보여줄 자리를 뜻함 */}
      {/* 쉽게 말해서 /about/member를 접속하면 /event html <h4>회사 소개</h4>, /member 의 html <div> 직원들 </div> 을 같이 보여줌 */}
      {/* 결론 => nested routes 의 element 를 보여주는 곳은 <Outlet></Outlet> */}
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      {/* Outlet 은 <Route path='one' element={ <div> 첫 주문시 양배추즙 서비스 </div> } /> 안에 있는 element 를 보여줄 자리를 뜻함 */}
      {/* 쉽게 말해서 /event/one 접속하면 /event html <h4>오늘의 이벤트</h4>, /one 의 html <div> 첫 주문시 양배추즙 서비스 </div> 을 같이 보여줌 */}
      {/* 결론 => nested routes 의 element 를 보여주는 곳은 <Outlet></Outlet> 위치 */}
      <Outlet></Outlet>
    </div>
  )
}

export default App;
