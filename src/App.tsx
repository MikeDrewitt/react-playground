import { useState } from "react";

import Layout from "src/components/layout";

import "./App.css";

type Stack = { name: string; cards: number[] };

const App = () => {
  const [stacks, setStacks] = useState(new Array<Stack>());
  const [maybeStacks, setMaybeStacks] = useState(new Array<Stack>());

  const [imageSize, setImageSize] = useState<1 | 2 | 3>(2);

  const handleAddRandomStack = () => {
    const numOfCards = Math.floor(Math.random() * 40) || 1;
    const newStack = Array.from(Array(numOfCards).keys());

    setStacks([
      ...stacks,
      { name: `Stack ${stacks.length + 1}`, cards: newStack },
    ]);
  };

  const handleAddRandomMaybeStack = () => {
    const numOfCards = Math.floor(Math.random() * 40) || 1;
    const newStack = Array.from(Array(numOfCards).keys());

    setMaybeStacks([
      ...maybeStacks,
      { name: `Maybe stack ${maybeStacks.length + 1}`, cards: newStack },
    ]);
  };

  const handleAddEmptyStack = () => {
    const numOfCards = 0;
    const newStack = Array.from(Array(numOfCards).keys());

    setStacks([
      ...stacks,
      { name: `Stack ${stacks.length + 1}`, cards: newStack },
    ]);
  };

  return (
    <>
      <div style={{ padding: "1rem" }}>
        <div className="primary-controls">
          <div>
            <button onClick={handleAddRandomStack}>Add stack</button>
            <button onClick={handleAddEmptyStack}>Add empty stack</button>
            <button onClick={handleAddRandomMaybeStack}>Add maybe stack</button>
          </div>

          <div>
            <button onClick={() => setImageSize(1)}>1</button>
            <button onClick={() => setImageSize(2)}>2</button>
            <button onClick={() => setImageSize(3)}>3</button>
          </div>
        </div>

        <Layout
          stacks={stacks}
          maybeStacks={maybeStacks}
          imageSize={imageSize}
        />
      </div>
    </>
  );
};

export default App;
