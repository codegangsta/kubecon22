import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Demo } from '../components/demo'

const Home: NextPage = () => {
  const [text, setText] = useState("")
  const [name, setName] = useState("")

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      {name == "" && (
        <div className="container mx-auto">
          <input type="text" onChange={(e) => setText(e.target.value)}
            className="block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          <button onClick={() => setName(text)}>Submit</button>
        </div>
      )}

      {name != "" && (
        <Demo name={name} />
      )}

    </>
  )
}

export default Home
