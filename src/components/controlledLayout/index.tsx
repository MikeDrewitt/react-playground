import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Stack, { UndraggableStack } from "src/components/stack";

import styles from "./controlledLayout.module.scss";

type Props = {
  stacks: { name: string; cards: number[] }[];
  maybeStacks: { name: string; cards: number[] }[];
  imageSize: 1 | 2 | 3;
  columns: number;
};

export const STACK_WIDTH: Record<1 | 2 | 3, number> = {
  1: 150,
  2: 225,
  3: 300,
};

const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};

  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const ControlledLayout = ({
  stacks,
  maybeStacks,
  imageSize,
  columns,
}: Props) => {
  const columnWidth = STACK_WIDTH[imageSize];

  const defaultMaxWidth = 2150;
  const pageWidth = columns * columnWidth;

  const containerStyles: React.CSSProperties = {
    justifyContent: pageWidth > window.innerWidth ? "flex-start" : "center",
  };

  const gridStyles: React.CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };

  const displayColumns: { name: string; cards: number[] }[][] = [];

  for (let i = 0; i < stacks.length; i++) {
    const stack = stacks[i];
    const columnPlacement = i % columns;

    if (!displayColumns[columnPlacement]) displayColumns.push([stack]);
    else displayColumns[columnPlacement].push(stack);
  }

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) return;

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    // if (sInd === dInd) {
    //   const items = reorder(state[sInd], source.index, destination.index);
    //   const newState = [...state];
    //   newState[sInd] = items;
    //   setState(newState);
    // } else {
    //   const result = move(state[sInd], state[dInd], source, destination);
    //   const newState = [...state];
    //   newState[sInd] = result[sInd];
    //   newState[dInd] = result[dInd];

    //   setState(newState.filter((group) => group.length));
    // }
  };

  return (
    <div className={styles.container} style={containerStyles}>
      <div className={styles.controls}>
        <button>Action 1</button>
        <button>Action 2</button>
        <button>Action 3</button>
        <button>Action 4</button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.grid} style={gridStyles}>
          {displayColumns.map((column, columnNumber) => (
            <Droppable
              key={`column-${columnNumber}`}
              droppableId={`${columnNumber}`}
            >
              {(provided, _snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {column.map((stack, placeInColumn) => (
                    <Draggable
                      key={placeInColumn}
                      draggableId={`column-${columnNumber}-index-${placeInColumn}`}
                      index={placeInColumn}
                    >
                      {(provided, _snapshot) => (
                        <Stack
                          name={stack.name}
                          stack={stack.cards}
                          key={columnNumber + 1 + placeInColumn * columns}
                          ref={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            width: columnWidth,
                          }}
                        />
                      )}
                    </Draggable>
                  ))}
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
            <UndraggableStack
              name={stack.name}
              stack={stack.cards}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ControlledLayout;
