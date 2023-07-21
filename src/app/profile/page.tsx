"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import  toast  from "react-hot-toast";
import profileImage from '@/assets/user.png'
export default function ProfilePage() {
  const [user, setUser] = useState({
    _id:"",
    username:"",
    email:""
    
  });
  const router = useRouter();
useEffect(()=>{
  getUserData();
},[]);
  const getUserData = async () => {
    try {
      const res = await axios.get('/api/users/me')
      console.log(res.data.message);
      setUser(res.data.user);
      console.log(user)

    }catch(error:any){
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const logout = async () => {
    try {
      axios.get("/api/users/logout");
      toast.success("Logout successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex  flex-col min-h-screen justify-center items-center p-4">
      <div className="flex justify-center items-center space-x-28">
      <h1 className=" text-xl p-2 rounded-sm  left-0  bg-green-400">Profile Page</h1>
      <button
        onClick={logout}
        className=" bg-blue-500 p-3 rounded-2xl  hover:bg-blue-800 m-4"
      >
        Logout
      </button>
      </div>
      <hr />
      <div className="flex shadow-lg rounded-lg justify-center items-center p-6 bg-pink-400">
      <Image className="h-20 m-4 w-auto" src={profileImage} alt="profile" ></Image>
      <div className="p-4 ">
        
      <p className=" text-center my-4 text-xl">current user :</p>
      <p className="font-bold">user_id :</p> <p className="text-xl">{user._id}</p> 
      <p className="font-bold">user_name :</p> <p className="text-xl">{user.username}</p> 
      <p className="font-bold">email :</p><p className="text-xl">{user.email}</p> 


        
       
      </div>
      </div>
      
      
    </div>
  );
}