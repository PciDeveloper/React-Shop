import logo from './logo.svg';
import './App.css';
import { Navbar, Container, Nav, Form, Card } from 'react-bootstrap'  // 리액트 부트스트랩 라이브러리
import { useState } from 'react';
// import 작명 from './data.js'; // data.js 에서 만든 변수 한개 import 방법
// import { a, b } from './data.js'; // data.js 에서 만든 변수 여러개 import 방법
import data from './data.js'; // data 는 자유롭게 작명하지만 변수와 동일하게 작명하는 것이 인지하기 좋음
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js';

function App() {

  let [shoes] = useState(data);
  let navigate = useNavigate(); // 페이지 이동을 도와주는 함수. 훅의 일종

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ELSI</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={ () => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={ () => { navigate('/detail') }}>Detail</Nav.Link>
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
                    <Goods shoes={ shoes[i] } i={i + 1} ></Goods> // 하단에 Goods 컴포넌트 생성
                  )
                })
              }
            </div>
          </div>
          </>
        } />

        {/* Detail.js 파일을 따로 만들어서 컴포넌트 관리 후 import */}
        {/* Detail.js 에 만들어놓은 컴포넌트에서 props 를 사용하여 데이터 전송 받아서 사용하기 */}
        {/* /detail/:id => URL 파라미터 문법 */}
        <Route path='/detail/:id' element={ <Detail shoes={ shoes }/> } />

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
