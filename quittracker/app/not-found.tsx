import Link from "next/link"
import { notFound } from "next/navigation"

export default function NotFound() {
    return (
        <div className="flex flex-col text-center">
            <h1 className="text-5xl">Page not found!</h1>
            <Link href='/' className=" text-2xl text-red-400">
            Back to home
            </Link>
        </div>
    )
}