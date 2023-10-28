import "./styles/defaultstyles.css";
import './styles/themes/darktheme.css'
import TopBar from "./components/TopBar";
import SearchBar from "./components/SearchBar";
import Display from "./pages/Display";
import { useContext, useState } from "react";
import fetchWord from "./services/utils/fetch";
import { Formik, Form, useField } from "formik";
import styles from './App.module.css'

import { ThemeContext} from "./services/context/themeContext";

function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState([]);
  const { isDark } = useContext(ThemeContext);

  const handleChange = (e) => {
    setWord(e.target.value);
    console.log(word)
  };

  // react submit
  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchWord(word).then((fetchedData) => {
      //fetchedData = JSON.stringify(fetchedData,undefined, 4)
      setData(fetchedData);
      console.log("data from api: ", fetchedData);
    });
    console.log("word typed: ", word);

    }; 
    */
   
    // FORMIK SUBIT
    const handleSubmit = async (values, { setSubmitting }) => {
   
      setTimeout(() => {
        fetchWord(values.search).then((fetchedData) => {
        //fetchedData = JSON.stringify(fetchedData,undefined, 4)
        setData(fetchedData);
        console.log("data from api: ", fetchedData);
        setSubmitting(false)
        console.log("word typed: ", values)
      });
      }, 100);
      
    };
  

  return (
    <div className={`${isDark ? "dark_theme" : "light_theme"}`}>
     
          <div className={`container`}>
            <TopBar />
            <SearchBar
             onSubmit={handleSubmit}
            />
            <Display data={data} definition={data} />
          </div>
       
    </div>
  );
}

export default App;
