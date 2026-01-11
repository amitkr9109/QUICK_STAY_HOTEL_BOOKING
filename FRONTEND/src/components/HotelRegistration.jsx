import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';

const HotelRegistration = () => {

    const { setShowHotelReg, axios, getToken, setIsOwner, navigate } = useAppContext();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [city, setCity] = useState("");

    const onSubmitHandler = async (event) => {
        try {
           event.preventDefault();
           
           const { data } = await axios.post(`/api/hotels`, { name, contact, address, city }, { headers: { Authorization: `Bearer ${await getToken()}` } })

           if(data.success) {
                toast.success("Hotel registered successfully!");
                setIsOwner(true);
                setShowHotelReg(false);
                navigate("/owner");
           }
           else {
                toast.error(data.message);     
           }
        } catch (error) {
            toast.error(error.message);  
        }
    }

  return (
    <>
        <div onClick={() => {setShowHotelReg(false)}} className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70">
            <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="flex bg-white rounded-xl max-w-4xl md:mx-2">
                <img src={assets.regImage} className='w-1/2 rounded-xl hidden md:block' alt="" />
                <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
                    <img src={assets.closeIcon} onClick={() => setShowHotelReg(false)} className='absolute top-4 right-4 w-4 h-4 cursor-pointer' alt="" />
                    <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>

                    <div className="w-full mt-4">
                        <label htmlFor="name" className='font-medium text-gray-500'>Hotel Name</label>
                        <input
                            type="text" 
                            placeholder='Type here' 
                            className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light'
                            required 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="w-full mt-4">
                        <label htmlFor="contact" className='font-medium text-gray-500'>Phone</label>
                        <input 
                            type="text" 
                            id='contact' 
                            placeholder='Type here' 
                            className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' 
                            required 
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>
                    <div className="w-full mt-4">
                        <label htmlFor="address" className='font-medium text-gray-500'>Address</label>
                        <input 
                            type="text" 
                            id='address' 
                            placeholder='Type here' 
                            className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' 
                            required 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="w-full mt-4 max-w-60 mr-auto">
                        <label htmlFor="city" className='font-medium text-gray-500'>City</label>
                        <select 
                            id="city" 
                            className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' 
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option value="">Select City</option>
                            {cities?.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <button className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 mt-6 rounded cursor-pointer'>Register</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default HotelRegistration