import { iDraw } from 'idraw';
const data = {
  elements: [
    {
      uuid: '41d437b8-afbd-2d3d-14bc-912e26d3491f',
      x: 100,
      y: 100,
      w: 80,
      h: 80,
      angle: 0,
      type: 'path',
      detail: {
        commands: [
          { type: 'M', params: [10, 30] },
          { type: 'A', params: [20, 20, 0, 0, 1, 50, 30] },
          { type: 'A', params: [20, 20, 0, 0, 1, 90, 30] },
          { type: 'Q', params: [90, 60, 50, 90] },
          { type: 'Q', params: [10, 60, 10, 30] },
          { type: 'z', params: [] }
        ],
        fill: '#FF00006F',
        stroke: '#000000',
        strokeWidth: 1,
        originX: 10,
        originY: 10,
        originH: 80,
        originW: 80
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
