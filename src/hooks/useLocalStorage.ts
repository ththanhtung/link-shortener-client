import { useEffect, useState } from "react"

const getlocalValue = (key: string, initValue: any) => {
  if (typeof window === undefined) {
    return initValue;
  }
  
  const localValueRaw = localStorage.getItem(key)
  if (!localValueRaw){
    return initValue
  }
  
  const localValue = JSON.parse(localValueRaw);
  if (localValue) {
    return localValue;
  }

  if (typeof initValue === 'function') {
    return initValue();
  }

  return initValue
};

export const useLocalStorage = (key: string, initValue:any)=>{
    const [value, setValue] = useState(getlocalValue(key, initValue))

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, setValue])

    return [value, setValue]
}