import "./index.css";


// 这是一个最终形态的 createStore，它接受的参数叫 reducer，reducer 是一个函数，它其实是一个纯函数（Pure Function）。
function createStore(reducer) {
  let state = null;
  // 观测者模式
  const listeners = [];
  const subscribe = listener => {
    listeners.push(listener);
  };
  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  // 因为不需要传入appState了 所以调用createStore时候先初始化一个state出来
  dispatch({}); // 通过调用dispatch去执行stateChanger 来初始化一个state
  return { getState, dispatch, subscribe };
}

function renderApp(newAppState, oldAppState = {}) {
  // 防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}
  if (newAppState === oldAppState) return; // 数据没有变化就不渲染了
  console.log("render app...");
  renderTitle(newAppState.title, oldAppState.title);
  renderContent(newAppState.content, oldAppState.content);
}

function renderTitle(newTitle, oldTitle = {}) {
  console.log(newTitle);
  if (newTitle === oldTitle) return;
  console.log("render title...");
  const titleDOM = document.getElementById("title");
  titleDOM.innerHTML = newTitle.text;
  titleDOM.style.color = newTitle.color;
}

function renderContent(newContent, oldContent = {}) {
  if (newContent === oldContent) return;
  console.log("render content...");
  const contentDOM = document.getElementById("content");
  contentDOM.innerHTML = newContent.text;
  contentDOM.style.color = newContent.color;
}

const appState = {
  title: {
    text: "React.js 小书",
    color: "red"
  },
  content: {
    text: "React.js 小书内容",
    color: "blue"
  }
};

// 这里将stateChanger改变成了一个纯函数 reducer 是不允许有副作用的。你不能在里面操作 DOM，也不能发 Ajax 请求，更不能直接修改 state，它要做的仅仅是 —— 初始化和计算新的 state。
function stateChanger(state, action) {
  // 这里可以初始化一个state 如果没有传入一个state 那么就初始化一个
  if (!state) {
    return {
      title: {
        text: "React.js 小书",
        color: "red"
      },
      content: {
        text: "React.js 小书内容",
        color: "blue"
      }
    };
  }
// 通过switch判断和ES6的解构赋值 返回一个新的state 并没有去直接修改state
  switch (action.type) {
    case "UPDATE_CONTENT_TEXT":
      return {
        // 构建新的对象并且返回
        ...state,
        content: {
          ...state.title,
          text: action.ContentText
        }
      };
    case "UPDATE_TITLE_TEXT":
      return {
        // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      };
    case "UPDATE_TITLE_COLOR":
      return {
        // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      };
    default:
      return state; // 没有修改，返回原来的对象
  }
}

const store = createStore(stateChanger);

let oldState = store.getState(); // 缓存旧的 state
store.subscribe(() => {
  const newState = store.getState(); // 获取新的 state
  console.log(newState);
  renderApp(newState, oldState);
  oldState = newState; // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
});

renderApp(store.getState()); // 首次渲染页面
store.dispatch({ type: "UPDATE_TITLE_TEXT", text: "《React.js 小书》" }); // 修改标题文本
store.dispatch({ type: "UPDATE_TITLE_COLOR", color: "pink" }); // 修改标题颜色
store.dispatch({ type: "UPDATE_CONTENT_TEXT", ContentText: "测试文字内容" });
