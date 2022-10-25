import { connect, Msg, NatsConnection, StringCodec, SubscriptionOptions } from 'nats.ws'
import React, { useEffect, useState } from 'react'

type DemoProps = {
  name: string
}

const subscribe = (
  nc: NatsConnection,
  subject: string,
  cb: (m: Msg) => void,
  opts?: SubscriptionOptions) => {

  const sub = nc.subscribe(subject, opts);
  (async () => {
    for await (const m of sub) { cb(m) }
  })()

}

export const Demo = (props: DemoProps) => {
  const [logs, setLogs] = useState([`Welcome, ${props.name}!`])

  useEffect(() => {
    async function natsConnect() {
      const sc = StringCodec();
      const nc = await connect({ servers: ["ws://0.0.0.0:5222"] });

      subscribe(nc, "kubecon.rolecall", (m) => {
        m.respond(sc.encode(props.name))
        setLogs(current => [...current, "Received a rolecall..."])
      })

      subscribe(nc, "kubecon.lottery", (m) => {
        m.respond(sc.encode(props.name))
        setLogs(current => [...current, "You won the lottery!"])
      }, { queue: "lottery" })

      subscribe(nc, "kubecon.navigate", (m) => {
        window.location.replace(sc.decode(m.data))
      })
    }

    natsConnect()
  }, [props.name])

  return (
    <div>
      {logs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
    </div>
  )
}
