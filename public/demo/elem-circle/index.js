import { iDraw } from 'idraw';
const data = {
  // bgColor: '#f0f0f0',
  elements: [
    {
      name: "circle-001",
      x: 160,
      y: 100,
      w: 200,
      h: 200,
      angle: 0,
      type: "circle",
      detail: {
        bgColor: "#d5f5f9",
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "#3f51b5",
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
