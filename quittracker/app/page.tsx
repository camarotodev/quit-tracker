'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {

  const [agora, setAgora] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setAgora(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  function calcularTempo(startDate: string) {
    const inicio = new Date(startDate)
    const agora = new Date()

    const diff = Math.floor((agora.getTime() - inicio.getTime()) / 1000)

    const dias = Math.floor(diff / 86400)
    const horas = Math.floor((diff % 86400) / 3600)
    const minutos = Math.floor((diff % 3600) / 60)
    const segundos = diff % 60

    if (dias > 0) {
      return `${dias}d ${horas}h ${minutos}min ${segundos}s`
    }

    if (horas > 0) {
      return `${horas}h ${minutos}min ${segundos}s`
    }

    if (minutos > 0) {
      return `${minutos}min ${segundos}s`
    }

    return `${segundos}s`
    }


    const [vicios, setVicios] = useState<any[]>([])

    useEffect(() => {
      async function carregarVicios() {
        const res = await fetch("http://localhost:8080/habits")
        const data = await res.json()
        setVicios(data)
      }
      carregarVicios()
    }, [])

    return (
      <div className="flex flex-col justify-center items-center font-bold text-2xl mt-6">

        <div className="mt-5 flex flex-col text-center">
          <h1>Seus vícios</h1>

          <div>
            {vicios.map((vicio: any) => (
              <div className="border-2 border-red-500 mt-6 p-10" key={vicio.id}>
                <h2>{vicio.name}</h2>

                <p className="text-lg mt-2">
                  {calcularTempo(vicio.startDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <h1 className="mx-5 mt-5">Adicionar vício</h1>

        <Link href={'/select'}>
          <button className="cursor-pointer w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-red-600">
            +
          </button>
        </Link>
      </div>
    )
  }