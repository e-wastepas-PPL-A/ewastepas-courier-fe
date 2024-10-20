import { useEffect } from "react";

export default function PageName() {
    useEffect(()=>{
        document.title = "E-Wastepas | Home"
    }, [])

    return (
        <>
            <h1 className="text-3xl font-bold underline text-red-700">
            Hello world!
            </h1>
        </>
    );
  }
  