import { useState } from "react"


const useValidation =()=>{
    const validateText = (text)=>{
        if (text && text !== "") return true
        return flase
    }
    const validateEmail = (email) =>{
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    }
    const validateNumber = (value) => {
        const re = /\D/
        return re.test(value)
    }
    const validateHasOneTextExits = (listValue=[]) => {
        let flag = flase
        listValue.forEach(c=>{
            if (c && c !== ""){
                flag=true
                break
            }
            else{
                continue
            }
        })
        return flag
    }
    return {
        validateText,
        validateEmail,
        validateNumber,
        validateHasOneTextExits
    }
}

export default useValidation;