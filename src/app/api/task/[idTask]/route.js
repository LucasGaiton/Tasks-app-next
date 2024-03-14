import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma"

export async function GET(request, { params }) {
    const task = await prisma.task.findUnique({
        where: {
            id: Number(params.idTask)
        }
    })
    if(!task) return NextResponse.json({
        status:404,
        message:"El elemento requerido no existe"
    })
    return NextResponse.json(task)

}
export async function DELETE(request, { params }) {
    const task = await prisma.task.delete({
        where: {
            id: Number(params.idTask)
        }
    })
    if(!task) return NextResponse.json({
        status:404,
        message:"El elemento a borrar no existe"
    })
    return NextResponse.json(task)

}
export async  function PUT(request, { params }) {
    const {title, description} = await request.json()

    const task = await prisma.task.update({
        where: {
            id: Number(params.idTask)
        },
        data:{
            title,
            description
        }
    }, )
    return NextResponse.json(task)


}
