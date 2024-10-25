"use client";
import  axios  from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const profilePage =  () => {
    const router= useRouter();
    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("logout successful");
            router.push('/login')
        } catch (error:any) {
            console.log("yes it is in catch block",error.message);
            toast.error(error.message);
            
        }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Seller Profile</h1>
      <hr />
      <p>profile page</p>
      <hr />
      <button className="bg-blue-500 hover:bg-blue-700 text-white-font-bold py-2 px-4 rounded-lg mt-4 " onClick={logout}> Logout</button>
    </div>
  )
}

export default profilePage;