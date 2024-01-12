import "./styles/defaultstyles.css";
import "./styles/themes/darktheme.css";
import TopBar from "./components/TopBar";
import SearchBar from "./components/SearchBar";
import { useContext, useState, useEffect } from "react";
import fetchWord from "./services/utils/fetch";
import { ThemeContext } from "./services/context/themeContext";
import WordCheckBeforeDisplay from "./pages/Display";

function App() {
  const [data, setData] = useState([]);
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
  
    document.body.style.backgroundColor = "#f5f7ff";
}, []);

  // FORMIK SUBIT
  const handleSubmit = async (values, { setSubmitting }) => {
    setTimeout(() => {
      fetchWord(values.search).then((fetchedData) => {
        //fetchedData = JSON.stringify(fetchedData,undefined, 4)
        setData(fetchedData);
        console.log("data from api: ", fetchedData);
        setSubmitting(false);
        console.log("word typed: ", values);
      });
    }, 100);
  };

  return (
    <div className={`${isDark ? "dark_theme" : "light_theme"}`}>
      <div className={`container`}>
        <TopBar />
        <SearchBar onSubmit={handleSubmit} />

        <WordCheckBeforeDisplay data={data} />
      </div>
    </div>
  );
}

export default App;
