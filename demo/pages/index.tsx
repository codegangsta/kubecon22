import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Demo } from '../components/demo'

const server = process.env.NEXT_PUBLIC_NATS_SERVER_URL || ""

const Home: NextPage = () => {
  const [text, setText] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    const n = localStorage.getItem("name")
    if (n != null) {
      setName(n)
    }
  }, [])

  return (
    <div className="container mx-auto flex w-screen pt-16 justify-center px-4">
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      {name == "" && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">NATS Kubecon 2022 Demo</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>🎉 To kick off the demo, let&apos;s start with your name</p>
            </div>
            <form className="mt-5 sm:flex sm:items-center" onSubmit={() => setName(text)}>
              <div className="w-full sm:max-w-xs">
                <label htmlFor="email" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="My Name"
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {name != "" && (
        <Demo name={name} server={server} />
      )}

    </div>
  )
}

export default Home
