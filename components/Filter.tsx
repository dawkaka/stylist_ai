import { Filter as FilterType } from "@/types";
import { Select } from "./misc";

export default function Filter({ filters, filter, updateFilter }: { filter: FilterType, updateFilter: (filter: FilterType) => void, filters: { color: string[], brand: string[], fit: string[], type: string[] } }) {
    function dispatch({ type, payload }: { type: keyof FilterType, payload: string }) {
        const newState = { ...filter, [type]: payload.startsWith("Select") ? "" : payload }
        updateFilter(newState)
    }
    const val = filter
    return (
        <div className="flex items-center justify-center gap-10 mb-10 py-4">
            <div className="flex flex-wrap gap-4">
                <Select
                    id="Type"
                    onChange={(e) => {
                        dispatch({ type: "type", payload: e.target.value })
                    }}
                    value={val.type}
                    options={filters.type}
                />
                <Select
                    id="Fit"
                    onChange={(e) => {
                        dispatch({ type: "fit", payload: e.target.value })
                    }}
                    value={val.fit}
                    options={filters.fit}
                />
                <Select
                    id="Color"
                    onChange={(e) => {
                        dispatch({ type: "color", payload: e.target.value })
                    }}
                    value={val.color}
                    options={filters.color}
                />
                <Select
                    id="Brand"
                    onChange={(e) => {
                        dispatch({ type: "brand", payload: e.target.value })
                    }}
                    value={val.brand}
                    options={filters.brand}
                />
            </div>
        </div>
    )
}