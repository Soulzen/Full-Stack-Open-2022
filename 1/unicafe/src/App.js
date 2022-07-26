import { useState } from "react"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <div>
        <h2>Give feedback</h2>
        <Button onClick={handleGood} text="good"></Button>
        <Button onClick={handleNeutral} text="neutral"></Button>
        <Button onClick={handleBad} text="bad"></Button>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good}></StatisticsLine>
          <StatisticsLine text="neutral" value={neutral}></StatisticsLine>
          <StatisticsLine text="bad" value={bad}></StatisticsLine>
          <StatisticsLine
            text="all"
            value={good + neutral + bad}
          ></StatisticsLine>
          <StatisticsLine text="score" value={good - bad}></StatisticsLine>
          <StatisticsLine
            text="positive"
            value={(good / (good + neutral + bad)) * 100 + "%"}
          ></StatisticsLine>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App
