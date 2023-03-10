import { ChangeEvent } from "react"

export const Label: React.FC<{ label: string, htmlFor: string }> = ({ label, htmlFor }) => {
    return (
        <label
            className="text-sm text-gray-500"
            htmlFor={htmlFor}
        >
            {label}
        </label>
    )
}


export const Input: React.FC<{ onChange: (e: ChangeEvent<HTMLInputElement>) => void, value: string, type: string, id: string, placeholder: string }> = ({ type, onChange, value, placeholder, id }) => {
    return (
        <input
            className="border rounded px-2 text-gray-600 outline-none focus:border-green-500"
            type={type}
            value={value}
            id={id}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}