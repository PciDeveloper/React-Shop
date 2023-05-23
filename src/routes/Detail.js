import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"; // styled-components 를 사용하면 css 파일 없어도 JS 파일에서 전부 해결 가능

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
  
  // App.js '/detail/:id' => id 에 적었던 파라미터 정보가 useParams 훅 여기에 가져와줌
  // 현재 shoes라는 상품데이터들 안에 id : 0 이런 고유 번호가 있음
  // 그럼 현재 /:id 자리에 입력한 값과 영구번호가 같은 상품을 찾아서 데이터 바인딩 해주기.
  // 자바스크립트 .find() 라는 문법 => array 자료안에서 원하는 항목만 찾아올 수 있음
  // array자료.find(()=>{ return 조건식 }) 
  // 이렇게 쓰면 조건식에 맞는 자료를 찾아서 이 자리에 남겨줌
  let { id } = useParams();
  // let 찾은상품 = props.shoes.find(function(x) {
  //   return x.id == id
  // });

  let [show, setShow] = useState(true); // 2초 뒤에 보이고 사라지는 것을 구현 할 스위치
  let [count, setCount] = useState(0);
  let [num, setNum] = useState('');
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
      <div className="container">
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
              <h4 className="pt-5">{props.shoes[id].title}</h4>
              <p>{props.shoes[id].content}</p>
              <p>{props.shoes[id].price}</p>
              <button className="btn btn-danger">주문하기</button> 
            </div>
          </div>
      </div>
  )
}

export default Detail;