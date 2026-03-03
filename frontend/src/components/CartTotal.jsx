import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

export const CartTotal = () => {

    const { currency, deliveryFee, cartAmount } = useContext(ShopContext)

    const subtotal = cartAmount();          // compute ONCE
    const total = subtotal === 0 ? 0 : subtotal + deliveryFee;

  return (
    <div className='w-full'>
        <div className="text-2xl">
            <Title text1={'CART'} text2={'TOTAL'} />
        </div>

        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p> {currency}{cartAmount()}.00 </p>            
            </div>
            <hr />
            
            <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p> {currency}{deliveryFee}.00 </p>
            </div>
            <hr />
            <div className="flex justify-between">
                <b>Total</b>
                <b>{currency}{total}.00</b>
            </div>
            
        </div>

    </div>
  )
}
