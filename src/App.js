// import Priority from "./pages/reactBase/priority/Priority";
// import Agreement from "./pages/reactBase/agreement/Agreement";
// import Name from "./pages/reactBase/name/Name";
// import Helper from "./pages/reactBase/helper/Helper";
import Ajax from './pages/network/Ajax/ajax'
import Fetch from './pages/network/Fetch/fetch'

function App() {
  return (
    <div className="App">
      {/* 优先函数组件 */}
      {/* <Priority /> */}
      {/* 编写风格一致的组件 */}
      {/* <Agreement /> */}
      {/* 对组件命名 */}
      {/* <Name /> */}
      {/* 管理Helper函数 */}
      {/* <Helper /> */}
      <Ajax />
      <Fetch />
    </div>
  );
}

export default App;
