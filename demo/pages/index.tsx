import type { NextPage } from 'next'
import { useState } from 'react'
import { Demo } from '../components/demo'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [text, setText] = useState("")
  const [name, setName] = useState("")

  return (
    <>
      {name == "" && (
        <div className={styles.container}>
          <input type="text" onChange={(e) => setText(e.target.value)} />
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
