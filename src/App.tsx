import { useState } from "react";

import Layout from "src/components/layout";

import "./App.css";

const App = () => {
  const [stacks, setStacks] = useState(new Array<number[]>());

  const handleAddRandomStack = () => {
    const numOfCards = Math.floor(Math.random() * 40) || 1;

    setStacks([...stacks, Array.from(Array(numOfCards).keys())]);
  };

  return (
    <>
      <button onClick={handleAddRandomStack}>Add stack</button>
      <Layout stacks={stacks} />
    </>
  );
};

export default App;
