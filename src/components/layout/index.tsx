import useResizeObserver from 'use-resize-observer'

import { UndraggableStack } from 'src/components/stack'

import styles from './layout.module.scss'

type Props = {
  stacks: { name: string; cards: number[] }[]
  maybeStacks: { name: string; cards: number[] }[]
  imageSize: 1 | 2 | 3
  noMaxWidth?: boolean
}

// Must align with the CSS threshholds for this to work correctly
const COLUMN_THRESHOLDS = {
  1: {
    max: 22,
    5000: 21,
    4600: 20,
    4300: 19,
    4000: 18,
    3500: 17,
    3100: 16,
    2800: 15,
    2500: 14,
    2300: 13,
    1800: 12,
    1500: 10,
    1200: 8,
    1000: 6,
    800: 5,
    600: 3,
  },
  2: {
    max: 20,
    5000: 19,
    4600: 18,
    4300: 17,
    4000: 16,
    3500: 15,
    3100: 14,
    2800: 13,
    2500: 12,
    2300: 11,
    1800: 10,
    1500: 8,
    1200: 6,
    1000: 5,
    800: 4,
    600: 2,
  },
  3: {
    max: 17,
    5000: 16,
    4600: 15,
    4300: 14,
    4000: 13,
    3500: 12,
    3100: 11,
    2800: 10,
    2500: 9,
    2300: 8,
    1800: 7,
    1500: 6,
    1200: 5,
    1000: 4,
    800: 3,
    600: 1,
  },
}

function getColumnCount(imageSize: 1 | 2 | 3, width: number): number {
  const thresholds = COLUMN_THRESHOLDS[imageSize]

  let columnCount = thresholds.max

  if (width <= 5000) columnCount = thresholds[5000]
  if (width <= 4600) columnCount = thresholds[4600]
  if (width <= 4300) columnCount = thresholds[4300]
  if (width <= 4000) columnCount = thresholds[4000]
  if (width <= 3500) columnCount = thresholds[3500]
  if (width <= 3100) columnCount = thresholds[3100]
  if (width <= 2800) columnCount = thresholds[2800]
  if (width <= 2500) columnCount = thresholds[2500]
  if (width <= 2300) columnCount = thresholds[2300]
  if (width <= 1800) columnCount = thresholds[1800]
  if (width <= 1500) columnCount = thresholds[1500]
  if (width <= 1200) columnCount = thresholds[1200]
  if (width <= 1000) columnCount = thresholds[1000]
  if (width <= 800) columnCount = thresholds[800]
  if (width <= 600) columnCount = thresholds[600]

  return columnCount
}

const Layout = ({ stacks, maybeStacks, imageSize, noMaxWidth = false }: Props) => {
  const { ref, width = 1 } = useResizeObserver<HTMLDivElement>()

  const columns = getColumnCount(imageSize, width)
  const gridStyles: React.CSSProperties = { gridTemplateColumns: `repeat(${columns}, 1fr)` }

  // Used to create the faux masonry layout
  // NOTE - this can be replaced with masonry when it goes mainline
  const displayColumns: { name: string; cards: number[] }[][] = []

  for (let i = 0; i < stacks.length; i++) {
    const stack = stacks[i]
    const columnPlacement = i % columns

    if (!displayColumns[columnPlacement]) displayColumns.push([stack])
    else displayColumns[columnPlacement].push(stack)
  }

  return (
    <div className={styles.container} style={{ maxWidth: noMaxWidth ? 'unset' : undefined }}>
      <div className={styles.controls}>
        <button>Action 1</button>
        <button>Action 2</button>
        <button>Action 3</button>
        <button>Action 4</button>
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
          </div>
        ))}
      </div>

      {maybeStacks.length > 0 && (
        <div className={styles.maybeStacks}>
          {maybeStacks.map((stack, index) => (
            <UndraggableStack name={stack.name} stack={stack.cards} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Layout
