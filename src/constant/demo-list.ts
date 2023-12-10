type TypeDemoItem = {
  name: string;
  key: string;
  exclude?: string[];
};

type TypeDemoList = {
  name: String;
  list: TypeDemoItem[];
}[];

const demoList: TypeDemoList = [
  {
    name: 'Quick Start',
    list: [
      {
        name: 'Basic',
        key: 'basic'
      }
      // {
      //   name: 'Options',
      //   key: 'options',
      // },
      // {
      //   name: 'Config',
      //   key: 'config',
      // },
    ]
  },
  {
    name: "Elements' Types",
    list: [
      {
        name: 'Text',
        key: 'elem-text',
        exclude: ['data.js']
      },
      {
        name: 'Rect',
        key: 'elem-rect',
        exclude: ['data.js']
      },
      {
        name: 'Circle',
        key: 'elem-circle',
        exclude: ['data.js']
      },
      {
        name: 'Group',
        key: 'elem-group',
        exclude: ['data.js']
      },
      {
        name: 'Image',
        key: 'elem-image',
        exclude: ['data.js']
      },
      {
        name: 'SVG',
        key: 'elem-svg',
        exclude: ['data.js']
      },
      {
        name: 'HTML',
        key: 'elem-html',
        exclude: ['data.js']
      },
      {
        name: 'Path',
        key: 'elem-path',
        exclude: ['data.js']
      }
    ]
  },
  {
    name: 'iDraw API',
    list: [
      {
        name: 'setData',
        key: 'api-setData'
      },
      {
        name: 'getData',
        key: 'api-getData'
      },
      {
        name: 'selectElement',
        key: 'api-selectElement'
      },
      {
        name: 'addElement',
        key: 'api-addElement'
      },
      {
        name: 'updateElement',
        key: 'api-updateElement'
      },
      {
        name: 'deleteElement',
        key: 'api-deleteElement'
      },
      {
        name: 'moveElement',
        key: 'api-moveElement'
      }
      // {
      //   name: 'resetSize',
      //   key: 'api-resetSize',
      // },
      // {
      //   name: 'selectElement',
      //   key: 'api-selectElement',
      // },
      // {
      //   name: 'selectElementByIndex',
      //   key: 'api-selectElementByIndex',
      // },
      // {
      //   name: 'getSelectedElements',
      //   key: 'api-getSelectedElements',
      // },
      // {
      //   name: 'moveDownElement',
      //   key: 'api-moveDownElement',
      // },
      // {
      //   name: 'moveUpElement',
      //   key: 'api-moveUpElement',
      // },
      // {
      //   name: 'insertElementBefore',
      //   key: 'api-insertElementBefore',
      // },
      // {
      //   name: 'insertElementAfter',
      //   key: 'api-insertElementAfter',
      // },
      // {
      //   name: 'insertElementBeforeIndex',
      //   key: 'api-insertElementBeforeIndex',
      // },
      // {
      //   name: 'insertElementAfterIndex',
      //   key: 'api-insertElementAfterIndex',
      // },
      // {
      //   name: 'scale',
      //   key: 'api-scale',
      // },
      // {
      //   name: 'scrollLeft',
      //   key: 'api-scrollLeft',
      // },
      // {
      //   name: 'scrollTop',
      //   key: 'api-scrollTop',
      // },
      // {
      //   name: 'on',
      //   key: 'api-on',
      // },
      // {
      //   name: 'off',
      //   key: 'api-off',
      // },
    ]
  }
];

export default demoList;
