import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {text === 'Positive' ? '%' : ''}
      </td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ stats }) => {
  const { good, neutral, bad, all } = stats;

  if (all === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={all} />
          <Statistic text="Average" value={(good - bad) / all} />
          <Statistic text="Positive" value={(good / all) * 100} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;

  const stats = {
    good,
    neutral,
    bad,
    all,
  };

  return (
    <div className="feedback">
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics stats={stats} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
