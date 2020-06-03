import {WaveGroup} from './wavegroup.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');

    /*
    Canvas는 getContext() 메소드를 이용해서 렌더링 컨텍스트와 
    렌더링 컨텍스트의 그리기 함수들을 사용할 수 있습니다.

    getContext() 메소드는 렌더링 컨텍스트 타입을 지정하는
    하나의 파라메터를 가집니다.

    여기서는 `CanvasRenderingContext2D`를 얻기 위해 '2d'로 지정합니다.
    https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Basic_usage
    */
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    // this.wave = new Wave();
    this.waveGroup = new WaveGroup();

    /*
    Resize 시에 계속 사이즈에 대한 정보를 얻어내기 위한 것 같음
    */
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    /*
    브라우저에게 수행하기를 원하는 애니메이션을 알리고 
    다음 리페인트가 진행되기 전에 
    해당 애니메이션을 업데이트하는 함수를 호출하게 합니다.
    */
    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    /* 레티나 디스플레이에서 올바른 화면을 보여주기 위해서 설정 */
    console.log(this);
    console.log(this.stageWidth);
    console.log(this.stageHeight);

    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    // this.wave.resize(this.stageWidth, this.stageHeight);
    this.waveGroup.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // this.wave.draw(this.ctx);
    this.waveGroup.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
};
