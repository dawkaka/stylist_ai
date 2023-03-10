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
            className="border py-1 rounded px-2 text-gray-600 outline-none focus:border-green-500"
            type={type}
            value={value}
            id={id}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

export const Select: React.FC<{
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void, options: string[],
    value: string, id: string,
}> = ({ id, onChange, options, value }) => {
    return (
        <select
            placeholder="Select"
            className="border bg-white py-[6px] rounded px-2 text-gray-600 outline-none focus:border-green-500"
            onChange={onChange}
            value={value}
        >
            <option value=''>Select {id.split("-")[0]}</option>
            {
                options.map(o => <option value={o}>{o}</option>)
            }
        </select>
    )
}