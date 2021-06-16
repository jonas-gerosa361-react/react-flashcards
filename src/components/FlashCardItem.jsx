import { AiOutlineEdit as EditIcon, AiOutlineDelete as DeleteIcon } from "react-icons/ai";

export default function FlashCardItem({
        children: flashCard,
        onDelete = null,
        onEdit = null,
    }) {
    const {title, description} = flashCard;

    function handleEditIconClick() {
        if (onEdit) {
            onEdit(flashCard);
        }
    }

    function handleDeleteIconClick() {
        if (onDelete) {
            onDelete(flashCard.id);
        }
    }
    
    return (
        <div className="border p-2 m-2">
            <dl className="flex flex-col space-y-4">
                <dt className="font-semibold">
                    {title}
                </dt>
                <dd>
                    {description}
                </dd>
            </dl>
            <div className="mt-2 flex flex-row justify-end space-x-2">
                <EditIcon onClick={handleEditIconClick} className="cursor-pointer" size={24} />
                <DeleteIcon onClick={handleDeleteIconClick} className="cursor-pointer" size={24} />
            </div>
        </div>
    )
}
