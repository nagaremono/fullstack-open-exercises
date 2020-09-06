import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    // Create an array filled with zeros of anecdotes array length
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );

  const topVoted = votes.reduce(
    (topVotedIndex, currentVote, currentIndex, array) => {
      return currentVote > array[topVotedIndex] ? currentIndex : topVotedIndex;
    },
    0
  );

  const voteAnecdote = () => {
    const copiedVotes = [...votes];

    copiedVotes[selected] += 1;

    setVotes(copiedVotes);
  };

  const selectRandomAnec = () => {
    setSelected(Math.floor(Math.random() * (5 - 0 + 1) + 0));
  };

  return (
    <div className="anecdotes">
      <h1>Anecdotes</h1>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>This anecdote has {votes[selected]} votes</p>
        <button onClick={() => voteAnecdote()}>Vote</button>
        <button onClick={() => selectRandomAnec()}>Next Anecdote</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[topVoted]}</p>
      </div>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
