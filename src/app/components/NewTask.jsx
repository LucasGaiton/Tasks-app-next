"use client"

import axios from "axios";
import { useRouter, useParams } from "next/navigation";  // Cambié "next/navigation" a "next/router"
import { useEffect, useState } from "react";

export default function NewTask() {
    const router = useRouter();
    const params = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState(false)

    const titleChange = (e) => {
        setTitle(e.target.value);
    };

    const DescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (title && description) {
            try {
                if (params.idTask) {
                    await axios.put(`/api/task/${params.idTask}`, {
                        title,
                        description,
                    });
                } else {
                    await axios.post("/api/task", { title, description });
                }
                router.push("/");
            } catch (error) {
                console.error("Error submitting the form:", error);
                // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario.
            }
        }
        else
            setError(true);
    };

    const fetchData = async () => {
        if (params.idTask) {
            try {
                const response = await axios.get(`/api/task/${params.idTask}`);
                const data = response.data;
                setDescription(data.description);
                setTitle(data.title);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Puedes manejar el error de alguna manera, por ejemplo, redirigir a una página de error.
            }
        }
    };
    useEffect(() => {
        fetchData();
        router.refresh()
    }, [params.idTask]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <form onSubmit={onSubmit} className="bg-slate-800 flex flex-col p-10 w-1/2">
                <input
                    onChange={titleChange}
                    value={title}
                    name="title"
                    placeholder="Introduzca el nombre de su tarea"
                    className="bg-black text-gray-300 p-4 h-14"
                    type="text"
                />
                <textarea
                    onChange={DescriptionChange}
                    value={description}
                    className="bg-black text-gray-300 h-36 p-4 mt-7"
                    name="description"
                    placeholder="Introduzca la descripcion de su tarea"
                    cols="5"
                    rows="10"
                ></textarea>
                {error ? <p className="text-red-800 text-center mt-[3px]">Complete todos los campos poara crear la tarea</p> : <></>}
                {params.idTask ? (
                    <div className="flex justify-center mt-5 space-x-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Actualizar
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                router.push("/");
                            }}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded mt-5"
                    >
                        Crear
                    </button>
                )}
            </form>
        </div>
    );
}