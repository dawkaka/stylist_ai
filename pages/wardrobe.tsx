import { useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { HiViewGridAdd } from "react-icons/hi"
import DragAndDrop from "@/components/AddClothes";
import ClothingItem from "@/components/Item";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Clothing } from "@/types";
import { Error, Loader } from "@/components/misc";
import GenerateOutif from "@/components/GenerateOutfit";

export default function Wardrobe({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { image, name } = user
    const [openAdd, setOpenAdd] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const fetchClothes = ({ pageParam = 0 }) => axios.get(`/api/wardrobe?page=${pageParam}`).then(res => res.data)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isError,
        isLoading,
        isFetching,
    } = useInfiniteQuery(["wardrobe"], fetchClothes,
        {
            getNextPageParam: (lastPage) => {
                if (lastPage) {
                    if (!lastPage || lastPage.isEnd) {
                        return undefined
                    }
                }
                return lastPage.next
            },
        })

    let clothes: Clothing[] = []
    if (data && data.pages) {
        for (let page of data.pages) {
            if (page.clothes) {
                clothes = clothes.concat(page.clothes)
            }
        }
    }

    return (
        <div className="min-h-screen">
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

                        <div
                            role="button"
                            onClick={() => setOpenAdd(true)}
                            className="pointer w-full flex justify-between items-center  bg-green-500 text-white px-6 py-4 font-normal rounded-lg dark:text-white hover:bg-green-600">
                            <span className="flex-1 whitespace-nowrap text-xl">Add clothes</span>
                            <HiViewGridAdd size={30} />
                        </div>
                        <div className="flex justify-center mt-16">
                            <button
                                onClick={() => setOpenCreate(true)}
                                className="rounded-full bg-green-500 px-4 py-2 flex items-center gap-2 shadow"
                            >
                                <span className="text-xl text-white">Generate</span>
                                <svg height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 507.733 507.733"
                                    xmlSpace="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                        stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g transform="translate(1)">
                                            <path style={{ fill: "#C49AE9" }}
                                                d="M379.587,127.147c10.24,10.24,10.24,26.453,0,35.84L268.653,273.92l-0.853-0.853l-34.987-34.987 l0.853-0.853l110.08-110.08C353.133,116.907,369.347,116.907,379.587,127.147"></path>
                                            <path fill="#ECF4F7"
                                                d="M268.653,273.92L46.787,495.787c-10.24,10.24-26.453,10.24-35.84,0 c-10.24-10.24-10.24-26.453,0-35.84L232.813,238.08l34.987,34.987L268.653,273.92z"></path>
                                            <circle fill="#FFD0A1" cx="199.533" cy="68.267" r="8.533"></circle> <g> <circle fill="#7EE1E6;" cx="438.467" cy="179.2" r="8.533"></circle>
                                                <circle fill="#7EE1E6" cx="395.8" cy="8.533" r="8.533"></circle> </g> <g> <circle fill="#C49AE9" cx="498.2" cy="119.467" r="8.533"></circle>
                                                <circle fill="#C49AE9" cx="165.4" cy="179.2" r="8.533"></circle> </g> </g> <path fill="#51565F"
                                                    d="M29.867,507.733c-7.68,0-15.36-2.56-21.333-8.533C2.56,493.227,0,486.4,0,477.867 c0-8.533,3.413-15.36,8.533-21.333L230.4,234.667c0.853-0.853,1.707-0.853,3.413-0.853l0,0c0.853,0,2.56,0.853,3.413,0.853 l13.653,13.653c1.707,1.707,1.707,4.267,0,5.973c-1.707,1.707-4.267,1.707-5.973,0L233.813,243.2L15.36,461.654 c-4.267,4.267-5.973,9.387-5.973,15.36c0,5.973,2.56,11.093,5.973,15.36c8.533,8.533,22.187,8.533,29.867,0l332.8-332.8 c4.267-4.267,5.973-9.387,5.973-15.36s-2.56-11.093-5.973-15.36c-8.533-8.533-22.187-8.533-29.867,0l-86.187,86.187 c-1.707,1.707-4.267,1.707-5.973,0s-1.707-4.267,0-5.973l86.187-86.187c11.947-11.947,30.72-11.947,41.813,0 c5.973,5.973,8.533,12.8,8.533,21.333c0,8.533-3.413,15.36-8.533,21.333l-332.8,332.8C45.227,505.173,37.547,507.733,29.867,507.733 z M320,345.6c-2.56,0-4.267-1.707-4.267-4.267v-4.267h-4.267c-2.56,0-4.267-1.707-4.267-4.267s1.707-4.267,4.267-4.267h4.267v-4.267 c0-2.56,1.707-4.267,4.267-4.267c2.56,0,4.267,1.707,4.267,4.267v4.267h4.267c2.56,0,4.267,1.707,4.267,4.267 s-1.707,4.267-4.267,4.267h-4.267v4.267C324.267,343.893,322.56,345.6,320,345.6z M482.133,320c-2.56,0-4.267-1.707-4.267-4.267 v-12.8h-12.8c-2.56,0-4.267-1.707-4.267-4.267s1.707-4.267,4.267-4.267h12.8v-12.8c0-2.56,1.707-4.267,4.267-4.267 s4.267,1.707,4.267,4.267v12.8h12.8c2.56,0,4.267,1.707,4.267,4.267s-1.707,4.267-4.267,4.267h-12.8v12.8 C486.4,318.293,484.693,320,482.133,320z M362.667,285.867c-2.56,0-4.267-1.707-4.267-4.267v-42.667c0-2.56,1.707-4.267,4.267-4.267 s4.267,1.707,4.267,4.267V281.6C366.933,284.16,365.227,285.867,362.667,285.867z M439.467,226.133c-0.853,0-2.56,0-3.413-0.853 l-28.16-28.16c-1.707-1.707-1.707-4.267,0-5.973c1.707-1.707,4.267-1.707,5.973,0l28.16,28.16c1.707,1.707,1.707,4.267,0,5.973 C442.027,226.133,440.32,226.133,439.467,226.133z M499.2,149.333h-68.267c-2.56,0-4.267-1.707-4.267-4.267 c0-2.56,1.707-4.267,4.267-4.267H499.2c2.56,0,4.267,1.707,4.267,4.267C503.467,147.627,501.76,149.333,499.2,149.333z M268.8,149.333h-42.667c-2.56,0-4.267-1.707-4.267-4.267c0-2.56,1.707-4.267,4.267-4.267H268.8c2.56,0,4.267,1.707,4.267,4.267 C273.067,147.627,271.36,149.333,268.8,149.333z M140.8,149.333c-2.56,0-4.267-1.707-4.267-4.267v-12.8h-12.8 c-2.56,0-4.267-1.707-4.267-4.267c0-2.56,1.707-4.267,4.267-4.267h12.8v-12.8c0-2.56,1.707-4.267,4.267-4.267 c2.56,0,4.267,1.707,4.267,4.267v12.8h12.8c2.56,0,4.267,1.707,4.267,4.267c0,2.56-1.707,4.267-4.267,4.267h-12.8v12.8 C145.067,147.627,143.36,149.333,140.8,149.333z M411.307,100.693c-0.853,0-2.56,0-3.413-0.853c-1.707-1.707-1.707-4.267,0-5.973 l28.16-28.16c1.707-1.707,4.267-1.707,5.973,0c1.707,1.707,1.707,4.267,0,5.973l-28.16,28.16 C413.013,100.693,412.16,100.693,411.307,100.693z M314.027,100.693c-0.853,0-2.56,0-3.413-0.853l-28.16-28.16 c-1.707-1.707-1.707-4.267,0-5.973c1.707-1.707,4.267-1.707,5.973,0l28.16,28.16c1.707,1.707,1.707,4.267,0,5.973 C316.587,100.693,315.733,100.693,314.027,100.693z M362.667,81.067c-2.56,0-4.267-1.707-4.267-4.267V8.533 c0-2.56,1.707-4.267,4.267-4.267s4.267,1.707,4.267,4.267V76.8C366.933,79.36,365.227,81.067,362.667,81.067z M490.667,72.533 c-2.56,0-4.267-1.707-4.267-4.267V64h-4.267c-2.56,0-4.267-1.707-4.267-4.267c0-2.56,1.707-4.267,4.267-4.267h4.267V51.2 c0-2.56,1.707-4.267,4.267-4.267s4.267,1.707,4.267,4.267v4.267h4.267c2.56,0,4.267,1.707,4.267,4.267 c0,2.56-1.707,4.267-4.267,4.267h-4.267v4.267C494.933,70.827,493.227,72.533,490.667,72.533z M226.133,38.4 c-2.56,0-4.267-1.707-4.267-4.267v-4.267H217.6c-2.56,0-4.267-1.707-4.267-4.267s1.707-4.267,4.267-4.267h4.267v-4.267 c0-2.56,1.707-4.267,4.267-4.267s4.267,1.707,4.267,4.267v4.267h4.267c2.56,0,4.267,1.707,4.267,4.267s-1.707,4.267-4.267,4.267 H230.4v4.267C230.4,36.693,228.693,38.4,226.133,38.4z">
                                        </path> </g></svg>
                            </button>
                        </div>

                    </div>
                </div>
            </aside>
            {
                (!isError && !isLoading && clothes.length === 0) ? (
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
                    <div className="p-4 sm:ml-64 grid grid-cols-1 max-[600px]:grid-cols-1 max-[601px]:grid-cols-2 min-[850px]:grid-cols-1 min-[851px]:grid-cols-2 min-[1151px]:grid-cols-3 bg-gray-50 flex-wrap gap-4 sm:gap-10">
                        {
                            clothes.map((clothe, ind) => <ClothingItem
                                key={ind}
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