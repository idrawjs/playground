import { iDraw } from 'idraw';
const data = {
  elements: [
    {
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
  contextWidth: 600,
  contextHeight: 400,
  devicePixelRatio: 4,
});
idraw.setData(data)
idraw.selectElementByIndex(0);
