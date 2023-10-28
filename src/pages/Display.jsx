import React from "react";
import style from "./display.module.css";
import  '../styles/themes/darktheme.css'
import { ReactComponent as PlayIcon } from "../aserts/icon-play.svg";
import playIconImg from '../aserts/icon-play.svg'
import { FontContext } from "../services/context/FontContext";
import { useContext } from "react";
import { darkThemeStyle } from "../styles/themes/darkTheme";
import { ThemeContext } from "../services/context/themeContext";
import { useMemo } from "react";

export const RenderMeaning = (meaning, index) => {
  
  return (
    <div key={index} className="">
      <div className={`flex-gap align-center ${style.partofspeech_wrap}`}>
        <h5>{meaning.partOfSpeech}</h5>
        <div className={`hr ${style.hr_styled}`}></div>
      </div>
      <div className={style.word_meaning_wrap}>
        <h6 className="">Meaning</h6>
        <ul className="">
         {meaning.definitions.map((definition, definitionIndex) => (
          <li key={definitionIndex}>{definition.definition}</li>
        ))}
        </ul>
        <div className={style.synonym_wrap}>
           <p className={` ${style.synant}`}>synonyms</p>
       {/* {synonyms.map((synonym, synonymIndex) => (
          <ul className={style.synonym_list}> <p key={synonymIndex}>{synonym}</p></ul>
       ))}*/}
       {meaning.synonyms.length === 0 ? (
        <span className={`inline ${style.synant_list}`}> n/a</span>
       ) : (
        <span className={`inline ${style.synant_list}`}> {meaning.synonyms.join(": ")}</span>
       )}
        </div>
       <div className={style.synonym_wrap}>
        <p className={`inline ${style.synant}`}>antonyms</p>
        {meaning.antonyms.length === 0 ? (
          <span className={`inline ${style.synant_list}`}> n/a</span>
        ) : (
          <span className={`inline ${style.synant_list}`}> {meaning.antonyms.join(": ")}</span>
        )}
       </div>
      </div>
    </div>
  )
}
const Display = ({data}) => {

  // apply selected font here 
  const {isDark} = useContext(ThemeContext)
  const {selectedFont} = useContext(FontContext)
 

  
  const responseData =  data[0];
  // Check if the data array is empty
  if (!data.length) { 
    return (
      <div>
        <p>Type a word</p>
      </div>
    );
  }
  
  // find phonetics text even if its position changes in the Array of objects. 
  const phoneticsText = responseData.phonetics.find(phonetic => phonetic.text)
  
  // set the meanins array to a varable
  const meanings = responseData.meanings;
  //const synonyms = responseData.meanings.synonyms;

  return (
    <div className={`${selectedFont} ${isDark ? 'dark_theme': ''}`}>
      <div className={style.search_word}>
        <div className={style.wordPhonetics}>
          <h1>{responseData.word}</h1>
          {phoneticsText ? (
            <h6>{phoneticsText.text}</h6>
          ) : (
            <h6>No phonetics</h6>
          )}
        </div>
        <div className="flex-right">
          <img src={playIconImg} alt="play icon" style={{maxWidth:'70%'}}/>
         
        </div>
      </div>
      {meanings.map((meaning, index) => RenderMeaning(meaning, index))}
      <div className="hr"></div>
      <div className={`${style.source_wrap}`}>
        <h6>source</h6>
        <a href={responseData.sourceUrls}>{responseData.sourceUrls}<span> <i className="fa-solid fa-arrow-up-right-from-square fa-xs"></i></span></a>

      </div>
    </div>
  );
};

export default Display;
