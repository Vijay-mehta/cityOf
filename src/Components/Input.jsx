import React from 'react'
import { useForm } from "react-hook-form";

const Input =({style, onChange})=>{

    function funny(){
        // fun();
    }
    return (
    <>
    <input className={style} onChange={onChange}/>
    </>
    )
}

export default Input;