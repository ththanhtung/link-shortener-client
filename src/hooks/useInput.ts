import { ChangeEvent, useState } from "react"
import { useLocalStorage } from "./useLocalStorage"

export const useInput = (key: string, initValue: any)=>{
    const [value, setValue] = useLocalStorage(key, initValue)

    const reset = ()=>{
        setValue(initValue)
    }

    const objAttrs = {
        value, 
        onChange: (e: ChangeEvent<HTMLInputElement>)=>{
            setValue(e.target.value)
        }
    }

    return [value, reset, objAttrs]
}