import { useState } from "react";
import TextArea from "./TextArea";
import TextInput from "./TextInput";

export default function FlashcardForm({
        createMode = true,
        flashCard = null
    }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function handleTitleChange(newTitle) {
        setTitle(newTitle);
    }

    function handleDescriptionChange(newDescription) {
        setDescription(newDescription);
    }

    return (
        <div className="mt-2 flex flex-col">
            <div className="text-center">
                <span className="font-semibold bg-yellow-200 p-2 rounded-md">
                    {
                        createMode ? 'Modo de Criação' : 'Modo de Edição'
                    }
                </span>
            </div>
            <div>
                <form>
                    <TextInput onInputChange={handleTitleChange} inputValue={title} labelDescription="Titulo" />
                    <TextArea onChange={handleDescriptionChange} value={description}  labelDescription="Descrição" />
                </form>
            </div>
        </div>
    )
}
