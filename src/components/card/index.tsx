import styles from "./card.module.scss";

const Card = () => (
  <img
    className={styles.container}
    src="https://cards.scryfall.io/large/front/3/3/338e5b63-1fee-4a7c-af9b-483d383f79b7.jpg?1699044719"
    // src="https://lh3.googleusercontent.com/pw/AP1GczPeQhIZUikIxfgzwS6H78Exp-93GZtF2fRi4eHCg8mnScqOOdTpuw-ZszO_0UadTBPhw2pwkxcd261Yva8ofUvPkfed0LXzX5Q4alPPZuvzri-BfgzBbhNyf-Tw3OAqgV42hqNQlhQjjGRfQ2s487pj=w1420-h1893-s-no-gm?authuser=0"
    // src="https://media.licdn.com/dms/image/D5603AQF7MdAb2oa_GQ/profile-displayphoto-shrink_800_800/0/1682096753481?e=2147483647&v=beta&t=uAEOLUXhkMzrmSoU0187CZgeJX9puf2HRgntTyXo8QQ"
    alt="image"
  />
);

export default Card;
