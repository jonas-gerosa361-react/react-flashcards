import { getNewId } from "../services/idService";

export default function RadioButton({
        id = getNewId(),
        children: description = "Radio Button Description",
        name = 'RadioButtonName',
        checked = false,
        onRadioClick = null
    }) {
    
        function handleRadioClick() {
            if (onRadioClick) {
                onRadioClick();
            }
        }

        return (
            <div className="space-x-2">
                <input onChange={handleRadioClick} checked={checked} type="radio" name={name} id={id} />
                <label htmlFor={id}>{description}</label>
            </div>
        )
}
