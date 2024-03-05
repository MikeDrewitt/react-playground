import useResizeObserver from "use-resize-observer";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Stack, { UndraggableStack } from "src/components/stack";

import styles from "./layout.module.scss";

type Props = {
  stacks: { name: string; cards: number[] }[];
  maybeStacks: { name: string; cards: number[] }[];
  imageSize: 1 | 2 | 3;
};

// Must align with the CSS threshholds for this to work correctly
const COLUMN_THRESHOLDS = {
  1: {
    max: 8,
    1800: 7,
    1500: 6,
    1200: 5,
    1000: 4,
    800: 3,
    600: 1,
  },
  2: {
    max: 12,
    1800: 10,
    1500: 8,
    1200: 6,
    1000: 5,
    800: 4,
    600: 2,
  },
  3: {
    max: 15,
    1800: 12,
    1500: 10,
    1200: 8,
    1000: 6,
    800: 5,
    600: 3,
  },
};

function getColumnCount(imageSize: 1 | 2 | 3, width: number): number {
  const thresholds = COLUMN_THRESHOLDS[imageSize];

  let columnCount = thresholds.max;

  if (width < 1800) columnCount = thresholds[1800];
  if (width < 1500) columnCount = thresholds[1500];
  if (width < 1200) columnCount = thresholds[1200];
  if (width < 1000) columnCount = thresholds[1000];
  if (width < 800) columnCount = thresholds[800];
  if (width < 600) columnCount = thresholds[600];

  return columnCount;
}

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

const Layout = ({ stacks, maybeStacks, imageSize }: Props) => {
  const { ref, width = 1 } = useResizeObserver<HTMLDivElement>();

  const columns = getColumnCount(imageSize, width);

  const gridClassName = `grid${imageSize}`;

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
    <div className={styles.container}>
      <div className={styles.controls}>
        <button>Action 1</button>
        <button>Action 2</button>
        <button>Action 3</button>
        <button>Action 4</button>
      </div>

      {/* The container that's being used for the container query must match the resize observer width, otherwise you'll be measuring different widths and stuff gets weird */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.gridContainer} ref={ref}>
          <div className={styles[gridClassName]}>
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
                            style={provided.draggableProps.style}
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

          {/* If masonry layout worked */}
          {/* {stacks.map((stack, index) => (
          <Stack name={`Stack ${index + 1}`} stack={stack} key={index} />
        ))} */}
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

export default Layout;
