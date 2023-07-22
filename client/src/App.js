import logo from "./logo.svg";
import TextSender from "./component/TextSender";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TextSender />
      </header>
    </div>
  );
}

export default App;
