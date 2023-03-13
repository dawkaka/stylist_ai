import { Select } from "./misc";

export default function Filter() {
    return (
        <div className="flex items-center justify-center gap-10 mb-10 py-4">
            <h4 className="text-gray-900 font-bold">Filter:</h4>
            <div className="flex gap-4">
                <Select
                    id="Type"
                    onChange={() => { }}
                    value={""}
                    options={["Top", "Bottom", "Footwear", "Underwear", "Dress", "Outerwear", "Accessory"]}
                />
                <Select
                    id="Fit"
                    onChange={() => { }}
                    value={""}
                    options={["Regular", "Relaxed", "Loose", "Tight", "Oversized"]}
                />
                <Select
                    id="Color"
                    onChange={() => { }}
                    value={""}
                    options={["Regular", "Relaxed", "Loose", "Tight", "Oversized"]}
                />
                <Select
                    id="Brand"
                    onChange={() => { }}
                    value={""}
                    options={["Regular", "Relaxed", "Loose", "Tight", "Oversized"]}
                />
            </div>
        </div>
    )
}