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
  
  return (
      <div className="container">

        {/* <YellowBtn bg="blue">버튼</YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn> */}
          <div className="row">
            <div className="col-md-6">
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt=""/>
            </div>
            <div className="col-md-6">
              {/* 현재 url 파라미터에 입력한 숫자 변수를 사용할 수 있는 훅 => useParams 라이브러리 */}
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