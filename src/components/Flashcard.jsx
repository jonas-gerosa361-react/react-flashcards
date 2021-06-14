import { useEffect, useState } from "react"

export default function Flashcard({
        title = 'Default title',
        description = 'Default description, which could have a lot of words',
        showTitle = true
    }) {

        useEffect(() => {
            setShowtitle(showTitle);
        }, [showTitle]);
    

        const [showLocalTitle, setShowtitle] = useState(showTitle);
        
        function handleFlashcardClick() {
            setShowtitle(showTitle => !showTitle);
        }

        const fontSizeClassName = showLocalTitle ? 'text-xl' : 'text-md';

        return (
            <div className={`shadow-xl p-4 m-2 h-64 w-72
                            flex flex-row justify-center items-center
                            font-semibold font-mono ${fontSizeClassName}`}
                            onClick={handleFlashcardClick}
                            >
                {showLocalTitle ? title : description}
            </div>
        )
}
