import styles from "./card.module.scss";

const Card = () => (
  <img
    className={styles.container}
    src="https://cards.scryfall.io/large/front/3/3/338e5b63-1fee-4a7c-af9b-483d383f79b7.jpg?1699044719"
    alt="image"
  />
);

export default Card;
