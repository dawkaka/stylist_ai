import { ChangeEvent, useEffect, useRef } from "react"

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

export function Error({ message }: { message: string }) {
    return (
        <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Error</span>
            <p>
                {message}
            </p>
        </div>
    )
}

export function Loading() {
    return (

        <div role="status" className="w-full flex justify-center self-center">
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>

    )
}

export const Loader: React.FC<{ loadMore: () => void, hasNext: boolean, isFetching: boolean }> = ({ loadMore, hasNext, isFetching }) => {
    const loaderRef = useRef(null)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMore()
                }
            },
            { threshold: 0.5 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={loaderRef}>
            {hasNext && (
                <div style={{ width: "100%", textAlign: "center", paddingBlock: "var(--gap-quarter)", display: "flex", justifyContent: "center" }}>
                    {!isFetching ?
                        <button onClick={() => loadMore()}>Load more</button>
                        :
                        <Loading />
                    }

                </div>
            )
            }
        </div>
    )
}


export const Input: React.FC<{ onChange: (e: ChangeEvent<HTMLInputElement>) => void, value: string, type: string, id: string, placeholder: string }> = ({ type, onChange, value, placeholder, id }) => {
    return (
        <input
            className="border py-1 rounded px-2 text-gray-600 outline-none focus:border-green-500"
            style={{
                borderColor: value === "" ? "tomato" : ""
            }}
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
            <option value=''>{id.split("-")[0]}</option>
            {
                options.map(o => <option key={o} value={o}>{o}</option>)
            }
        </select>
    )
}