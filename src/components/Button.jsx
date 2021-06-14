export default function Button({
        children: description = 'Button description',
        onButtonClick = null
    }) {

        function handleButtonClick() {
            if (onButtonClick) {
                onButtonClick();
            }
        }
        return (
            <button className="bg-yellow-200 p-2" 
                onClick={handleButtonClick}
            >
                {description}
            </button>
        )
}
