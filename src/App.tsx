import { useState } from 'react'

import Layout from 'src/components/layout'
import ControlledLayout from 'src/components/controlledLayout'

import './App.css'

type Stack = { name: string; cards: number[] }

const App = () => {
  const [stacks, setStacks] = useState(new Array<Stack>())
  const [maybeStacks, setMaybeStacks] = useState(new Array<Stack>())

  const [controlledStacks, setControlledStacks] = useState(false)

  const [noMaxWidth, setNoMaxWidth] = useState(false)

  const [imageSize, setImageSize] = useState<1 | 2 | 3>(2)

  const handleAddRandomStack = () => {
    const numOfCards = Math.floor(Math.random() * 40) || 1
    const newStack = Array.from(Array(numOfCards).keys())

    setStacks([...stacks, { name: `Stack ${stacks.length + 1}`, cards: newStack }])
  }

  const handleAddRandomMaybeStack = () => {
    const numOfCards = Math.floor(Math.random() * 40) || 1
    const newStack = Array.from(Array(numOfCards).keys())

    setMaybeStacks([...maybeStacks, { name: `Maybe stack ${maybeStacks.length + 1}`, cards: newStack }])
  }

  const handleAddEmptyStack = () => {
    const numOfCards = 0
    const newStack = Array.from(Array(numOfCards).keys())

    setStacks([...stacks, { name: `Stack ${stacks.length + 1}`, cards: newStack }])
  }

  const totalCards = stacks.reduce((acc, stack) => acc + stack.cards.length, 0)
  const totalMaybeCards = maybeStacks.reduce((acc, stack) => acc + stack.cards.length, 0)

  return (
    <>
      <div className="root-container">
        <div>
          <button onClick={handleAddRandomStack}>Add stack</button>
          <button onClick={handleAddEmptyStack}>Add empty stack</button>
          <button onClick={handleAddRandomMaybeStack}>Add maybe stack</button>
          <button onClick={() => setControlledStacks(!controlledStacks)}>
            {controlledStacks ? 'Disable' : 'Enable'} manual stacks
          </button>
          <label>
            ({totalCards}, {totalMaybeCards})
          </label>
        </div>

        <div>
          <label>Image size</label>
          <button style={{ backgroundColor: imageSize === 1 ? '#646cff' : 'unset' }} onClick={() => setImageSize(1)}>
            1
          </button>
          <button style={{ backgroundColor: imageSize === 2 ? '#646cff' : 'unset' }} onClick={() => setImageSize(2)}>
            2
          </button>
          <button style={{ backgroundColor: imageSize === 3 ? '#646cff' : 'unset' }} onClick={() => setImageSize(3)}>
            3
          </button>

          <button onClick={() => setNoMaxWidth(!noMaxWidth)}>Toggle margins</button>
        </div>

        {controlledStacks && (
          <ControlledLayout stacks={stacks} maybeStacks={maybeStacks} imageSize={imageSize} noMaxWidth={noMaxWidth} />
        )}

        {!controlledStacks && (
          <Layout stacks={stacks} maybeStacks={maybeStacks} imageSize={imageSize} noMaxWidth={noMaxWidth} />
        )}
      </div>
    </>
  )
}

export default App
