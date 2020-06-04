## Prologue

매우 유명하시지만 최근에 알게된 개발자 '김종민'님이 올린 웹 브라우저에 캔버스와 자바스크립트만으로 멋진 파도를 만드는 10분짜리 [유튜브 강의영상](https://www.youtube.com/watch?v=LLfhY4eVwDY&feature=emb_title)을 봤는데,

초보자인 제 입장에선 약간 이해가 어렵고 한번에 이해하기 힘들었습니다.

그래서 이걸 쉽게 정리해보려 합니다.

자바스크립트만으로 아래의 이미지같은 파도를 만들어봅시다.

## CSS 기본 세팅하기

먼저 `index.html`파일을 만들어줍시다.

그리고 로컬 서버를 간편하게 띄우기 위해 `http-server`모듈도 깔아줍시다.

`index.html` 파일에 기본 html 틀을 잡아줍니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wave</title>
  </head>
  <body>
    Watch out! wave will come!
  </body>
</html>
```

서버를 켜서 어떤 화면이 나오는지 체크해봅시다.

![](https://images.velog.io/images/jakeseo_me/post/a1bca822-abed-4909-9a9f-c4133ba0406f/Screen%20Shot%202020-06-03%20at%2010.04.54%20PM.png)

![](https://images.velog.io/images/jakeseo_me/post/e4da3eb9-bb6e-4632-a440-dcc1f8f0df73/Screen%20Shot%202020-06-03%20at%2010.05.35%20PM.png)

위와 같은 화면이 나왔으면 잘 따라하신 건데요.

이제 캔버스를 화면에 가득채우기 위한 기본 CSS를 입혀봅시다.

### 드래그 혹은 더블클릭 시에 텍스트가 선택되지 않도록 설정

```html
<style>
  * {
    /* 드래그나 더블클릭 시에 텍스트가 선택이 되지 않도록 설정 */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
```

이렇게 하면 텍스트를 아무리 더블클릭하거나 드래그해도 텍스트가 선택되지 않는 것을 확인할 수 있습니다.

일명 복붙방지라고 불리는 기능입니다.

그 이후에 테두리와 마진 패딩 제거의 내용을 담고 있는 아래의 내용도 추가해줍니다.

```html
<style>
  * {
  ...
  /* 너비 등의 레이아웃에 관여하지 않는 테두리 제거 */
  outline: 0;
  /* 마진 패딩 제거*/
  margin: 0;
  padding: 0;
  /* IOS 웹킷에서 터치 시에 등장하는 하이라이트를 제거하기 위함 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
```

### html문서가 모든 영역을 사용하도록 설정

처음 html 문서를 만들면, html태그는 화면의 모든 영역을 사용하지 않습니다. 다만 아래와 같이 필요한 영역만을 사용합니다.

![](https://images.velog.io/images/jakeseo_me/post/4f2b9e38-60ac-4d45-b5d4-613905ce71b9/Screen%20Shot%202020-06-03%20at%2010.21.02%20PM.png)

html에서 화면의 모든 영역을 사용하기 위한 다음 코드를 또 추가해줍니다

```html
<style>
  ... html {
    width: 100%;
    height: 100%;
  }
</style>
```

그리고 최종적으로 우리의 캔버스도 모든 영역을 사용할 것이니 body와 canvas의 영역도 동일하게 넓혀줍니다.

```html
<style>
  ... body {
    width: 100%;
    height: 100%;
    overflow: hidden; /* 영역을 넘는 부분은 숨기기 */
    background-color: #ffffff; /* 배경은 흰색 */
  }

  canvas {
    width: 100%;
    height: 100%;
  }
</style>
```

이걸로 초기 CSS 세팅은 어느정도 완료했습니다.

현재까지의 소스입니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      * {
        /* 드래그나 더블클릭 시에 텍스트가 선택이 되지 않도록 설정 */
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        /* 너비 등의 레이아웃에 관여하지 않는 테두리 제거 */
        outline: 0;
        /* 마진 패딩 제거*/
        margin: 0;
        padding: 0;
        /* IOS 웹킷에서 터치 시에 등장하는 하이라이트를 제거하기 위함 */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }

      html {
        width: 100%;
        height: 100%;
      }

      body {
        width: 100%;
        height: 100%;
        overflow: hidden; /* 영역을 넘는 부분은 숨기기 */
        background-color: #ffffff; /* 배경은 흰색 */
      }

      canvas {
        width: 100%;
        height: 100%;
      }
    </style>
    <title>Wave</title>
  </head>
  <body>
    Watch out! wave will come!
  </body>
</html>
```

최종 결과물은 다음과 같습니다.

![](https://images.velog.io/images/jakeseo_me/post/3f20f764-14e6-46aa-bb46-3a3133220ff8/Screen%20Shot%202020-06-03%20at%2010.25.13%20PM.png)

보기엔 변한게 없지만, 개발자도구로 확인했을 때 body가 모든 영역을 사용하는 것을 볼 수 있습니다.

## 파도 애니메이션을 만드는 과정

얼핏 보기에 파도 애니메이션은 그냥 직선이 울렁이는 것처럼 보입니다. 하지만 우리는 먼저 화면에 어떠한 점을 찍을 것입니다. 그 점은 위 아래로 랜덤하게 움직입니다.

위에 언급한 위아래로 랜덤하게 움직이는 점들을 화면에 일정한 간격으로 찍고 찍은 점들 사이를 곡선으로 연결하고, 색을 칠함으로써 파도를 만들 것입니다.

### index.html에서 스크립트 받아들이기

body에 아래와 같은 코드를 추가해서 app.js를 모듈로서 받아들이게 합시다.

```html
<body>
  <script type="module" src="./app.js"></script>
</body>
```

### app.js 기본 코드 작성하기

이제 본격적으로 js 코드를 작성해봅시다.

클래스 형태로 작성합니다.
코드에 대한 설명은 주석으로 대신하겠습니다.
주석은 나름 상세하게 적으려고 노력했습니다.
참고할만한 레퍼런스도 같이 있으니 참고하며 공부하시면 좋을 것 같습니다.

`app.js`의 코드입니다.

```js
import { Wave } from "./wave.js";

class App {
  /* 생성자 */
  constructor() {
    /* 캔버스 엘리먼트 생성 */
    this.canvas = document.createElement("canvas");

    /*
    Canvas는 getContext() 메소드를 이용해서 렌더링 컨텍스트와
    렌더링 컨텍스트의 그리기 함수들을 사용할 수 있습니다.

    getContext() 메소드는 렌더링 컨텍스트 타입을 지정하는
    하나의 파라메터를 가집니다.

    여기서는 `CanvasRenderingContext2D`를 얻기 위해 '2d'로 지정합니다.
    https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Basic_usage
    */
    this.ctx = this.canvas.getContext("2d");

    /* 현재 html 문서의 body에 캔버스 엘리먼트 추가하기 */
    document.body.appendChild(this.canvas);

    /* 
    사이즈가 변할 때 대응하기 위한 이벤트 리스너 
    
    추가 : once, passive, capture 등에 대한 설명
    http://sculove.github.io/blog/2016/12/29/addEventListener-passive/
    https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/
    */
    window.addEventListener("resize", this.resize.bind(this), {
      once: false,
      passive: false,
      capture: false,
    });

    /* 웨이브 객체 생성 */
    this.wave = new Wave();

    /* 초기 사이즈를 기준으로 resize 함수 실행 */
    this.resize();

    /*
    requestAnimationFrame은 css로 처리하기 어려운 애니메이션이나 
    Canvas, SVG 등의 애니메이션 구현에 이용하는 함수
    setInterval과 흡사한데, 재귀적으로 자신을 호출한다는 점이 다름
    1초당 디스플레이 주사율에 따라 정해진 프레임을 렌더링해줌
    https://blog.eunsatio.io/develop/JavaScript-window.requestAnimationFrame-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC
    https://css-tricks.com/using-requestanimationframe/
    */
    requestAnimationFrame(this.animate.bind(this));
  }

  /* 사이즈가 변했을 때 실행될 콜백 */
  resize() {
    /* 레티나 디스플레이에서 올바른 화면을 보여주기 위해 설정 */
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    /* 캔버스의 크기를 스테이지의 2배로 잡음 */
    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;

    /* 
    캔버스에서 1개의 픽셀이 차지할 크기를 정함
    크기를 2배로 늘렸으므로 각 픽셀이 2개씩 차지하도록 함
    https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
    */
    this.ctx.scale(2, 2);

    /* 웨이브에도 리사이즈가 적용 되도록 설정 */
    this.wave.resize(this.stageWidth, this.stageHeight);
  }

  /* 애니메이션 관련 루틴 정의 */
  animate(t) {
    /* 지정된 사각 영역을 rgba(0, 0, 0, 0)의 색상으로 만듦 */
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    /* 애니메이션이 실행되면 웨이브가 그려지도록 설정 */
    this.wave.draw(this.ctx);
    /* this를 바인드한 채로 애니메이션 프레임 요청 */
    requestAnimationFrame(this.animate.bind(this));
  }
}

/* 브라우저에 window가 로드 됐을 때, 객체 생성 */
window.onload = () => {
  new App();
};
```

### wave.js 코드 작성하기

`wave.js` 파일을 만들고 아래의 내용을 작성해주세요.

```js
import { Point } from "./point.js";

export class Wave {
  constructor(color) {
    this.color = color;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    /* 중간을 각각 넓이, 높이를 2로 나눈 값으로 지정 */
    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.init();
  }

  init() {
    /* 가운데 하나의 점 만들기 */
    this.point = new Point(this.centerX, this.centerY);
  }

  draw(ctx) {
    /*
    그리기의 경로를 시작하는 메소드
    https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Drawing_shapes
    https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
    */
    ctx.beginPath();
    /* 
    호(arc)를 그리는 메소드를 이용하여 원을 그림 
    2 * Math.PI = 반지름 * 2 = 지름
    */
    ctx.arc(this.point.x, this.point.y, 30, 0, 2 * Math.PI);
    /* 색상 RED & 채우기 */
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();

    /* 공의 위치 변경하기 */
    this.point.update();
  }
}
```

### point.js 작성하기

`point.js` 파일을 생성하고 아래와 같은 내용을 작성해주세요.

```js
export class Point {
  /*
  한번에 웨이브를 그려낸다기보다는

  웨이브는 화면에 간격을 가진 점을 찍고 
  그 점 사이를 곡선으로 연결하는 방식이라고 이해하면 쉬움

  웨이브를 그리는데 이용되는 점들은
  아래 위로 랜덤하게 offset 값을 가짐
  */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.fieldY = y; // 기본 Y 중심
    this.speed = 0.1;
    this.cur = 0;
    this.max = Math.random() * 100 + 150;
  }

  update() {
    /* 
    스피드만큼 cur 값이 더해짐 
    cur 값은 계속 커지지만,
    y값은 sin함수의 주기를 따르기 때문에 무한히 -1 ~ 1 사이를 반복함
    */
    this.cur += this.speed;
    /*
    y값이 sin(cur) * max 만큼 늘어남 
    sin(cur)는 sin함수의 주기에 따라 -1에서 1까지 반복
    -1 ~ 1까지의 값에 max(150 ~ 250)값을 곱해줌
    */
    this.y = this.fieldY + Math.sin(this.cur) * this.max;
  }
}
```

여기까지 소스코드를 작성해보셨으면, 한번 실행해봅시다.

### 중간 결과 보기

![](https://images.velog.io/images/jakeseo_me/post/3cebfaa0-8ff6-4ee6-aece-f1c10eea873b/moving-red-dot.gif)

위와 같이 아래 위로 정신없이 움직이는 빨간 점 하나가 나오게 됩니다.

### 점 여러개 만들기

먼저 파도의 각 움직임의 포인트가 될 점을 여러개 만들어봅시다.

`point.js`의 소스코드를 다음과 같이 변경합니다.

```js
export class Point {
  /*
  한번에 웨이브를 그려낸다기보다는

  웨이브는 화면에 간격을 가진 점을 찍고 
  그 점 사이를 곡선으로 연결하는 방식이라고 이해하면 쉬움

  웨이브를 그리는데 이용되는 점들은
  아래 위로 랜덤하게 offset 값을 가짐
  */
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fieldY = y; // 기본 Y 중심
    this.speed = 0.1;
    this.cur = index; // 각 점이 최대한 평행하지 않도록 각각 다른 시작점을 가지게 합니다.
    this.max = Math.random() * 100 + 150;
  }

  update() {
    /* 
    스피드만큼 cur 값이 더해짐 
    cur 값은 계속 커지지만,
    y값은 sin함수의 주기를 따르기 때문에 무한히 -1 ~ 1 사이를 반복함
    */
    this.cur += this.speed;
    /*
    y값이 sin(cur) * max 만큼 늘어남 
    sin(cur)는 sin함수의 주기에 따라 -1에서 1까지 반복
    -1 ~ 1까지의 값에 max(150 ~ 250)값을 곱해줌
    */
    this.y = this.fieldY + Math.sin(this.cur) * this.max;
  }
}
```

`wave.js`의 소스코드를 다음과 같이 변경합시다.

```js
import { Point } from "./point.js";

export class Wave {
  constructor(color) {
    this.color = color;
    this.points = [];
    this.numberOfPoints = 6;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    /* 중간을 각각 넓이, 높이를 2로 나눈 값으로 지정 */
    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    /* 
    각 점의 간격은 `전체 넓이 / (전체 점의 숫자 - 1)` 이 됩니다.  
    이렇게 점의 간격을 나누면 화면의 시작부터 끝까지 고른 간격으로 점을 찍을 수 있습니다.
    */
    this.pointGap = this.stageWidth / (this.numberOfPoints - 1);

    /* 초기화 함수로 넘어가기 */
    this.init();
  }

  init() {
    /* 가운데 하나의 점 만들기 */
    // this.point = new Point(this.centerX, this.centerY);

    /* 
    points에 각각의 점의 좌표와 인덱스를 넣어줍니다. 
    인덱스를 넣어주는 이유는 각 점의 위치에 따라 파동이 움직이는 모양도 다르게 하기 위해서입니다.
    */
    for (let i = 0; i < this.numberOfPoints; i++) {
      this.points[i] = new Point(i, this.pointGap * i, this.centerY);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.numberOfPoints; i++) {
      /*
      그리기의 경로를 시작하는 메소드
      https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Drawing_shapes
      https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
      */
      ctx.beginPath();

      /* 
      호(arc)를 그리는 메소드를 이용하여 원을 그림 
      2 * Math.PI = 반지름 * 2 = 지름
      */
      ctx.arc(this.points[i].x, this.points[i].y, 30, 0, 2 * Math.PI);

      /* 색상 RED & 채우기 */
      ctx.fillStyle = "#ff0000";
      ctx.fill();
      ctx.closePath();

      /* 공의 위치 변경하기 */
      if (i != 0 && i != this.numberOfPoints - 1) {
        this.points[i].update();
      }
    }
  }
}
```

이제 다음과 같은 결과를 볼 수 있습니다.

![](https://images.velog.io/images/jakeseo_me/post/ab420de9-4792-4d6e-b9ff-2cf2f0b229d6/moving-multiple-red-dot.gif)

### 점을 선으로 연결하기

이제 점을 없애고 각 좌표를 선으로 연결해봅시다.

`wave.js`에서 `draw()` 메소드의 소스코드를 다음과 같이 변경하면 됩니다.

```js
draw(ctx) {
    /*
    그리기의 경로를 시작하는 메소드
    https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Drawing_shapes
    https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
    */
    ctx.beginPath();

    /* 점의 시작점으로 붓 이동하기 */
    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 0; i < this.numberOfPoints; i++) {
      /*
      호(arc)를 그리는 메소드를 이용하여 원을 그림
      2 * Math.PI = 반지름 * 2 = 지름
      */
      // ctx.arc(this.points[i].x, this.points[i].y, 30, 0, 2 * Math.PI);

      /* 각 좌표에 선 긋기 */
      ctx.lineTo(this.points[i].x, this.points[i].y);

      /* 공의 위치 변경하기 */
      if (i != 0 && i != this.numberOfPoints - 1) {
        this.points[i].update();
      }
    }

    /* 색상 RED & 채우기 */
    ctx.fillStyle = '#ff0000';
    ctx.fill();

    /* 붓 끝내기 */
    ctx.closePath();
  }
```

그럼 다음과 같은 결과가 됩니다.

![](https://images.velog.io/images/jakeseo_me/post/0b12315a-6256-49e2-b78d-a08105583a97/moving-multiple-red-dot-lines.gif)

제법 파도같지 않나요?

근데 뭔가 이상하죠?

이제 모양을 좀 더 잡아줍시다.

### 파도 완성하기

파도를 완성하려면, 빈 곳의 색을 채워주고, 직선을 곡선으로 바꿔주면 됩니다.

`wave.js`의 `draw()` 메소드만 다음과 같이 바꿔주면 됩니다.

```js
draw(ctx) {
    /*
    그리기의 경로를 시작하는 메소드
    https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Drawing_shapes
    https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
    */
    ctx.beginPath();

    /* 곡선을 위해 이전의 좌표 기억하기 */
    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    /* 점의 시작점으로 붓 이동하기 */
    ctx.moveTo(prevX, prevY);

    for (let i = 0; i < this.numberOfPoints; i++) {
      /*
      호(arc)를 그리는 메소드를 이용하여 원을 그림
      2 * Math.PI = 반지름 * 2 = 지름
      */
      // ctx.arc(this.points[i].x, this.points[i].y, 30, 0, 2 * Math.PI);

      /* 각 좌표에 선 긋기 */
      // ctx.lineTo(this.points[i].x, this.points[i].y);

      /*
      각 좌표에 곡선 긋기
      https://www.w3schools.com/tags/canvas_quadraticcurveto.asp
      */
      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      /* 곡선을 그리기 위해 이전 좌표 업데이트하기 */
      prevX = this.points[i].x;
      prevY = this.points[i].y;

      /* 공의 위치 변경하기 */
      if (i != 0 && i != this.numberOfPoints - 1) {
        this.points[i].update();
      }
    }

    /* 붓을 오른쪽 모서리부터 왼쪽 모서리 그리고 첫번째 점 위치까지 옮기면서 색칠해줍니다. */
    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(0, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.points[0].y);

    /* 색상 RED & 채우기 */
    ctx.fillStyle = '#ff0000';
    ctx.fill();

    /* 붓 끝내기 */
    ctx.closePath();
  }
```

그럼 다음과 같은 결과물이 나옵니다.

![](https://images.velog.io/images/jakeseo_me/post/95a624a1-53c4-4f85-9b8e-c09df3dea0d6/red-wave.gif)

### 3겹의 웨이브 만들기

waveGroup.js 파일을 만들고, wave의 배열을 만들어보세요.

그리고 각각 파란색 계열의 다른 색상을 주면 멋진 웨이브가 완성됩니다.

이 부분부터는 한번 스스로 해보시면 더욱 재밌을 겁니다!

![](https://images.velog.io/images/jakeseo_me/post/994517d5-7a29-4cb9-ad1f-0ae6c36b9220/blue-wave.gif)
