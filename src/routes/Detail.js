import { tab } from "@testing-library/user-event/dist/tab";
import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components"; // styled-components 를 사용하면 css 파일 없어도 JS 파일에서 전부 해결 가능

import {Context1} from './../App'; // App.js 에서 만든 Context state import

// styled-components 장점은 페이지 로딩시간 단축
// props 문법을 사용하면 여러 변수 안만들어도 여러 작업 가능
// props => props.bg == 'blue' ? 'white' : 'black' => 색상이 블루인지? 맞으면 white 아니라면 black
// 별로 내 스타일은 아닌듯함. 어차피 다른 페이지에서 사용할 때 똑같이 import 해서 사용해야하는거면..
// JS 코드가 길어지고 지저분해질바에는 그냥 css 파일 만들어서 작업하고 import 하련다.
// let YellowBtn = styled.button`
//   background : ${ props => props.bg };
//   color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
//   padding : 10px;
// `

// let NewBtn = styled.button(YellowBtn); // 기존 스타일 복사 가능

function Detail(props) { // App.js 에 있는 데이터를 바인딩 하기 위해 props

  // 상단에 Context1 import 후 useContext() 이것까지 마무리 해주어야 사용이 가능해짐
  // object 자료로 { shoes, 재고 } state 가 들어있음
  // 변수에 저장해서 사용
  let {shoes, 재고} = useContext(Context1);
  
  // App.js '/detail/:id' => id 에 적었던 파라미터 정보가 useParams 훅 여기에 가져와줌
  // 현재 shoes라는 상품데이터들 안에 id : 0 이런 고유 번호가 있음
  // 그럼 현재 /:id 자리에 입력한 값과 영구번호가 같은 상품을 찾아서 데이터 바인딩 해주기.
  // 자바스크립트 .find() 라는 문법 => array 자료안에서 원하는 항목만 찾아올 수 있음
  // array자료.find(()=>{ return 조건식 }) 
  // 이렇게 쓰면 조건식에 맞는 자료를 찾아서 이 자리에 남겨줌
  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function(x) {
    return x.id == id
  });

  let [show, setShow] = useState(true); // 2초 뒤에 보이고 사라지는 것을 구현 할 스위치
  let [count, setCount] = useState(0);
  let [num, setNum] = useState(''); // 인풋에 숫자가 아닌 문자를 입력했을 때 사용하기 위한 state
  let [tab, setTab] = useState(0); // 탭 상태를 저장해주는 state 0, 1, 2 버튼 있음

  // useEffect => mount 또는 update 될 때 코드를 실행해줌
  // useEffect 동작원리, 사용 이유 => useEffect 안에 있는 코드는 html 을 먼저 렌더링 한 후에 동작한다.
  // html 을 조금 더 빨리 보여주기 위해서 시간이 오래걸리는 어려운 코드는 html 먼저 렌더링 후 동작하게 끔
  // 사용자가 좀 더 빠른 느낌을 줄 수 있다는 장점이 있고
  // 특히 서버에서 데이터 가져오는 로직같은 경우, 타이머기능 등에 효율적임
  // 결론 => html 이 먼저 렌더링이 된 후 useEffect 가 실행 됨
  // [] => dependency 라고 함. useEffect 실행 조건을 넣을 수 있는 곳. state 또는 변수를 여러개 넣을 수 있음
  // 이어서, [] 컴포넌트 mount 시 1회만 실행하고 싶으면 이렇게 비워놓으면 됨. 이해안가면 직접 , [] 없애보고 테스트 비교
  // useEffect 동작 전에 실행되는 return. 별명 => clean up function 이라 불리움
  // 기존 타이머는 제거해주세요. 즉 기존 코드는 clear 해주게끔 여기에 많이 작성함
  // 예를 들어 데이터 요청이 2~3초 걸리는데 가져오는 도중에 재 렌더링이 되어버리면 버그가 많아질 수도 있음
  // 그래서 기존 데이터 요청은 제거해주세요 라던지 등등 이런식으로 코드 짜면 매우 효율적임
  // 따라서 html 렌더링 후 useEffect 가 실행되기 전에 return 문이 먼저 동작함
  // 참고로 clean up function 은 최초 mount 시에는 실행 x, unmount 시 실행됨
  // =====정리=====
  // 1. useEffect( () => { })     1. 재렌더링마다 코드를 실행하고 싶을 때 사용. useEffect 실행 전에 실행하려면 clean up function 각각 중괄호 안에 return () => {} 
  // 2. useEffect( () => { }, []) 2. mount 시 1회만 실행하고 싶을 때 사용. useEffect 실행 전에 실행하려면 clean up function 각각 중괄호 안에 return () => {}
  // 3. useEffect( () => {        3. unmount 시 1회만 실행하고 싶을 때 사용
  //      return () => {
  //    }
  //  }, [])
  useEffect( () => {
    let timer = setTimeout( () => { setShow(false); }, 2000);
    // console.log(2);
  
    return () => {
      // console.log(1);
      clearTimeout(timer);
    }
  }, []);

  // useEffect 를 사용하여 숫자 말고 문자를 입력했을 때 alert 띄워줌
  // useEffect( () => {
  //   if(isNaN(num) == true) {
  //     alert('문자만가능해요');
  //   }
  // }, [num]); 

  return (
      <div className="container star">
        {
          show == true ? // 삼항연산자를 이용하여 useState 스위치가 true 이면 보여주고 아니면 안보이게끔
          <div className="alert alert-warning"></div> : null
        }
        
        {count}
        <button onClick={ () => { setCount(count + 1) } }>버튼</button>
        {/* <YellowBtn bg="blue">버튼</YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn> */}
          <div className="row">
            <div className="col-md-6">
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt=""/>
            </div>
            <div className="col-md-6">
              {/* useEffect 를 사용하여 숫자 말고 문자를 입력했을 때 alert 띄워줌 */}
              {/* <input onChange={ (e) => {setNum(e.target.value)}} /> */}

              {/* 현재 url 파라미터에 입력한 숫자 변수를 사용할 수 있도록 하는 훅 => useParams 라이브러리 사용 */}
              <h4 className="pt-5">{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}</p>
              <button className="btn btn-danger">주문하기</button> 
            </div>
          </div>

          {/* 모든 과정을 거치고 이렇게 props 안써도 App.js 에 있던 state 를 가져다가 사용할 수 있음 Context 훅 */}
          {'재고 ' + 재고[0]} 

          {/* defaultActiveKey => 페이지 처음 진입했을 때 기본으로 눌려있을 버튼 지정 */}
          <Nav variant="tabs" defaultActiveKey="link0">
            <Nav.Item>
              <Nav.Link onClick={ () => { setTab(0) } } eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={ () => { setTab(1) } } eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={ () => { setTab(2) } } eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
          </Nav>

          {/* html 안에서는 if 문 작성을 하지 못하므로 Tab 컴포넌트 생성후 적용 */}
          {/* 컴포넌트는 return 문을 꼭 사용해야함 컴포넌트는 return 문이 없으면 동작 안함 */}

          {/* props 방법이 싫으면 두가지 방법이 있음*/}
          {/* 1. Context API (리액트 기본문법) 사용 => 성능이슈, 컴포넌트 재활용에 단점이 있음 */}
          {/* - state 변경시 쓸데 없는 것 까지 재렌더링이 됨 => 성능이슈
              - 자식 컴포넌트가 Context 를 사용하여 state 를 가져다가 쓰고있다면
              - 나중에 다른페이지에서 그 자식 컴포넌트를 import 해서 재사용하려면 이상해짐 */}
              
          {/* 2. Redux 외부 라이브러리 사용 */}
          <Tab tab={ tab }/>
          
      </div>
  )
}

// if 문을 안쓰고 하는 방법도 있음
// props.tab 이 0 이면 return 문 array 자료에서 0 번 자료를 꺼내줄거여서
// tab2 처럼 또 다른 props 도 이어서 추가 가능함
// 탭 state 가 변할 때 마다 end 부착
function Tab( {tab} ){

  let [fade, setFade] = useState('');
  let {재고} = useContext(Context1);

  useEffect( () => {
    let a = setTimeout( () => { // tab state 가 변경된 후 0.1초 후에 ~ 시점을, 텀을 조금더 이후로 미뤄야 동작함
      setFade('end'); // clean up function 이 실행 된 후 다시 state 를 end 로 바꿔줌
    }, 100);
    
    // tab 이라는 state 가 변경될 때 마다 실행. 
    // 즉, useEffect 가 동작 하기 전에 초기화 함수를 사용하여 공백으로 바꾸어주고
    // 현재는 clean up function 이 필요가 없는 이유는
    // 리액트는 state 변경함수를 쓸 때마다 재렌더링을 시켜주는 것이 아니고,
    // state 변경이 다 되고 나서 재렌더링을 딱 한번 시켜주기 때문에 변화를 못느낌.
    // 그래서 그 텀을 주기위해서 clean up function 으로 초기화 시켜주는 방법 말고
    // setTimeout 으로 미세한 시간차를 주면 됨
    return () => {
      clearTimeout(a); // 타이머 삭제
      setFade(''); 
    }
  }, [tab]);

  return (
    // className={ 'start ' + fade } => 클래스 start 와 state 변수 fade 를 클래스로 같이 사용하고 싶을 때 평소대로 클래스 적고 스페이스바 후 이어서 변수 작성
    <div className={ 'start ' + fade }>
      {
        // App.js 에서 Context 훅을 사용하여 Detail 컴포넌트 이외에 그의 자식 컴포넌트들도 state 사용할 수 있음
        [ <div>재고 : {재고[0]}</div>, <div>내용1</div>, <div>내용2</div> ][tab]
      }
    </div>
  )
}

// function Tab(props) {
//   if (props.tab == 0) {
//     return <div>내용0</div>
//   } else if (props.tab == 1) {
//     return <div>내용1</div>
//   } else if (props.tab == 2){
//     return <div>내용2</div>
//   }
// }

export default Detail;