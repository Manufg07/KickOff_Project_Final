import React from 'react'
import League from '../../assets/foot.jpg'

const Leagues = () => {
  return (
    <>
            {/* <!-- Leagues --> */}
        <div className="justify-center">
            <h3 className="text-md font-semibold">Explore Leagues</h3>
            <div className="mb-2 cursor-pointer" onClick='/leagues'>
                <img src={League} alt="League" className="w-10 h-10 rounded-full mr-2"/>
            </div>
        </div>
    </>
  )
}

export default Leagues