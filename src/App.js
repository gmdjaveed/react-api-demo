import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import Posts from "./components/Posts";

function App() {
  // return (
  //   <div className="App">
  //     <Posts></Posts>
  //   </div>
  // );
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <Posts></Posts>
        </div>
      </div>
    </div>
  );
}

export default App;
