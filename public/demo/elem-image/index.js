import { iDraw } from 'idraw';
const data = {
  elements: [
    {
      uuid: '18604608-9452-fbe5-3fc0-8be9e33e067a',
      name: 'rect-001',
      x: 60,
      y: 60,
      w: 100,
      h: 100,
      angle: 0,
      type: 'image',
      detail: {
        src: './image/github.png'
      }
    }
  ]
};

const app = document.querySelector('#app');
const idraw = new iDraw(app, {
  width: 320,
  height: 320,
  devicePixelRatio: 2
});
idraw.setData(data);
