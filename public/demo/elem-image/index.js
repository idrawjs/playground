import { iDraw } from 'idraw';
const data = {
  elements: [
    {
      uuid: '18604608-9452-fbe5-3fc0-8be9e33e067a',
      name: "rect-001",
      x: 160,
      y: 100,
      w: 200,
      h: 200,
      angle: 0,
      type: "image",
      detail: {
        src: './image/github.png'
      },
    },
  ],
}

const app = document.querySelector('#app');
const idraw = new iDraw(app, {
  width: 600,
  height: 400, 
  devicePixelRatio: 2,
});
idraw.setData(data) 
