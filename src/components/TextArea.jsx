import { getNewId } from "../services/idService";

export default function TextArea({
  labelDescription = 'Descrição do label:',
  value = 'Valor padrão do input',
  onChange = null,
  id = getNewId(),
  rows = 4,
  maxLength = 230,
}) {
  function handleInputChange({ currentTarget }) {
    if (onChange) {
      const newValue = currentTarget.value;
      onChange(newValue);
    }
  }

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>

      <textarea
        id={id}
        maxLength={maxLength}
        rows={rows}
        className="border p-1"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
}