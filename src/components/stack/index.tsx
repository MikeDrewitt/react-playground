import Card from "src/components/card";

import styles from "./stack.module.scss";

type Props = {
  name: string;
  stack: number[];
};

const Stack = ({ name, stack }: Props) => {
  const gridTemplateRows = stack.reduce((acc, _value, index) => {
    if (index !== stack.length - 1) acc += "2.5rem ";
    else acc += "auto";

    return acc;
  }, "");

  return (
    <div className={styles.container}>
      <h3>{name}</h3>
      <div className={styles.cards} style={{ gridTemplateRows }}>
        {stack.map((_card, index) => (
          <Card key={index} />
        ))}
      </div>
    </div>
  );
};
export default Stack;
