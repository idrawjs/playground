import iDraw from 'idraw';
const data = {
  // bgColor: '#f0f0f0',
  elements: [
    {
      name: "rect-001",
      x: 160,
      y: 80,
      w: 200,
      h: 200,
      angle: 0,
      type: "text",
      desc: {
        text: 'Hello World',
        color: "#3f51b5",
        fontSize: 60,
        textAlign: 'center',
        borderRadius: 10,
        borderWidth: 2,
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
idraw.initData(data)
idraw.selectElementByIndex(0);
