import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { Inter } from "next/font/google";
import { CiPause1 } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [open,setOpen]=useState(false)
  const [time,setTime]=useState(0)
  const intervalref =useRef(null)
  const startimeref=useRef(null)
  useEffect(()=>{
    
    if(open){
      intervalref.current  = setInterval(()=>{
        setTime(Date.now()-startimeref.current )
      },10)

    }

    return ()=>{
      clearInterval(intervalref.current)
    } 
    
      


  },[open])
  
  function startTime (){
    setOpen(true)
    startimeref.current = Date.now() - time 
  }


      let hours = Math.floor(time / (1000*60*60))
      let minutes =  Math.floor(time / (1000*60) % 60)
      let seconds = Math.floor(time / (1000) % 60)
   
      hours = String(hours).padStart(2,'0')
      minutes =String(minutes).padStart(2,'0')
      seconds = String(seconds).padStart(2,'0')

  // console.log(("0" + Math.floor((time / 60000) % 60)).slice(-2))
  // console.log(("0" + Math.floor((time / 1000) % 60)).slice(-2))
  // console.log(("0" + Math.floor((time / 1000) % 60)).slice(-2))
  function Rest () {
    setTime(0)
    setOpen(false)
  }
  
  return (
    <main className="h-screen w-screen border border-black flex justify-center items-center">
        <div className="h-[70%]  max-sm:w-[80%] border border-gray-500  min-md:max-md:w-[40%] w-[30%]  rounded-xl shadow-2xl  shadow-blue-500 grid grid-row-7">
            <div className="h-full w-full  row-span-3 flex justify-center items-center">
              <h1 className="text-white text-2xl max-sm:text-4xl">{`${hours}:${minutes}:${seconds}`}</h1>
             
            </div>
            <div className="h-full w-full  flex justify-center  gap-6 items-center max-sm:gap-4 ">
                  <button className="p-4 text-white text-md max-sm:text-sm text-center border border-gray-400 rounded-full" onClick={()=>setOpen(false)}>
                    <CiPause1 />
                  </button>
                  <button className="p-4 text-white text-md max-sm:text-sm  text-center border border-gray-400 rounded-full shadow-xl" onClick={()=>startTime()} >
                        <FaPlay />
                  </button>
                  <button className="border border-gray-400 max-sm:text-sm  rounded-full text-white text-md p-4 text-center" onClick={()=>Rest()}>
                    <GrPowerReset />
                  </button>
            </div>
        </div>
    </main>
  );
}
