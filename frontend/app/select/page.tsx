"use client"

import Link from "next/link"
import { useState } from "react"

export default function SelectVicio() {

    const [erro, setErro] = useState("")

    async function adicionarVicio(nome: string) {
        try {

            const res = await fetch("http://localhost:8080/habits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: nome
                })
            })

            if (!res.ok) {
                setErro("Vício já adicionado")
                return
            }

            window.location.href = "/"

        } catch (error) {
            console.error("Erro ao enviar vício:", error)
        }
    }

    return (
        <div className="text-center mt-10">

            <h1 className="text-2xl font-bold mb-6">
                Escolha um vício
            </h1>

            {erro && (
                <p className="text-red-500 font-bold mb-4">
                    ⚠ {erro}
                </p>
            )}

            <div className="flex flex-col gap-4 items-center">

                <button
                    className="border-2 border-red-500 p-4 w-48 rounded-lg hover:bg-gray-100 cursor-pointer text-2xl"
                    onClick={() => adicionarVicio("Fumar")}
                >
                    🚬 Fumar
                </button>

                <button
                    className="border-2 border-red-500 p-4 w-48 rounded-lg hover:bg-gray-100 cursor-pointer text-2xl"
                    onClick={() => adicionarVicio("Açúcar")}
                >
                    🍬 Açúcar
                </button>

                <button
                    className="border-2 border-red-500 p-4 w-48 rounded-lg hover:bg-gray-100 cursor-pointer text-2xl"
                    onClick={() => adicionarVicio("Álcool")}
                >
                    🍺 Álcool
                </button>

                <button
                    className="border-2 border-red-500 p-4 w-48 rounded-lg hover:bg-gray-100 cursor-pointer text-2xl"
                    onClick={() => adicionarVicio("Redes Sociais")}
                >
                    📱 Redes Sociais
                </button>
                
                <button
                    className="border-2 border-red-500 p-4 w-48 rounded-lg hover:bg-gray-100 cursor-pointer text-2xl"
                    onClick={() => adicionarVicio("Marijuana")}
                >
                    🍁 Marijuana
                </button>

                <Link href={'/'}>
                <button className="cursor-pointer bg-red-400 border-2 p-4 rounded-lg w-48 hover:bg-red-500 text-2xl">
                    ◀ Voltar
                    </button>
                </Link>

            </div>

        </div>
    )
}