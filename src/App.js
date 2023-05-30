import { Categories } from "./components/Categories";
import { Header } from "./components/Header";
import { Sort } from "./components/Sort";
import { ContentItems } from "./components/ContentItems";
import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <ContentItems />
        </div>
      </div>
    </div>
  );
}

export default App;
