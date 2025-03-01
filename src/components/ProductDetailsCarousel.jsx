"use client"
import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ProductDetailsCarousel = ({product}) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {product?.data[0].image.map((img)=>(
              <img key={img.id} src={img.url} alt={img.name} />
            ))}
      </Carousel>

    </div>
  );
}

export default ProductDetailsCarousel;
