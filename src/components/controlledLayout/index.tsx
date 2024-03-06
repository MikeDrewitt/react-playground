import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

import Stack, { UndraggableStack } from 'src/components/stack'

import styles from './controlledLayout.module.scss'

type Stack = { name: string; cards: string[] }

type Props = {
  stacks: Stack[]
  maybeStacks: Stack[]
  imageSize: 1 | 2 | 3
  noMaxWidth?: boolean
}

export const STACK_WIDTH: Record<1 | 2 | 3, number> = {
  1: 150,
  2: 225,
  3: 300,
}

const ControlledLayout = ({ stacks, maybeStacks, imageSize, noMaxWidth }: Props) => {
  const [columns, setColumns] = useState(0)

  const [stackMap, setStackMap] = useState<Record<string, Stack>>({})
  const [displayColumns, setDisplayColumns] = useState<string[][]>([])

  const stackSize = STACK_WIDTH[imageSize]

  const containerStyles: React.CSSProperties = {
    maxWidth: noMaxWidth ? 'unset' : undefined,
  }

  const gridStyles: React.CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  }

  useEffect(() => {
    const width = window.innerWidth > 2150 ? 2150 : window.innerWidth

    setColumns(Math.floor(width / stackSize) - 1 || 1) // Note - this only runs when first dropping into this view
  }, [])

  useEffect(() => {
    const stackMap: Record<string, Stack> = stacks.reduce((acc, stack) => ({ ...acc, [stack.name]: stack }), {})
    const stackNames = stacks.map(stack => stack.name)

    const updatedDisplayColumns =
      displayColumns.length < columns
        ? [...displayColumns, ...Array.from({ length: columns - displayColumns.length }, () => [])] // Add new empty columns
        : displayColumns.filter((_, index) => index < columns)

    const stacksOnDisplay: Record<string, true> = updatedDisplayColumns
      .flat()
      .reduce((acc, stackName) => ({ ...acc, [stackName]: true }), {})

    const stacksNotOnDisplay = stackNames.filter(stackName => !stacksOnDisplay[stackName])

    let maxColumnLength = Math.min(...updatedDisplayColumns.map(column => column.length)) + 1

    for (const stackName of stacksNotOnDisplay) {
      for (let columnIndex = 0; columnIndex < updatedDisplayColumns.length; columnIndex++) {
        const column = updatedDisplayColumns[columnIndex]

        // If we're on the last column, and we still can't place the stack, place it in the first column
        if (columnIndex === updatedDisplayColumns.length - 1 && column.length === maxColumnLength) {
          updatedDisplayColumns[0].push(stackName)
          maxColumnLength = updatedDisplayColumns[0].length

          break
        }

        if (maxColumnLength <= column.length) continue

        column.push(stackName)
        maxColumnLength = column.length

        break
      }
    }

    setStackMap(stackMap)
    setDisplayColumns(updatedDisplayColumns)
  }, [columns, stacks])

  const handleDragEnd = (result: any) => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) return

    const { index: placeInColumn, droppableId: columnId } = source
    const { index: newPlaceInColumn, droppableId: newColumnId } = destination

    const columnIndex = parseInt(columnId)
    const newColumnIndex = parseInt(newColumnId)

    const stackName = displayColumns[columnIndex][placeInColumn]

    const updatedOldColumn = displayColumns[columnIndex].filter((_, index) => index !== placeInColumn)
    const existingDroppedColumn = columnIndex === newColumnIndex ? updatedOldColumn : displayColumns[newColumnIndex] // Note - we're grabbing the updated old column if we're moving within the same column since the index will have changed

    // prettier-ignore
    const updatedNewColumn = [...existingDroppedColumn.slice(0, newPlaceInColumn), stackName, ...existingDroppedColumn.slice(newPlaceInColumn)]

    const updatedDisplayColumns = [...displayColumns]

    updatedDisplayColumns[columnIndex] = updatedOldColumn
    updatedDisplayColumns[newColumnIndex] = updatedNewColumn

    setDisplayColumns(updatedDisplayColumns)
  }

  return (
    <>
      <div>
        <label>Number of columns</label>
        <input type="number" value={columns} onChange={e => setColumns(parseInt(e.target.value))} />
      </div>

      <div className={styles.container} style={containerStyles}>
        <div className={styles.controls}>
          <button disabled>Action 1</button>
          <button disabled>Action 2</button>
          <button disabled>Action 3</button>
          <button disabled>Action 4</button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={styles.grid} style={gridStyles}>
            {displayColumns.map((column, columnNumber) => (
              <Droppable key={`column-${columnNumber}`} droppableId={`${columnNumber}`}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.column}
                    style={{
                      backgroundColor: snapshot.isDraggingOver ? 'hotpink' : 'transparent',
                      minWidth: stackSize,
                    }}>
                    {column.map((stackId, placeInColumn) => (
                      <Draggable
                        key={placeInColumn}
                        draggableId={`column-${columnNumber}-index-${placeInColumn}`}
                        index={placeInColumn}>
                        {(provided, _snapshot) => {
                          const stack = stackMap[stackId]

                          if (!stack) return null

                          return (
                            <Stack
                              name={stack.name}
                              stack={stack.cards}
                              key={columnNumber + 1 + placeInColumn * columns}
                              ref={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                              }}
                            />
                          )
                        }}
                      </Draggable>
                    ))}
                    {!column.length && <div className={styles.emptyStack}>Empty stack</div>}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        {maybeStacks.length > 0 && (
          <div className={styles.maybeStacks}>
            {maybeStacks.map((stack, index) => (
              <UndraggableStack name={stack.name} stack={stack.cards} key={index} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default ControlledLayout
