import { connect, consumerOpts, JSONCodec, Msg, NatsConnection, StringCodec, SubscriptionOptions } from 'nats.ws'
import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type DemoProps = {
  name: string
}

type Question = {
  id: string,
  options: Array<string>
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

const questions = [
  {
    label: "How familiar are you with NATS?",
    id: "familiarity",
    options: [
      "I’m a complete newbie",
      "I’ve dabbled a bit",
      "I’ve evaluated NATS at my company",
      "I’m using NATS in production",
    ],
  },
  {
    label: "What topic are you most interested in learning more about?",
    id: "topic",
    options: [
      "Adaptive server topologies",
      "Persistence with JetStream",
      "Authentication and Authorization",
      "Leaf Nodes",
    ],
  },
  {
    label: "Who is more likely to win in an arm wrestling match?",
    id: "todd_or_jeremy",
    options: [
      "Jeremy",
      "Todd",
    ],
  },
]

export const Demo = (props: DemoProps) => {
  const nc = useRef<NatsConnection>()

  const [survey, setSurvey] = useState<any>({ name: props.name })
  const [surveyData, setSurveyData] = useState<Array<any>>([])
  const [logs, setLogs] = useState([`Welcome, ${props.name}!`])
  const [submitted, setSubmitted] = useState(false)

  const updateSurvey = (k: string, v: string) => {
    survey[k] = v
    setSurvey(survey)
  }

  const submitSurvey = () => {
    const jc = JSONCodec();
    nc.current?.publish("kubecon.survey", jc.encode(survey))
    setSubmitted(true)
  }

  const seriesData = (question: Question) => {
    const data = question.options.map((option, i) => {
      var n = 0
      surveyData.forEach((data) => {
        if (data[question.id] == option) {
          n++
        }
      })
      return n
    })
    console.log(data)
    return data
  }

  useEffect(() => {
    async function natsConnect() {
      const sc = StringCodec();
      const jc = JSONCodec();
      nc.current = await connect({ servers: ["ws://0.0.0.0:5222"] });

      subscribe(nc.current, "kubecon.rolecall", (m) => {
        m.respond(sc.encode(props.name))
        setLogs(current => [...current, "Received a rolecall..."])
      })

      subscribe(nc.current, "kubecon.lottery", (m) => {
        m.respond(sc.encode(props.name))
        setLogs(current => [...current, "You won the lottery!"])
      }, { queue: "lottery" })

      subscribe(nc.current, "kubecon.navigate", (m) => {
        window.location.replace(sc.decode(m.data))
      })

      // Create jetstream consumer for
      const opts = consumerOpts()
      opts.orderedConsumer()
      const sub = await nc.current.jetstream().subscribe("kubecon.survey", opts)
      for await (const m of sub) {
        setSurveyData(current => [...current, jc.decode(m.data)])
      }
    }

    natsConnect()
  }, [props.name])

  return (
    <div>

      {!submitted && (
        <>
          {questions.map((question, i) => (
            <div key={i}>
              <div>
                <label className="text-base font-medium text-gray-900">{question.label}</label>
                <fieldset className="mt-4">
                  <div className="space-y-4">
                    {question.options.map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          id={option}
                          name={question.id}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          onChange={() => updateSurvey(question.id, option)}
                        />
                        <label htmlFor={option} className="ml-3 block text-sm font-medium text-gray-700">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          ))}

          <button type="submit" onClick={submitSurvey}>Submit</button>
        </>
      )}

      {submitted && (
        <>
          {questions.map((question, i) => (
            <Chart key={i} type="donut" options={{
              labels: question.options,
            }} series={seriesData(question)} />
          ))}
        </>
      )}

      <div>
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  )
}
