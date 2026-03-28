"use client"

import Link from "next/link"
import { useState } from "react"

export default function SelectVicio() {

    const [erro, setErro] = useState("")

    // Modal vício personalizado
    const [modalCustomAberto, setModalCustomAberto] = useState(false)
    const [vicioCustom, setVicioCustom] = useState("")

    // Modal data
    const [modalDataAberto, setModalDataAberto] = useState(false)
    const [vicioSelecionado, setVicioSelecionado] = useState("")
    const [dataSelecionada, setDataSelecionada] = useState("")

    async function adicionarVicio(nome: string, startDate?: string) {
        try {
            const res = await fetch("http://localhost:8080/habits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: nome,
                    startDate: startDate ?? null
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

    // Abre modal de data ao clicar num vício
    function selecionarVicio(nome: string) {
        setErro("")
        setVicioSelecionado(nome)
        setDataSelecionada("")
        setModalDataAberto(true)
    }

    function fecharModalData() {
        setModalDataAberto(false)
        setVicioSelecionado("")
        setDataSelecionada("")
    }

    function confirmarData() {
        if (dataSelecionada) {
            adicionarVicio(vicioSelecionado, new Date(dataSelecionada).toISOString())
        }
        fecharModalData()
    }

    function confirmarAgora() {
        adicionarVicio(vicioSelecionado)
        fecharModalData()
    }

    // Modal vício personalizado
    function abrirModalCustom() {
        setVicioCustom("")
        setErro("")
        setModalCustomAberto(true)
    }

    function fecharModalCustom() {
        setModalCustomAberto(false)
        setVicioCustom("")
    }

    function confirmarVicioCustom() {
        if (vicioCustom.trim()) {
            setModalCustomAberto(false)
            selecionarVicio(vicioCustom.trim())
        }
    }

    const hoje = new Date().toISOString().slice(0, 16)

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

                <button className="p-4 w-48 rounded-lg bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-xl" onClick={() => selecionarVicio("Fumar")}>
                    🚬 Fumar
                </button>

                <button className="p-4 w-48 rounded-lg bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-xl" onClick={() => selecionarVicio("Açúcar")}>
                    🍬 Açúcar
                </button>

                <button className="p-4 w-48 rounded-lg bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-xl" onClick={() => selecionarVicio("Álcool")}>
                    🍺 Álcool
                </button>

                <button className="p-4 w-48 rounded-lg bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-xl" onClick={() => selecionarVicio("Redes Sociais")}>
                    📱 Redes Sociais
                </button>

                <button className="p-4 w-48 rounded-lg bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-xl" onClick={() => selecionarVicio("Maconha")}>
                    🍁 Maconha
                </button>

                <button className="p-4 w-48 rounded-lg bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-xl" onClick={abrirModalCustom}>
                    ✏️ Vício Personalizado
                </button>

                <Link href={'/'}>
                    <button className="cursor-pointer bg-red-500 p-4 rounded-lg w-48 hover:bg-red-700 text-2xl">
                        ◀ Voltar
                    </button>
                </Link>

            </div>

            {/* Modal: Quando você parou? */}
            {modalDataAberto && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={fecharModalData}>
                    <div className="bg-zinc-900 rounded-xl p-6 flex flex-col gap-4 w-80 shadow-xl" onClick={(e) => e.stopPropagation()}>

                        <h2 className="text-xl font-bold">Quando você parou?</h2>
                        <p className="text-zinc-400 text-sm -mt-2">Vício: {vicioSelecionado}</p>

                        <input
                            type="datetime-local"
                            value={dataSelecionada}
                            max={hoje}
                            onChange={(e) => setDataSelecionada(e.target.value)}
                            className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-zinc-500 text-white"
                        />

                        <div className="flex gap-2">
                            <button
                                className="flex-1 p-3 rounded-lg bg-zinc-700 hover:bg-zinc-600 cursor-pointer text-sm"
                                onClick={confirmarAgora}
                            >
                                ⚡ Agora
                            </button>
                            <button
                                className="flex-1 p-3 rounded-lg bg-red-700 hover:bg-red-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                onClick={confirmarData}
                                disabled={!dataSelecionada}
                            >
                                Confirmar
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* Modal: Vício Personalizado */}
            {modalCustomAberto && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={fecharModalCustom}>
                    <div className="bg-zinc-900 rounded-xl p-6 flex flex-col gap-4 w-80 shadow-xl" onClick={(e) => e.stopPropagation()}>

                        <h2 className="text-xl font-bold">Vício Personalizado</h2>

                        <input
                            type="text"
                            value={vicioCustom}
                            onChange={(e) => setVicioCustom(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") confirmarVicioCustom()
                                if (e.key === "Escape") fecharModalCustom()
                            }}
                            placeholder="Ex: Café, Jogos..."
                            autoFocus
                            className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-zinc-500 text-white"
                        />

                        <div className="flex gap-2">
                            <button className="flex-1 p-3 rounded-lg bg-zinc-700 hover:bg-zinc-600 cursor-pointer" onClick={fecharModalCustom}>
                                Cancelar
                            </button>
                            <button
                                className="flex-1 p-3 rounded-lg bg-red-700 hover:bg-red-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={confirmarVicioCustom}
                                disabled={!vicioCustom.trim()}
                            >
                                Próximo
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}