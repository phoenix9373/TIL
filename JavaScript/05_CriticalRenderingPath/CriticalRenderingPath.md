# Critical rendering Path(성능 좋은 웹페이지 만드는 원리)

복습: No
작성일시: 2021년 2월 24일 오전 6:30



출처: 드림코딩 - 브라우저 101 강의 JavaScript 

[Dream Coding](https://academy.dream-coding.com/)

# 브라우저에 url 요청 시

![](\img\Untitled.png)

- requests/response → 요청 단계
    - 브라우저가 서버에 html 파일을 요청
    - 서버에 request하면 가장 먼저 index.html 파일을 받아옴. → index.html 안에 필요한 파일들이 링크되어있고, 이는 로딩 단계에서 일어난다.
- loading → 로딩 단계
    - index.html 파일을 서버에서 받은 후, 로딩한다.
    - 받아온 index.html로 한 줄 한 줄 읽으면서 필요한 경우 파일을 받아온다.
    - 그 파일 안에 링크된 필요한 파일을 받아옴. → CSS, JS 파일 등.
    - 필요한 리소스를 받아옴. → 이미지, 폰트 등.
- scripting → DOM 변환 단계
    - html 파일의 태그들을 파싱하여 DOM 요소로 변환 → DOM 트리 생성
    - CSS 에 관련된 모든 사항 계산 → Cascading rule 적용 → CSSOM 트리 생성
- rendering → 최종 Render Tree 생성(사용자에게 보여지는)
    - DOM 트리 + CSSOM 트리 → Render Tree 생성
    - 표기될 요소만 선별하여 트리 생성
- layout → rendering 단계에서 완료된 정보를 가지고 계산하는 단계
    - 각각의 요소들의 크기(px), 위치(layout) 등을 가져온다.
    - 이 정보를 바탕으로 브라우저에 어떻게 그릴지 계획한다.
- paint → 요소들을 실제로 배치하는 단계
    - 앞 부분에서 계산한대로 각 부분을 조금씩 나누어 '이미지'를 준비한다.
    - 그 '이미지'를 '비트맵'으로 표현하여 계산해둔다.
    - '이미지'를 만들 때, 각 부분에 적절한 '레이어'를 추가한다.
    - 예를 들어, 나중에 바뀔만한 부분이 있으면 해당 부분에는 '레이어'를 더 쌓는다.
    - 단, layout이 도중에 바뀌는 상황(반응형 웹사이트)가 발생하면 → 큰 성능 저하가 발생한다.
- composition → 준비한 레이어를 쌓는 단계
    - layout에서 미리 준비한 대로 브라우저에 그림을 그린다.

## Construction 파트

- 상위 폴더의 "CCSOM" 부분 참고

## Operation 파트

### Layout 단계

- 최종적으로 CSSOM 정보가 담겨져있다.
- 이 정보를 바탕으로 레이아웃을 배치한다.
    - 폰트, 패딩, 마진 등등을 계산한다.

### Paint 단계

![](img\Untitled 1.png)

- 레이아웃 단계에서 그려진 레이아웃을 하나하나의 단위(레이어)로 나누어 준비한다.
- 모든 걸 한 번에 다 그리지 않고, '비트맵'이라는 것을 활용하여 각 레이어 마다 어떤 요소가 담겨있는지 표시해놓는다.
- 레이어가 너무 많으면 성능 저하가 발생한다.
- 레이어 단위로 분리해서 준비하면 좋은 점
    - 어떤 요소가 변경되면 해당 레이어만 다시 계산하면 된다.
    - 전체적인 그림을 다시 그릴 필요가 없어서 성능 향상이 이루어진다.
- 예시
    - CSS에서 `will-change` 라는 속성은 Paint 단계에서의 성능을 저하시킨다.
    - Paint 단계에서 주시하고, 새로운 레이어를 만들어놓고 변화될 준비를 한다.

### Composition

- Paint 단계에서 준비한 레이어를 낮은 단계(z-index가 가장 작은 or 가장 앞에 나오는 태그) 순서대로 레이어를 쌓는다.

### 예시

- `translate` 로 위치만 바꾸는 경우 → paint 단계는 생략, composition 단계만 수행
- `layout` 로 다른 요소와 배치가 바뀌는 경우 → paint 단계에서 성능 저하 발생, composition 단계도 다시 수행
    - 반응형 웹사이트를 만드는 경우도 이 경우에 해당한다.
    - 레이아웃을 바뀌게 하는 CSS 요소

        [CSS Triggers](https://csstriggers.com/)

- img 태그에 `z-index`, `will-change` 를 사용한 경우,
- 개발자 도구 'layers' 에서 확인 가능하다.
- 해석 : `will-change`가 있으면, 나중에 opacity가 변경될 때마다 전체 레이아웃을 다시 그리기 싫으니까 'img' 태그만 따로 레이아웃을 줘서 변경될 때 하나의 레이아웃만 바뀌도록 해야지.

![](\img\Untitled 2.png)

# CSS trigger - 성능

![](\img\Untitled 3.png)

- Blink → Chrome 브라우저
- Gecko → 파이어 폭스 브라우저
- Webkit → IOS 사파리 브라우저
- EdgeHTML → 오래된 것.(최신 Edge는 Blink를 사용)

- Change from default → 맨 처음 렌더링 시
- Subsequent updates → 중간에 업데이트 렌더링 시

### Opacity

![](\img\Untitled 4.png)

- 크롬에선 Composite만 발생 → 성능 좋음
- Webkit에선 모두 발생 → 성능 최악

### transform

![](\img\Untitled 5.png)

- 크롬 → 성능 좋음
- WebKit → 성능 최악

### top, left

![](C:\Users\multicampus\Desktop\TIL\JavaScript\05_CriticalRenderingPath\img\Untitled 6.png)

- 모든 곳에서 성능 최악.