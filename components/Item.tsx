import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Clothing } from "../types";
import { Input, Label, Select } from "./misc";


const ClothingItem: React.FC<Clothing> = (clothing) => {
    const [type, setType] = useState(clothing.type);
    const [description, setDescription] = useState(clothing.description);
    const [color, setColor] = useState(clothing.color);
    const [brand, setBrand] = useState(clothing.brand);
    const [fit, setFit] = useState(clothing.fit)
    const [edited, setEdited] = useState(false)

    const saveMutation = useMutation<AxiosResponse<any, any>, AxiosError<any, any>, Omit<Clothing, "image">>({
        mutationFn: (data) => axios.put(`/api/wardrobe/${clothing.id}`, data).then(res => res.data)
    });

    const handleSave = () => {
        saveMutation.mutate({
            id: clothing.id,
            type,
            description,
            color,
            brand,
            fit
        });
    };

    return (
        <div className="flex flex-col w-full shadow rounded-lg items-center p-4 justify-center bg-white">
            <div className="relative w-full mb-4 pt-[100%] bg-red-100">
                <img src={clothing.image} alt={clothing.type}
                    className="absolute top-0 left-0 w-full h-full w-mb-4"
                    style={{
                        objectFit: "cover"
                    }}
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col">
                        <Label htmlFor={`type-${clothing.id}`} label="Type" />
                        <Select
                            id={`type-${clothing.id}`}
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value)
                                setEdited(true)
                            }
                            }
                            options={["Top", "Bottom", "Footwear", "Underwear", "Dress", "Outerwear", "Accessory"]}
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor={`fit-${clothing.id}`} label="Fit" />
                        <Select
                            id={`fit-${clothing.id}`}
                            value={fit}
                            onChange={(e) => {
                                setFit(e.target.value)
                                setEdited(true)
                            }
                            }
                            options={["Regular", "Relaxed", "Loose", "Tight", "Oversized",]}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <Label htmlFor={`description-${clothing.id}`} label="Description" />
                    <Input
                        placeholder="A black jacket with long gold colored sleeves"
                        id={`description-${clothing.id}`}
                        type="text"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                            setEdited(true)
                        }
                        }
                    />

                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div
                        className="flex flex-col"
                    >
                        <Label htmlFor={`color-${clothing.id}`} label="Color" />
                        <Input
                            placeholder="white, black, red, pink"
                            id={`color-${clothing.id}`}
                            type="text"
                            value={color}
                            onChange={(e) => {
                                setColor(e.target.value)
                                setEdited(true)
                            }
                            }
                        />
                    </div>
                    <div
                        className="flex flex-col"
                    >
                        <Label htmlFor={`brand-${clothing.id}`} label="Brand" />
                        <Input
                            placeholder="e.g Gucci, Lacorste, Loui vuitton"
                            id={`brand-${clothing.id}`}
                            type="text"
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.target.value)
                                setEdited(true)
                            }
                            }
                        />
                    </div>
                </div>


                {
                    edited && <div className="flex flex-col">
                        <button
                            onClick={handleSave}
                            className="flex py-1 justify-center rounded bg-green-500 text-white"
                        >
                            Save Changes
                        </button>

                    </div>
                }
            </div>
        </div >
    );
};

export default ClothingItem;
