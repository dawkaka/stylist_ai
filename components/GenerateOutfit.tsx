import { Clothing } from "@/types";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi"
import { useQueries, useQuery, UseQueryResult } from "react-query";
import ClothingItem, { RecommendedItem } from "./Item";
import { Error } from "./misc";


const GenerateOutif: React.FC<{ close: () => void }> = ({ close }) => {
    const [step, setStep] = useState(0)
    const [occasion, setOccasion] = useState("")

    const { data, isLoading, isFetching, isError, isSuccess } = useQuery({
        queryKey: occasion,
        queryFn: () => axios.get(`/api/generate-outfit?occasion=${occasion}`).then(res => JSON.parse(res.data.text.replace("Response:", "").trim())),
        enabled: step === 1,
        staleTime: Infinity
    })
    const generateOutift = () => {
        setStep(1)
    }

    const topQuery = useQuery<Clothing>({ queryKey: ['wardrobe', data?.top], queryFn: () => axios.get(`/api/wardrobe/${data?.top}`).then(res => res.data), enabled: Boolean(data?.top) });
    const bottomQuery = useQuery<Clothing>({ queryKey: ['wardrobe', data?.bottom], queryFn: () => axios.get(`/api/wardrobe/${data?.bottom}`).then(res => res.data), enabled: Boolean(data?.bottom) });
    const footwearQuery = useQuery<Clothing>({ queryKey: ['wardrobe', data?.footwear], queryFn: () => axios.get(`/api/wardrobe/${data?.footwear}`).then(res => res.data), enabled: Boolean(data?.footwear) });
    const accessoryQuery = useQuery<Clothing>({ queryKey: ['wardrobe', data?.accessory], queryFn: () => axios.get(`/api/wardrobe/${data?.accessory}`).then(res => res.data), enabled: Boolean(data?.accessory) });

    return (
        <div
            onClick={close}
            className="fixed top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] w-full h-full flex flex-col items-center justify-center"
        >
            <div
                onClick={(e) => { e.stopPropagation() }}
                className="bg-white pt-4 w-full md:w-[min(90%,600px)] rounded-lg overflow-y-auto shadow-lg mt-[-20px]"
            >
                <div className="sticky top-0 flex w-full px-4 py-2 border-b items-center justify-between">

                    {
                        step > 0 ? <button onClick={() => setStep(0)}>
                            <BiArrowBack size={25} />
                        </button> : <span>{' '}</span>
                    }
                    {
                        step === 0 ?
                            <button
                                className="button px-4 py-1 shadow  rounded-lg"
                                onClick={generateOutift}
                            >
                                Generate</button> :
                            <span>{' '}</span>
                    }
                </div>
                <div className="flex flex-col px-4 w-full overflow-y-auto min-h-[50vh]  max-h-[80vh]">
                    {
                        step === 0 && (
                            <div className="flex flex-col p-4">
                                <label className="text-gray-600">What's the occasion?</label>
                                <input
                                    className="border rounded px-3 py-2 text-lg"
                                    placeholder="eg. An outfit to a wedding"
                                    value={occasion}
                                    onChange={(e) => setOccasion(e.target.value)}
                                />
                                <div>
                                    <h4 className="text-gray-900 mt-10">Examples</h4>
                                    <p className="text-sm text-gray-600">A casual outfit to a date</p>
                                    <p className="text-sm text-gray-600">Wedding</p>
                                    <p className="text-sm text-gray-600">A business meeting</p>
                                    <p className="text-sm text-gray-600">An awards show</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        step === 1 && (
                            <div className="w-full flex flex-col">
                                {
                                    isError && <Error message="Something went wrong" />
                                }
                                {
                                    (isLoading || isFetching) && (
                                        <>
                                            <p className="my-4 text-center text-gray-800">Generating outfit...</p>
                                            <div className="rounded-md p-4 max-w-sm w-full mx-auto">
                                                <div className="animate-pulse flex space-x-4">
                                                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                            </div>
                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                <div className="flex flex-col gap-4 mt-4">
                                    {topQuery.data && <h3 className="text-xl text-gray-900 font-semibold">✨Ai stylist recommendation✨</h3>}
                                    <p className="text-gray-800">{data?.generalInfo}</p>
                                    <div className="grid grid-cols-2 gap-10">
                                        {
                                            topQuery.data && <RecommendedItem  {...topQuery.data} />
                                        }
                                        {
                                            bottomQuery.data && <RecommendedItem   {...bottomQuery.data} />
                                        }
                                        {
                                            footwearQuery.data && <RecommendedItem  {...footwearQuery.data} />
                                        }
                                        {
                                            accessoryQuery.data && <RecommendedItem {...accessoryQuery.data} />
                                        }
                                    </div>
                                </div>


                            </div>
                        )
                    }
                </div>
            </div>

        </div >

    )
}

export default GenerateOutif