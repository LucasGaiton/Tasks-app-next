"use client"
import { useRouter } from "next/navigation";
import axios from "axios"
import Link from "next/link";
export default function Task({ title, description, id }) {
    const router = useRouter()
    function deleteTask() {
        try {
            axios.delete(`/api/task/${id}`).then((res)=>{console.log("resuelvo");}).catch((err)=> console.log(err))
            router.refresh()
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className=" flex flex-col justify-between p-6 items-center bg-slate-800 w-70 h-52 - rounded-xl ">
            <Link href={`/edit/${id}`}>
                <div>
                    <h1 className="font-bold text-xl mb-2">{title}</h1>
                    <p className="text-white-700 text-base text-center">{description}</p>
                </div>
            </Link>
            <button type="button" className="flex justify-self-end bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={(e) => {
                    e.stopPropagation()
                    deleteTask()
                }}>Delete</button>
        </div >

    )
}
