# pdf_share
pdf share for free

```
yarn start 启动应用
npm run build 打包
```

```基础路由
+ pages/
  + users/
    - index.js
    - list.js
  - index.js
会生成
[
  { path: '/', component: './pages/index.js' },
  { path: '/users/', component: './pages/users/index.js' },
  { path: '/users/list', component: './pages/users/list.js' },
]
```

``` 
页面跳转
import Link from 'umi/link';

export default () => (
  <Link to="/list">Go to list page</Link>
);

基于 umi/router，通常在事件处理中被调用。
import router from 'umi/router';

function goToListPage() {
  router.push('/list');
}
```
