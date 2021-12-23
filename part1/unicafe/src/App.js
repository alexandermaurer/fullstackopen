import React, { useState } from 'react'
import { Simulate } from 'react-dom/cjs/react-dom-test-utils.production.min'

const Heading = (props) =>
  <div><h1>{props.headingText}</h1></div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = props => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const sum = good + neutral + bad
  const average = (good - bad) / sum
  const positivePercent = (good / sum) * 100

  if (sum) {
    return (
      <table>
        <tbody>
          <tr>
            <StatisticLine text="Good" count={good} />
          </tr>
          <tr>
            <StatisticLine text="Neutral" count={neutral} />
          </tr>
          <tr>
            <StatisticLine text="Bad" count={bad} />
          </tr>
          <tr>
            <StatisticLine text="Total" count={sum} />
          </tr>
          <tr>
            <StatisticLine text="Average" count={average} />
          </tr>
          <tr>
            <StatisticLine text="Positive" count={positivePercent} percent={true} />
          </tr>
        </tbody>
      </table>
    )
  }
  return (
    <p>No feedback given.</p>
  )
}


const StatisticLine = (props) => {
  if (!props.percent) {
    return (
      <>
        <td>{props.text}</td><td>{props.count}</td>
      </>
    )
  }
  return (
    <>
      <td>{props.text}</td><td>{props.count}%</td>
    </>
  )
}




const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => () => {
    setGood(good + 1)
  }

  const incrementNeutral = () => () => {
    setNeutral(neutral + 1)
  }

  const incrementBad = () => () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <Heading headingText="Give feedback" />

      <div>
        <Button handleClick={incrementGood()} text="Good" />
        <Button handleClick={incrementNeutral()} text="Neutral" />
        <Button handleClick={incrementBad()} text="Bad" />
      </div>

      <Heading headingText="statistics" />

      <Statistics good={good} neutral={neutral} bad={bad} />


    </div>
  )
}


export default App;
