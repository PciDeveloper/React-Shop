import { useParams } from "react-router-dom";

function Detail(props) { // App.js 에 있는 데이터를 바인딩 하기 위해 props
  
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
  
  return (
      <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt=""/>
            </div>
            <div className="col-md-6">
              {/* 현재 url 파라미터에 입력한 숫자 변수를 사용할 수 있는 훅 => useParams 라이브러리 */}
              <h4 className="pt-5">{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}</p>
              <button className="btn btn-danger">주문하기</button> 
            </div>
          </div>
      </div>
  )
}

export default Detail;