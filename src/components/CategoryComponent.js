'use client'
import useSWR from 'swr'
import { useState } from 'react'
import React, { useEffect } from 'react'
import Productcard from './Productcard'
import { useRouter } from 'next/navigation'
import { fetchDataFromApi } from '../../utils/api';

const CategoryComponent = ({slug, maxResult, products}) => { 
    const [pageIndex, setPageIndex]=useState(1)
    const {data, error, isLoading} = useSWR(`/api/products?populate=*&[filters][category][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`, fetchDataFromApi,
    {
        fallback:products
    })
    const {query}=useRouter();

    useEffect(()=>{
        setPageIndex(1)
    }, [query])   

    
    return(
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14
                        px-5 md:px-0">                            
                            {data?.data?.map((p)=>(
                                <Productcard key={p?.id} data={p}/>
                            ))}
                </div>   
            
            {data?.meta?.pagination.total > maxResult && (
                <div className="flex gap-3 items-center justify-center my-16 md:my-0">
                    <button
                        className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                        disabled={pageIndex === 1}
                        onClick={() => setPageIndex(pageIndex - 1)}
                    >
                        Previous
                    </button>

                    <span className="font-bold">
                        {`${pageIndex} of ${
                        data && data.meta.pagination.pageCount
                        }`}
                    </span>

                    <button
                        className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                        disabled={
                            pageIndex ===
                            (data && data.meta.pagination.pageCount)
                        }
                        onClick={() => setPageIndex(pageIndex + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
            {/* PAGINATION BUTTONS END */}
            {isLoading && (
                <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
                    <img src="/Null_logo_defined.png" width={150} />
                    <span className="text-2xl font-medium">Loading...</span>
                </div>
            )}
        </div>
    )
}

export default CategoryComponent