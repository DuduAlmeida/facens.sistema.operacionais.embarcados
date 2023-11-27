"use client"

import { api } from "@/libs/axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useRef } from "react"

export default function Home() {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (emailRef.current && passwordRef.current) {
      console.log("tried")
      const response = await api.post<{
        user: {
          id: number,
          username: string,
          email: string
        }
      }>('/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value
      })

      if (response) {
        api.defaults.headers.common['user-id'] = response.data.user.id
      
        router.push('/')
      }
    }
  }

  return (
    <main className="h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-lg items-center"
      >
        <p className="text-2xl font-black">Webapp de voos</p>
        <p className="text-xl font-bold">Login</p>
        <input
          ref={emailRef}
          placeholder="email"
          type="email"
          className="border-2 border-zinc-700 p-4 rounded-md"
        />
        <input
          ref={passwordRef}
          placeholder="senha"
          type="password"
          className="border-2 border-zinc-700 p-4 rounded-md"
        />
        <button
          type="submit"
          className="bg-zinc-500 text-white p-4 rounded-md w-full"
        >
          Entrar
        </button>
        <div className="flex items-center gap-4">
          <span>Não possuí conta?</span>
          <Link href="/signUp" className="text-blue-400 hover:underline">Registrar</Link>
        </div>
      </form>
    </main>
  )
}
