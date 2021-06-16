export default function Error({children: errorMessage}) {
    return (
        <span className="p-2 flex justify-center bg-red-200 text-red-900 font-semibold">
            {errorMessage}
        </span>
    )
}
