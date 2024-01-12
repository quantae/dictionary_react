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
  const [searchWord, setSearchWord] = useState("");

  // DARK MODE
useEffect(() => {
  if (isDark) {
    document.body.style.backgroundColor = "#050505";
  } else {
    document.body.style.backgroundColor = "#f5f7ff";
  }
 
}, [isDark]);

  // FORMIK SUBIT
  const handleSubmit = async (values, { setSubmitting }) => {
   
    setTimeout(() => {
      fetchWord(values.search).then((fetchedData) => {
        //fetchedData = JSON.stringify(fetchedData,undefined, 4)
        setSearchWord(values.search);
        console.log('searchWord variable',searchWord)

        
        setData(fetchedData);
        console.log("data from api: ", fetchedData);
        setSubmitting(false);
        console.log("word typed: ", values.search);
      });
    }, 100);
  };


  return (
    <div className={`${isDark ? "dark_theme" : "light_theme"}`}>
      <div className={`container`}>
        <TopBar />
        <SearchBar onSubmit={handleSubmit} />

        <WordCheckBeforeDisplay data={data} searchWord={searchWord} />
      </div>
    </div>
  );
}

export default App;
