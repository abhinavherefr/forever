import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Forever was created with one simple idea — to make everyday fashion feel effortless, comfortable, and confident. We believe great style shouldn’t be complicated or expensive. From trendy essentials to timeless pieces, every product is designed to fit real life, real people, and real moments. Whether you’re dressing up or keeping it casual, Forever is here to keep you looking fresh — always.</p>
          <p>We focus on quality, comfort, and designs that actually last beyond one season. Our collections are inspired by modern lifestyles, street style, and the confidence that comes with wearing something you truly love. At Forever, fashion isn’t just about clothes — it’s about expressing who you are.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to deliver stylish, high-quality clothing that feels good to wear and easy to own. We aim to make fashion accessible while maintaining strong craftsmanship, modern designs, and customer-first experiences. </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US?'} />
      </div>


      <div className="flex flex-col md:flex-row text-sm mb-20 gap-2">
        <div className="border px-10 md:px-18 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Every product at Forever goes through strict quality checks to ensure premium fabric, perfect fitting, and long-lasting comfort</p>
        </div>
        <div className="border px-10 md:px-18 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convinience:</b>
          <p className='text-gray-600'>From smooth browsing to fast delivery, Forever is built for a convenient and effortless shopping experience</p>
        </div>
        <div className="border px-10 md:px-18 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>At Forever, we’re committed to providing exceptional customer service and a smooth shopping experience every time</p>
        </div>
      </div>


      <NewsletterBox />

    </div>
  )
}

export default About