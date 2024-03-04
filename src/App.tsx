import { useState } from "react";

import Layout from "src/components/layout";

import "./App.css";

const App = () => {
  const [stacks, setStacks] = useState(new Array<number[]>());
  const [imageSize, setImageSize] = useState<1 | 2 | 3>(2);

  const handleAddRandomStack = () => {
    const numOfCards = Math.floor(Math.random() * 40) || 1;

    setStacks([...stacks, Array.from(Array(numOfCards).keys())]);
  };

  return (
    <>
      <div className="primary-controls">
        <button onClick={handleAddRandomStack}>Add stack</button>

        <div>
          <button onClick={() => setImageSize(1)}>1</button>
          <button onClick={() => setImageSize(2)}>2</button>
          <button onClick={() => setImageSize(3)}>3</button>
        </div>
      </div>
      <Layout stacks={stacks} imageSize={imageSize} />
    </>
  );
};

export default App;
