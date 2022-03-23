# SSC-BACK Public

### 1. 프로젝트 요약

학과 학생들이 공부한 세미나,강의 등을 들을 수 있고 보안기술 향상과 공부를 위한 워 게임 사이트 개발  



### 2. 사용한 언어 및 라이브러리

Back-End : Node.js(sequelize, passport, redis 등)

Front-End : React.js(redux 등)

### 3. 주요 기능 

|회원가입|로그인|
|:-:|:-:|
|![First Image](https://user-images.githubusercontent.com/47708717/159656514-b06951ea-fd86-439a-81e0-abe53a3fc293.png)|![Second Image](https://user-images.githubusercontent.com/47708717/159656522-a83bb9d4-5b7c-4ba2-820c-eb10a57fe175.png)|

[3.1] 회원가입과 로그인  











<img width="1199" alt="스크린샷 2022-03-23 오후 2 07 06" src="https://user-images.githubusercontent.com/47708717/159656531-c4532da3-5fed-45cf-b34f-e4968cb2f905.png">

[3.2] 워게임 정보  


<img width="1113" alt="스크린샷 2022-03-23 오후 2 07 53" src="https://user-images.githubusercontent.com/47708717/159656545-6d523fc4-a5bb-43c5-aa33-a0392a2540b4.png">

[3.3] 랭킹 정보  

<img width="839" alt="스크린샷 2022-03-23 오후 2 47 49" src="https://user-images.githubusercontent.com/47708717/159656583-a3a33e44-04f9-4be8-999c-a65d2f1400c1.png">

[3.4] 내 정보 


<img width="1047" alt="스크린샷 2022-03-23 오후 2 10 19" src="https://user-images.githubusercontent.com/47708717/159656559-14dbefc4-8595-4ccb-8fe9-02337695336d.png">

[3.5] 강의 목록  


<img width="1302" alt="스크린샷 2022-03-23 오후 2 23 40" src="https://user-images.githubusercontent.com/47708717/159656634-02020531-1a1d-4814-b509-43557d4ca011.png">

[3.6] 강의 시청과 댓글 대댓글 기능


<img width="814" alt="스크린샷 2022-03-23 오후 2 27 15" src="https://user-images.githubusercontent.com/47708717/159656784-311104ec-834c-4d4b-9136-3a2c54a2c082.png">

[3.7] 관리자 기능  


<img width="839" alt="스크린샷 2022-03-23 오후 2 47 49" src="https://user-images.githubusercontent.com/47708717/159656804-29dbe1c4-7b9f-485f-9838-07111d9bdbf5.png">

[3.8] 관리자 기능2  

### 4. 담당역할 및 성과

Back-End를 맡아 RestAPI 개발, DB설계, 로그인 등을 맡았습니다.

객관적으로 보여줄 수 있는 지표가 있지 않았지만 학과 학생들의 학업 증진, 선후배 관계 형성등이 있었습니다.


### 5. 레퍼런스


<img width="1367" alt="새싹챌DB1" src="https://user-images.githubusercontent.com/47708717/159661670-4731cec5-9880-4159-a8d7-1bd35aedc4fd.png">
<img width="1446" alt="새싹챌DB2" src="https://user-images.githubusercontent.com/47708717/159661676-e30f34e0-2cd8-48bc-9d92-a5bf66dbcca9.png">


[5.1] DB구조

[https://github.com/fourjae/SSC-Back](https://github.com/fourjae/SSC-Back)

[5.2] github 주소

## 발생문제 및 해결방법

- **협업**
    
    Back-End 개발자 황영하와 Front-End 개발자 한 명으로 진행하였으며 협업에 큰 어려움이 없었음.
    

- **보안**
    
    Front-End에서  댓글 작성에 사용하는 오픈소스 라이브러리에서 CSRF가 발생
    
    Back-End에서 공격구문에 대한 화이트리스트 필터링을 진행.
    

- DB
    
    문제를 풀고 점수를 얻는 RestAPI에서 경쟁 상태를 이용한 여러번 점수 얻기가 가능하였음. 
    
    비동기 처리과정에서 발생하는 문제 였으나 MySQL에서 중복체크를 위한 새로운 unique컬럼을 만든 후 
    
    닉네임+문제명을 합쳐서 저장함으로써 중복접근을 해결
