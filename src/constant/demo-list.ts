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
    name: 'Quick Started',
    list: [
      {
        name: 'Basic',
        key: 'basic'
      },
      {
        name: 'Advanced Data',
        key: 'advanced-data'
      },
      {
        name: 'Options',
        key: 'basic-options'
      }
      // {
      //   name: 'Config',
      //   key: 'config',
      // },
    ]
  },
  {
    name: 'Data Rendering',
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
      },
      {
        name: 'Layout',
        key: 'data-layout',
        exclude: ['data.js']
      }
    ]
  },
  {
    name: 'Custom Styles',
    list: [
      {
        name: 'Selector Style',
        key: 'custom-style-selector'
      },
      {
        name: 'Ruler Style',
        key: 'custom-style-ruler'
      },
      {
        name: 'Scroller Style',
        key: 'custom-style-scroller'
      },
      {
        name: 'Info Style',
        key: 'custom-style-info'
      }
    ]
  },
  {
    name: 'Switching Mode',
    list: [
      {
        name: 'Select Mode',
        key: 'mode-select'
      },
      {
        name: 'Drag Mode',
        key: 'mode-drag'
      },
      {
        name: 'Read-Only Mode',
        key: 'mode-readOnly'
      }
    ]
  },
  {
    name: 'Features',
    list: [
      {
        name: 'Ruler',
        key: 'feature-ruler'
      },
      {
        name: 'Scroll',
        key: 'feature-scroll'
      },
      {
        name: 'Info',
        key: 'feature-info'
      },
      {
        name: 'Select In Group',
        key: 'feature-selectInGroup'
      },
      {
        name: 'Snap To Grid',
        key: 'feature-snapToGrid'
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
        name: 'setMode',
        key: 'api-setMode'
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
        name: 'modifyElement',
        key: 'api-modifyElement'
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
      },
      {
        name: 'scale',
        key: 'api-scale'
      },
      {
        name: 'resize',
        key: 'api-resize'
      },
      {
        name: 'centerContent',
        key: 'api-centerContent'
      },
      {
        name: 'destroy',
        key: 'api-destroy'
      },
      {
        name: 'disable',
        key: 'api-disable'
      },
      {
        name: 'enable',
        key: 'api-enable'
      },
      {
        name: 'getImageBlobURL',
        key: 'api-getImageBlobURL'
      },
      {
        name: 'event',
        key: 'api-event'
      }
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
