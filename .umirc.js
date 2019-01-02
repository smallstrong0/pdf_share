
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'PDF SEARCH',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
  publicPath:'./',
  base:'./',
  history: 'hash',
  exportStatic:true,
  targets: {
    ie: 11,
    ie: 10,
    ie: 9,
    ie: 8,
    ie: 7,
  },
  "theme": {
    // "primary-color": "#2348E6",
    // "primary-color": "linear-gradient(270deg, #4285F4 0%, #2348E6 100%)",
    // "table-header-bg": "#EEEFF9",
    // "menu-bg":"#2348E6",
    // "menu-popup-bg":"#2348E6",
    // "menu-highlight-color": "#2348E6",
  }
}
