import React from 'react'
import Image from "next/image";
import Link from "next/link";
import {getDiscountedPricePercentage} from '../../utils/helper'

const Productcard = ({data}) => {



  return (
    <Link className='transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer' href={`/product/${data.slug}`}>
        <Image
            width={500}
            height={500}
            src={data.Thumbnail[0].url}
            alt={data.name}
        />
        <div className="p-4 text-black/[0.9]">
                <h2 className="text-lg font-medium">{data.name}</h2>
                <div className="flex items-center text-black/[0.5]">
                    <p className="mr-2 text-lg font-semibold">
                        &#8377;{data.Price}
                    </p>

                    {data.original_price && (
                        <>
                            <p className="text-base  font-medium line-through">
                                &#8377;{data.original_price}
                            </p>
                            <p className="ml-auto text-base font-medium text-green-500">
                                {getDiscountedPricePercentage(
                                    data.original_price,
                                    data.Price
                                )}
                                % off
                            </p>
                        </>
                    )}
                </div>
            </div>
    </Link>
  )
}

export default Productcard
