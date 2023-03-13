import { useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { HiViewGridAdd } from "react-icons/hi"
import DragAndDrop from "@/components/AddClothes";
import ClothingItem from "@/components/Item";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Clothing, Filter as FitlerType } from "@/types";
import { Error, Label, Loader, Select } from "@/components/misc";
import GenerateOutif from "@/components/GenerateOutfit";
import Filter from "@/components/Filter";

export default function Wardrobe({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { image, name } = user
    const [openAdd, setOpenAdd] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [filter, setFilter] = useState<FitlerType>({ fit: "", color: "", brand: "", type: "" })
    const queryClient = useQueryClient()
    const noFilter = Object.values(filter).every(v => v === "")

    const fetchClothes = ({
        pageParam = 0
    }) => axios.get(`/api/wardrobe?page=${pageParam}&color=${filter.color}&type=${filter.type}&brand=${filter.brand}&fit=${filter.fit}`).then(res => res.data)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isError,
        isLoading,
        isFetching,
        refetch
    } = useInfiniteQuery("wardrobe", fetchClothes,
        {
            getNextPageParam: (lastPage) => {
                if (lastPage) {
                    if (!lastPage || lastPage.isEnd) {
                        return undefined
                    }
                }
                return lastPage.nextFetch
            },
        }
    )

    let clothes: Clothing[] = []
    if (data && data.pages) {
        for (let page of data.pages) {
            if (page.clothes) {
                clothes = clothes.concat(page.clothes)
            }
        }
    }

    const { data: filters } = useQuery({
        queryKey: "filters",
        queryFn: () => axios.get("/api/filters").then(res => res.data)
    })

    const handleFilter = (filter: FitlerType) => {
        setFilter(filter)
        setTimeout(() => refetch(), 1)
    }
    return (
        <div className="relative min-h-screen">
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 border-r z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="w-full h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div className="flex flex-col gap-5">
                        <div className="flex py-10 justify-between  items-center border-b overflow-x-hidden">
                            <img
                                src={image!}
                                alt={"your profile picture"}
                                style={{
                                    height: "70px",
                                    width: "70px"
                                }}
                                className="border rounded-full"
                            />
                            <p className="p-2 text-base font-bold text-lg text-gray-900 rounded-lg dark:text-white">
                                {name}
                            </p>
                        </div>

                        <div className="flex justify-center mt-16">
                            <button
                                onClick={() => setOpenCreate(true)}
                                className="rounded-full bg-green-500 px-4 py-2 flex items-center gap-2 shadow"
                            >
                                <span className="text-xl text-white">Generate</span>
                                <span className="text-2xl">🪄</span>
                            </button>
                        </div>

                    </div>
                </div>
            </aside>
            <div
                role="button"
                onClick={() => setOpenAdd(true)}
                className="fixed bottom-10 right-10 pointer z-10 flex justify-between items-center bg-green-500 text-white px-6 py-4 font-normal rounded-lg hover:bg-green-600">
                <span className="flex-1 whitespace-nowrap text-xl">Add clothes</span>
                <HiViewGridAdd size={30} />
            </div>
            {
                (!isError && !isLoading && clothes.length === 0 && noFilter) ? (
                    <div className="flex flex-col w-full items-center justify-center gap-8 pt-16">
                        <div className="flex flex-col items-center gap-2">
                            <h4 className="font-bold text-3xl text-[var(--accents-8)] text-center">Your Wardrobe is Empty</h4>
                            <p className="max-w-[400px] text-center text-[var(--accents-6)]">
                                Add more clothes to your wardrobe and they'll appear here!
                            </p>
                        </div>
                        <button
                            onClick={() => setOpenAdd(true)}
                            className="rounded-full bg-green-500 px-4 py-2 flex items-center gap-2 shadow"
                        >
                            <svg width="22px" height="22px" viewBox="0 0 24 24" fill="var(--primary-darker)" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                                    <path
                                        fill="white"
                                        d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z"
                                    >
                                    </path>
                                </g>
                            </svg>
                            <span className="text-xl text-white">Add clothes</span>
                        </button>
                    </div>
                ) : (
                    <div className="p-4 sm:ml-64  bg-gray-50">
                        {filters && <Filter filters={filters} updateFilter={handleFilter} filter={filter} />}
                        <div className="grid grid-cols-1 max-[600px]:grid-cols-1 max-[601px]:grid-cols-2 min-[850px]:grid-cols-1 min-[851px]:grid-cols-2 min-[1151px]:grid-cols-3 gap-4 sm:gap-10">

                            {
                                clothes.map((clothe, ind) => <ClothingItem
                                    key={clothe.id}
                                    {...clothe}
                                />)
                            }

                            {
                                hasNextPage ? <Loader loadMore={() => fetchNextPage()} hasNext={hasNextPage} isFetching={isFetching} /> : null
                            }
                            {
                                isError && <Error message={"Something went wrong"} />
                            }
                        </div>
                    </div>

                )
            }

            {openAdd && <DragAndDrop close={() => setOpenAdd(false)} />}
            {openCreate && <GenerateOutif close={() => setOpenCreate(false)} />}

        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session || !session.user) {
        return { redirect: { destination: "/auth/signin" } };
    }
    return {
        props: { user: session.user },
    }
}