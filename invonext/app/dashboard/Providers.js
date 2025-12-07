'use client'
import { ThemeProvider } from "next-themes"
import { useState,useEffect } from "react"

const Providers = ({children}) => {

    const [mounted,setMounted] = useState(false);

    useEffect(()=> {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    },[])
    
    if (!mounted) {
        return <>{children}</>
    }

  return (
    <ThemeProvider>{children}</ThemeProvider>
  );
};

export default Providers