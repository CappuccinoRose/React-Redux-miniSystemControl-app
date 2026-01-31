import "./App.css";
import { Provider, useSelector, useDispatch } from "react-redux";
import { createStore } from "redux";

// --- 1. 定义初始状态 ---
const initialState = {
  count: 0,
  message: "系统就绪",
  systemStatus: "online", // online, maintenance, offline
  logs: [] // 存储操作日志
};

// --- 2. 编写 Reducer (处理逻辑) ---
function systemReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { 
        ...state, 
        count: state.count + 1,
        message: "数值已增加",
        logs: [`[${new Date().toLocaleTimeString()}] 数值增加到 ${state.count + 1}`, ...state.logs] // 新增日志
      };
    case "DECREMENT":
      return { 
        ...state, 
        count: state.count - 1,
        message: "数值已减少",
        logs: [`[${new Date().toLocaleTimeString()}] 数值减少到 ${state.count - 1}`, ...state.logs]
      };
    case "SET_STATUS":
      return { 
        ...state, 
        systemStatus: action.payload,
        message: `系统状态切换为: ${action.payload}`,
        logs: [`[${new Date().toLocaleTimeString()}] 状态变更为 ${action.payload}`, ...state.logs]
      };
    default:
      return state;
  }
}

// --- 3. 创建 Store ---
const store = createStore(systemReducer);

// --- 组件层级结构 ---

// App: 入口
function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <ControlPanel />
          <LogPanel />
        </div>
      </div>
    </Provider>
  );
}

// Header: 位于顶部，展示全局状态 (场景：跨组件读取数据)
function Header() {
  const { count, systemStatus } = useSelector((state) => state);
  
  return (
    <header className="app-header">
      <div className="logo">mini系统控制台 v2.0</div>
      <div className="status-indicator">
        当前处理数: <span className="count-badge">{count}</span> | 
        状态: <span className={`status-dot ${systemStatus}`}>{systemStatus}</span>
      </div>
    </header>
  );
}

// ControlPanel: 控制面板，发送 Action
function ControlPanel() {
  const dispatch = useDispatch();

  return (
    <section className="panel control-panel">
      <h2>操作控制台</h2>
      <div className="button-group">
        <button 
          className="btn btn-increase" 
          onClick={() => dispatch({ type: "INCREMENT" })}
        >
          + 增加处理项
        </button>
        <button 
          className="btn btn-decrease" 
          onClick={() => dispatch({ type: "DECREMENT" })}
        >
          - 减少处理项
        </button>
      </div>
      
      <h3>切换系统模式</h3>
      <div className="button-group">
        <button onClick={() => dispatch({ type: "SET_STATUS", payload: "online" })}>
          🟢 在线
        </button>
        <button onClick={() => dispatch({ type: "SET_STATUS", payload: "maintenance" })}>
          🟡 维护
        </button>
        <button onClick={() => dispatch({ type: "SET_STATUS", payload: "offline" })}>
          🔴 离线
        </button>
      </div>
    </section>
  );
}

// LogPanel: 日志面板 (场景：读取并渲染列表数据)
function LogPanel() {
  const { logs, message } = useSelector((state) => state);

  return (
    <section className="panel log-panel">
      <h2>系统反馈</h2>
      <div className="current-msg">
        当前消息: <strong>{message}</strong>
      </div>
      
      <h3>操作日志 ({logs.length})</h3>
      <ul className="log-list">
        {logs.length === 0 ? (
          <li className="log-empty">暂无操作记录</li>
        ) : (
          logs.map((log, index) => (
            <li key={index} className="log-item">{log}</li>
          ))
        )}
      </ul>
    </section>
  );
}

export default App;
