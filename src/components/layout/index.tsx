import useResizeObserver from "use-resize-observer";

import Stack from "src/components/stack";

import styles from "./layout.module.scss";

type Props = {
  stacks: number[][];
};

const Layout = ({ stacks }: Props) => {
  const { ref, width = 1 } = useResizeObserver<HTMLDivElement>();

  let columns = 10;

  if (width < 1800) columns = 7;
  if (width < 1500) columns = 6;
  if (width < 1200) columns = 5;
  if (width < 1000) columns = 4;
  if (width < 800) columns = 3;
  if (width < 600) columns = 1;

  const displayColumns: number[][][] = [];

  for (let i = 0; i < stacks.length; i++) {
    const stack = stacks[i];
    const columnPlacement = i % columns;

    if (!displayColumns[columnPlacement]) displayColumns.push([stack]);
    else displayColumns[columnPlacement].push(stack);
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid} ref={ref}>
        {displayColumns.map((column, columnNumber) => {
          return (
            <div key={`column-${columnNumber}`}>
              {column.map((stack, placeInColumn) => (
                <Stack
                  name={`Stack ${columnNumber + 1 + placeInColumn * columns}`}
                  stack={stack}
                  key={columnNumber + 1 + placeInColumn * columns}
                />
              ))}
            </div>
          );
        })}

        {/* If masonry layout worked */}
        {/* {stacks.map((stack, index) => (
          <Stack name={`Stack ${index + 1}`} stack={stack} key={index} />
        ))} */}
      </div>
    </div>
  );
};

export default Layout;
