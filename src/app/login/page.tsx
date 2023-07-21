"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();

    const [user ,setUser] = React.useState({
        email:"",
        password:"",
        
    })
    const [buttonDisabled, setButtonDisabled]= React.useState(false);
    const [loading, setLoading]=React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Login success",response.data);  
            router.push("/profile");
            toast.success("Login sucess")

            
        } catch (error: any) {
            console.log("Singin failed" ,error.message);

            toast.error(error.message);
        } finally {
            setLoading(false);
        }
              
    }

    useEffect(() =>{
        if(user.email.length > 0 && user.password.length > 0)
        {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true);
        }
    },[user]);

    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 mt-8">
        <h1 className="mb-4">{loading ? "Processing": "Login"}</h1>
        <hr />

        <label  htmlFor="email">email</label>
        <input
        className="border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({...user,email:e.target.value})}
        placeholder="email"
        />


        <label htmlFor="password">password</label>
        <input
        className="border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({...user,password:e.target.value})}
        placeholder="password"
        />
        <button 
        onClick={onLogin}
         className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 mt-3"> Login here
        </button>
        <Link className="mt-2" href={"/signup"}>Visit Signup page</Link>
    </div>
    )
}
