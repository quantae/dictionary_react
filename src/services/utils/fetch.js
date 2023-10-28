const searchWord = (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    return url;
}
const fetchWord = async (word) => {
    try {
        const response = await fetch(searchWord(word));
        const data = await response.json();
        return data
    } catch (err){
        console.error(err)
    }
}

export default fetchWord;