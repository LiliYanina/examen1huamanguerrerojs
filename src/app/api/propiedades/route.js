import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
    try {
        const results=await conn.query("SELECT * FROM propiedades");
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            {message:error.message},
            {status:500}
        );
    }
}
export async function POST(request) {
    try {
        const { nombre, direccion, caracteristicas, estado,precio_alquiler,created_at,update_at } = await request.json();
        const result = await conn.query("INSERT INTO propiedades SET ?", {
            nombre,
            direccion,
            caracteristicas,
            estado,
            precio_alquiler,
            created_at,
            update_at
        });
        return NextResponse.json({
            nombre,
            direccion,
            caracteristicas,
            estado,
            precio_alquiler,
            created_at,
            update_at,
            id: result.insertId
        });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}