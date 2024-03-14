import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
//Imprtamos prisma
import { prisma } from "@/libs/prisma";

export async function GET() {
    const tasks = await prisma.task.findMany();
    if(tasks.length == 0)
        return NextResponse.json({
            status:200,
            messege: "La base de datos esta vacía"
        })
    return NextResponse.json(tasks)
}
export async function POST(request, {params}) {
    const {title, description} = await request.json()
    const newTask = await prisma.task.create({
        data:{
            title,
            description
        }
    })
    return NextResponse.json(newTask)
}