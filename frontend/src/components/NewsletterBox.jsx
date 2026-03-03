import React from 'react'

const NewsletterBox = () => {

const submitHandler = (event) => { 
    event.preventDefault();
}

  return (
    
    <div className='text-center'>

        <p className="text-2xl font-medium text-gray-800">Subscribe now and get 20% off</p>
        <p className="text-gray-400 mt-3">Join the community and unlock 20% off instantly.
Fresh styles. Early access. No spam.</p>
        <form onSubmit={submitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
            <button  type='submit' className='bg-[#c586a5] text-white text-xs px-10 py-4'>SUBSCRIBE </button>
        </form>


    </div>
  )
}

export default NewsletterBox