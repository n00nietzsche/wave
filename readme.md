## Prologue

매우 유명하시지만 최근에 알게된 개발자 '김종민'님이 올린 웹 브라우저에 캔버스와 자바스크립트만으로 멋진 파도를 만드는 10분짜리 [유튜브 강의영상](https://www.youtube.com/watch?v=LLfhY4eVwDY&feature=emb_title)을 봤는데,

초보자인 내 입장에선 추가적인 설명이 아주 많이 필요했습니다!! 그래서 이걸 쉽게 정리해보려 합니다!

자바스크립트만으로 아래의 이미지같은 파도를 만들어봅시다!!!

## 1. CSS 기본 세팅하기

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

최종 결과물은 다음과 같습니다.

![](https://images.velog.io/images/jakeseo_me/post/3f20f764-14e6-46aa-bb46-3a3133220ff8/Screen%20Shot%202020-06-03%20at%2010.25.13%20PM.png)

보기엔 변한게 없지만, 개발자도구로 확인했을 때 body가 모든 영역을 사용하는 것을 볼 수 있습니다.
