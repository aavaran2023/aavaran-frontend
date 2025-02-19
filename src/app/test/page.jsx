import React from 'react'
import {sendTelegramMessage} from '../../../utils/sendTelegramMessage'


    
export default async function Page(){
    const send=await sendTelegramMessage(
        `🛍 *New Order Placed!*\n\n`
      )
    return(
    <div>
        <button onClick={()=>{send
            
            }}
        >p
                </button>
        

    </div>
    )
 
}


