import CategoryComponent from '@/components/CategoryComponent'
import Wrapper from '@/components/Wrapper'
import { fetchDataFromApi } from '../../../../utils/api'

const maxResult = 10

export default async function Category({ params }) {

  const {slug}= await params
  const category = await fetchDataFromApi(`/api/categories?filters[slug][$eq]=${slug}`);
  const products = await fetchDataFromApi(`/api/products?populate=*&[filters][category][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`); 
  
    
    return (
        <div className='w-full md:py-20 relative'>
          <Wrapper className="">            
              <div className='text-center max-w-[800px] mx-auto mt-8 md:mt-0'>
                  <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
                      {category?.data[0].name}
                  </div>                  
                  <CategoryComponent slug={slug} products={products} maxResult={maxResult} />
              </div>            
          </Wrapper>
        </div>        
    )
}









