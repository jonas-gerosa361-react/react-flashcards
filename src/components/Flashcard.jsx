export default function Flashcard({
        id,
        title = 'Default title',
        description = 'Default description, which could have a lot of words',
        showTitle = true,
        onCardClick = null
    }) {

        function handleFlashcardClick() {
            if(onCardClick) {
                onCardClick(id);
            }
        }

        const fontSizeClassName = showTitle ? 'text-xl' : 'text-md';

        return (
            <div className={`shadow-xl p-4 m-2 h-64 w-72
                            flex flex-row justify-center items-center
                            font-semibold font-mono ${fontSizeClassName}`}
                            onClick={handleFlashcardClick}
                            >
                {showTitle ? title : description}
            </div>
        )
}
