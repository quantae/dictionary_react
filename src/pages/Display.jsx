import React, { useState } from "react";
import styles from "./display.module.css";
import "../styles/themes/darktheme.css";
import playIcon from "../aserts/icon-play.svg";
import playIconHover from "../aserts/icon-play-hover.svg";
import noDefImojo from "../aserts/no-def-imoji.png";
import { FontContext } from "../services/context/FontContext";
import { useContext } from "react";
import { ThemeContext } from "../services/context/themeContext";
import Intro from "../components/Intro";

export function PlayIconComponent({ onPlayClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const PlayIcon = () => (
    <img
      src={playIcon}
      alt="play icon"
      style={{ maxWidth: "70%" }}
      onClick={onPlayClick}
    />
  );
  const PlayIconHover = () => (
    <img
      src={playIconHover}
      alt="play icon"
      style={{ maxWidth: "70%" }}
      onClick={onPlayClick}
    />
  );
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isHovered ? <PlayIconHover /> : <PlayIcon />}
    </div>
  );
}
export const RenderMeaning = (meaning, index) => {
  return (
    <div key={index} className="">
      <div className={`flex-gap align-center ${styles.partofspeech_wrap}`}>
        <h5>{meaning.partOfSpeech}</h5>
        <div className={`hr ${styles.hr_styled}`}></div>
      </div>
      <div className={styles.word_meaning_wrap}>
        <h6 className="">Meaning</h6>
        <ul className="">
          {meaning.definitions.map((definition, definitionIndex) => (
            <li key={definitionIndex}>{definition.definition}</li>
          ))}
        </ul>
        <div className={styles.synonym_wrap}>
          <p className={` ${styles.synant}`}>synonyms</p>
          {/* {synonyms.map((synonym, synonymIndex) => (
          <ul className={styles.synonym_list}> <p key={synonymIndex}>{synonym}</p></ul>
       ))}*/}
          {meaning.synonyms.length === 0 ? (
            <span className={`inline ${styles.synant_list}`}> n/a</span>
          ) : (
            <span className={`inline ${styles.synant_list}`}>
              {" "}
              {meaning.synonyms.join(", ")}
            </span>
          )}
        </div>
        <div className={styles.synonym_wrap}>
          <p className={`inline ${styles.synant}`}>antonyms</p>
          {meaning.antonyms.length === 0 ? (
            <span className={`inline ${styles.synant_list}`}> n/a</span>
          ) : (
            <span className={`inline ${styles.synant_list}`}>
              {" "}
              {meaning.antonyms.join(", ")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const NoDefinitionFound = ({ data, searchWord }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div
      className={`${isDark ? styles.dark_no_definition : styles.no_definition}`}
    >
      <img src={noDefImojo} alt="noDefImojo" />
      <h4>{data.title} for "{searchWord}"</h4>
      <p>{data.message}</p>
      <p>{data.resolution}</p>
    </div>
  );
};

export const Display = ({ data }) => {
  // apply selected font here
  const { isDark } = useContext(ThemeContext);
  const { selectedFont } = useContext(FontContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [noAudio, setNoAudio] = useState(false);

  const responseData = data[0];

  // find phonetics text even if its position changes in the Array of objects.
  const phoneticsText = responseData.phonetics.find(
    (phonetic) => phonetic.text
  );

  // set the meanins array to a varable
  const meanings = responseData.meanings;
  //const synonyms = responseData.meanings.synonyms;

  // play audio handler
  const handlePlayAudioClick = () => {
    if (phoneticsText && phoneticsText.audio) {
      const audio = new Audio(phoneticsText.audio);
      audio.onplaying = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.play();
    } else {
     setNoAudio(true);
    } 
    setTimeout(() => {
      setNoAudio(false);
    },2000)
  };

  return (
    <div className={`${selectedFont} ${isDark ? "dark_theme" : ""}`}>
      <div className={styles.search_word}>
        <div className={styles.wordPhonetics}>
          <h1>{responseData.word}</h1>
          {phoneticsText ? (
            <h6>{phoneticsText.text}</h6>
          ) : (
            <h6>No phonetics</h6>
          )}
        </div>
        <div className="flex-right" style={{display:"flex", flexDirection:'column'}}>
          <PlayIconComponent onPlayClick={handlePlayAudioClick} />
          <div>
             {noAudio ? (
            <span>"No audio resources"</span>
          ) : (
            isPlaying && <span className="">playing...</span>
          )}
          </div>
         
        </div>
      </div>
      {meanings.map((meaning, index) => RenderMeaning(meaning, index))}
      <div className="hr"></div>
      <div className={`${styles.source_wrap}`}>
        <h6>source</h6>
        <a href={responseData.sourceUrls} target="_blank" rel="noopener noreferrer">
          {responseData.sourceUrls}
          <span>
            {" "}
            <i className="fa-solid fa-arrow-up-right-from-square fa-xs"></i>
          </span>
        </a>
      </div>
    </div>
  );
};

const WordCheckBeforeDisplay = ({ data, searchWord }) => {
  console.log("type of === object: ", typeof data);
  if (Array.isArray(data) && !data.length) {
    return (
      <div>
        <Intro />
      </div>
    );
  } else if (data.title) {
    console.log("data in === object: ", data);
    return (
      <div>
        <NoDefinitionFound data={data} searchWord={searchWord} />
      </div>
    );
  } else {
    return (
      <div>
        <Display data={data} />
      </div>
    );
  }
};

export default WordCheckBeforeDisplay;
