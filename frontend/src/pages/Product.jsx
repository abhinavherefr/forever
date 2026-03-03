import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import { RelatedProducts } from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('') //First image
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    
    products.map((item) => {
      if(item._id === productId){
        setProductData(item);
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* -----Product Data----- */}
      <div className="flex gap-12 flex-col sm:gap-12 sm:flex-row">
        {/* ------Product Images------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img  src={image} className='w-full h-auto' alt="" />
          </div>
        </div>

        {/* ------ PRODUCT INFO ------ */}

        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
          <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className="">{productData.description}</p>
          
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                  <button onClick={() => { setSize(item) }} key={index} className={`border py-2 px-4 cursor-pointer bg-gray-100 ${item == size ? 'border-[#c586a5]' : ''}`}>{item}</button>
              ))}
            </div>
          </div>

          <button onClick={() => { addToCart(productData._id,  size) }} className='bg-[#c586a5] text-white text-sm px-8 py-3 active:bg-gray-500'>ADD TO CART</button>
          <hr className='mt-8 w-4/5' />
          
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery available.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>

        </div>

      </div>

      {/* Description and review section */}

      <div className="mt-20">
        <div className="flex">
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border py-6 px-6 text-sm text-gray-500">
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit itaque libero earum nihil? Ab possimus recusandae et ad voluptatibus culpa architecto expedita nisi provident id! Odio blanditiis tempore rem unde modi necessitatibus, eligendi vitae magnam dignissimos quibusdam quis! Molestias explicabo officiis tempore aliquid quae ipsa eaque tenetur consequuntur pariatur impedit quo, numquam reiciendis maiores ad qui error id nam dignissimos aspernatur dolor eveniet! Iste soluta autem, perspiciatis dolore similique optio.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quibusdam distinctio consequatur maxime, culpa explicabo neque blanditiis! Eum sit id adipisci suscipit tempore similique itaque officiis. Eum vitae molestias eaque quisquam maxime. Quaerat beatae molestias illo aliquam minus dolorum recusandae autem vitae sint suscipit quidem saepe atque porro, vero consequatur.</p>
        </div>
      </div>
      

      {/* ------- Display related products ---------  */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

      
    </div>
  ) : <div className="opacity-0"></div>
}

export default Product