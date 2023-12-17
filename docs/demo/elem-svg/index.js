import { iDraw } from 'idraw';
const data = {
  elements: [
    {
      uuid: '5db6061d-c813-ac42-7837-9e5a69a5abea',
      name: "rect-001",
      x: 160,
      y: 100,
      w: 200,
      h: 200,
      angle: 0,
      type: "svg",
      detail: {
        svg: '<svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="400" height="400"><path d="M512 1013.76c-277.11488 0-501.76-224.64512-501.76-501.76S234.88512 10.24 512 10.24s501.76 224.64512 501.76 501.76-224.64512 501.76-501.76 501.76z m0-51.02592c248.9344 0 450.73408-201.79968 450.73408-450.73408 0-248.9344-201.79968-450.73408-450.73408-450.73408-248.9344 0-450.73408 201.79968-450.73408 450.73408 0 248.9344 201.79968 450.73408 450.73408 450.73408zM456.9856 637.9008l295.45984-339.94752a26.4192 26.4192 0 0 1 37.59616-2.31936 28.32896 28.32896 0 0 1 3.10784 38.8608l-307.01568 380.38016a30.72 30.72 0 0 1-42.90048 4.84864L235.44832 556.2368a32.128 32.128 0 0 1-5.74976-44.6464 32.1536 32.1536 0 0 1 44.544-6.58944l182.74304 132.90496z" fill="#1890ff"></path></svg>'
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
