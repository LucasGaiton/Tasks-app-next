import Link from "next/link";
import axios from "axios"
import Task from "./Task";
async function getTasks() {
    try {
        const { data } = await axios.get("http://localhost:3000/api/task")
        return data

    } catch (error) {
        console.log(error);
    }

}

export default async function Tasks() {
    const data = await getTasks()
    console.log("Esto es data: ", data);
    return (
        <section className="mt-10 flex justify-center items-center">

            {data.status ?
                <div className="grid grid-cols-1 gap-20">
                    <Link href={`/new`}>
                        <div className=" text-9xl w-60 h-52 bg-blue-500 rounded-lg flex items-center justify-center hover:animate-bounce cursor-pointer">
                            +
                        </div >
                    </Link>
                </div> :
                <div className="grid grid-cols-3 gap-10">{
                    data.map(({ title, description, id }) => {
                        console.log("la concha de tu madre", data);
                        return <Task key={id} title={title} description={description} id={id} ></Task>
                    })}
                    <Link href={`/new`}>
                        <div className=" text-9xl w-70 h-52 bg-blue-500 rounded-lg flex items-center justify-center hover:animate-bounce cursor-pointer">
                            +
                        </div >
                    </Link>
                </div>

            }
        </section >
    )
}
