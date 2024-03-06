import { forwardRef } from 'react'
import { DraggableProvided } from '@hello-pangea/dnd'

import Card from 'src/components/card'

import styles from './stack.module.scss'

type Props = {
  name: string
  stack: string[]
  style?: React.CSSProperties
}

const Stack = forwardRef((props: Props & Omit<DraggableProvided, 'innerRef'>, ref: any) => {
  const gridTemplateRows = props.stack.reduce((acc, _value, index) => {
    if (index !== props.stack.length - 1) acc += '2.5rem '
    else acc += 'auto'

    return acc
  }, '')

  return (
    <div
      className={styles.container}
      {...props.draggableProps}
      style={{
        ...props.style,
        left: 'auto !important',
        top: 'auto !important',
      }}>
      <h3 ref={ref} {...props.dragHandleProps}>
        {props.name}
      </h3>
      <div className={styles.cards} style={{ gridTemplateRows: gridTemplateRows || 'auto' }}>
        {props.stack.map((card, index) => (
          <Card key={index} uid={card} />
        ))}

        {!props.stack.length && <div className={styles.emptyStack}>Empty stack</div>}
      </div>
    </div>
  )
})

export default Stack

export const UndraggableStack = (props: Props) => (
  <Stack
    {...props}
    ref={undefined}
    dragHandleProps={null}
    draggableProps={{
      'data-rfd-draggable-context-id': 'unknown',
      'data-rfd-draggable-id': 'unknown',
    }}
  />
)
