import { createContext, useState } from "react";

const FontContext = createContext(undefined);
const FontProvider = ({children}) => {
    const [selectedFont, setSelectedFont] = useState('sans serif');


    return (
        <FontContext.Provider value={{selectedFont, setSelectedFont}}>
            {children}
        </FontContext.Provider>
    );
}

export {FontContext, FontProvider};