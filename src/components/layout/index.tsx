import useResizeObserver from 'use-resize-observer'

import { UndraggableStack } from 'src/components/stack'

import { getColumnCount } from 'src/helpers/getAutoColumnSizes'

import { Stack } from 'src/types/reusedTypes'

import styles from './layout.module.scss'
import { STACK_WIDTH } from '../controlledLayout'

type Props = {
  stacks: Stack[]
  maybeStacks: Stack[]
  imageSize: 1 | 2 | 3
  noMaxWidth?: boolean
}

const Layout = ({ stacks, maybeStacks, imageSize, noMaxWidth = false }: Props) => {
  const { ref, width = 1 } = useResizeObserver<HTMLDivElement>()
  const stackMaxWidth = STACK_WIDTH[imageSize]

  const columns = getColumnCount(imageSize, width)
  const gridStyles: React.CSSProperties = { gridTemplateColumns: `repeat(${columns}, 1fr)` }

  // Used to create the faux masonry layout
  // NOTE - this can be replaced with masonry when it goes mainline
  const displayColumns: Stack[][] = Array.from(Array(columns).keys()).map(() => [])

  for (let i = 0; i < stacks.length; i++) {
    const stack = stacks[i]
    const columnPlacement = i % columns

    displayColumns[columnPlacement].push(stack)
  }

  return (
    <div className={styles.container} style={{ maxWidth: noMaxWidth ? 'unset' : undefined }}>
      <div className={styles.controls}>
        <button disabled>Action 1</button>
        <button disabled>Action 2</button>
        <button disabled>Action 3</button>
        <button disabled>Action 4</button>
      </div>

      {/* NOTE - if/when masonry goes mainline, we can switch to that exclusively */}
      <div className={styles.grid} style={gridStyles} ref={ref}>
        {displayColumns.map((column, columnNumber) => (
          <div key={`column-${columnNumber}`}>
            {column.map((stack, placeInColumn) => (
              <UndraggableStack
                name={stack.name}
                stack={stack.cards}
                key={columnNumber + 1 + placeInColumn * columns}
              />
            ))}

            {!column.length && <div className={styles.emptyStack}>Empty stack</div>}
          </div>
        ))}
      </div>

      {maybeStacks.length > 0 && (
        <div className={styles.maybeStacks} style={{ maxWidth: stackMaxWidth }}>
          {maybeStacks.map((stack, index) => (
            <UndraggableStack name={stack.name} stack={stack.cards} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Layout
