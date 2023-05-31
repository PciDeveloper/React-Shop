import logo from './logo.svg';
import './App.css';
import { Navbar, Container, Nav, Form, Card } from 'react-bootstrap'  // 리액트 부트스트랩 라이브러리
import { createContext, useState } from 'react';
// import 작명 from './data.js'; // data.js 에서 만든 변수 한개 import 방법
// import { a, b } from './data.js'; // data.js 에서 만든 변수 여러개 import 방법
import data from './data.js'; // data 라고 되어있는 변수는 자유롭게 작명하지만 export 하는 변수와 동일하게 작명하는 것이 인지하기 좋음
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js';
import Cart from './routes/Cart.js';
import axios from 'axios';

export let Context1 = createContext(); // 세팅 1 => Context 를 하나 만들어줌 state 보관하는 역할, 가져다 쓰기 위한 export

function App() {

  let [shoes, setShoes] = useState(data);

  // 10 => 0 번째 상품의 재고, 11 => 1 번째 상품의 재고, 12 => 2 번째 상품의 재고
  // Context API 사용하여 Detail, Tab 컴포넌트에서 사용하려고 만듬
  let [재고] = useState([10, 11, 12]);

  let navigate = useNavigate(); // 페이지 이동을 도와주는 함수. 훅의 일종
  let [loding, setLoding] = useState(false); // 로딩 상태를 저장하는 state

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ELSI</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={ () => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={ () => { navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* 라우터로 페이지 나누는 방법 */}
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
                    <Goods shoes={ shoes[i] } i={i + 1} key={i} ></Goods>
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
    <div className="col-md-4">
    {/* 기존 이미지 URL  => https://codingapple1.github.io/shop/shoes1 ,2, 3 */}
    {/* i 라는 이름으로 1,2,3 전송해서 URL 파라미터로 숫자를 넘겨서 이미지를 보여주는 방법 (함수 파라미터 문법) */}
    <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%" alt=''/> 
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
