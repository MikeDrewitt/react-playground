import { useEffect, useState } from 'react'

import Layout from 'src/components/layout'

import './App.css'
import ControlledLayout from './components/controlledLayout'

type Stack = { name: string; cards: number[] }

const App = () => {
  const [stacks, setStacks] = useState(new Array<Stack>())
  const [maybeStacks, setMaybeStacks] = useState(new Array<Stack>())

  const [controlledStacks, setControlledStacks] = useState(false)
  const [columns, setColumns] = useState(4) // todo: make this responsive

  const [noMaxWidth, setNoMaxWidth] = useState(false)

  const [imageSize, setImageSize] = useState<1 | 2 | 3>(2)

  useEffect(() => {
    if (controlledStacks) document.body.classList.add('sticky-scroll')
    else document.body.classList.remove('sticky-scroll')

    return () => document.body.classList.remove('sticky-scroll')
  }, [controlledStacks])

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
        <div className="controls-container">
          <div className="controls-content">
            <div>
              <button onClick={handleAddRandomStack}>Add stack</button>
              <button onClick={handleAddEmptyStack}>Add empty stack</button>
              <button onClick={handleAddRandomMaybeStack}>Add maybe stack</button>
              <button onClick={() => setControlledStacks(!controlledStacks)}>
                {controlledStacks ? 'Uncontrol stacks' : 'Control stacks'}
              </button>
              <label>
                ({totalCards}, {totalMaybeCards})
              </label>
            </div>

            <div>
              <label>Image size</label>
              <button onClick={() => setImageSize(1)}>1</button>
              <button onClick={() => setImageSize(2)}>2</button>
              <button onClick={() => setImageSize(3)}>3</button>

              {controlledStacks && (
                <>
                  <label>Columns</label>
                  <input type="number" value={columns} onChange={e => setColumns(parseInt(e.target.value, 10))} />
                </>
              )}

              {!controlledStacks && <button onClick={() => setNoMaxWidth(!noMaxWidth)}>Toggle margins</button>}
            </div>
          </div>
        </div>

        {controlledStacks && (
          <ControlledLayout columns={columns} stacks={stacks} maybeStacks={maybeStacks} imageSize={imageSize} />
        )}

        {!controlledStacks && (
          <Layout stacks={stacks} maybeStacks={maybeStacks} imageSize={imageSize} noMaxWidth={noMaxWidth} />
        )}
      </div>
    </>
  )
}

export default App
