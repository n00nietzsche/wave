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
    this.fieldY = y;
    this.speed = 0.1;
    this.cur = index;
    this.max = Math.random() * 100 + 150;
    console.log('x, y = ', x, y);
  }

  update() {
    this.cur += this.speed;
    /*
    값을 누적시키는데 cur를 이용하고,
    출렁임을 일으키는데에 sin함수 + cur를 이용함
    */
    this.y = this.fieldY + Math.sin(this.cur) * this.max;
  }
}
