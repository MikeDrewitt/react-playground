import styles from './card.module.scss'

type Props = {
  uid: string
}

const Card = ({ uid }: Props) => {
  const charOne = uid.charAt(0)
  const charTwo = uid.charAt(1)

  return (
    <img
      className={styles.container}
      src={`https://cards.scryfall.io/large/front/${charOne}/${charTwo}/${uid}.jpg`}
      alt="image"
    />
  )
}

export default Card
