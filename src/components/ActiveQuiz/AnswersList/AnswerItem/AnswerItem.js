import React from 'react'
import { ClickContext } from '../../../../containers/Quiz/Quiz'
import classes from './AnswerItem.module.css'

const AnswerItem = props => {
  const cls = [classes.AnswerItem]

  if (props.state) {
    cls.push(classes[props.state])
  }

  return (
    <ClickContext.Consumer>
      {value => {
        return (
          <li 
            onClick={() => value(props.answer.id)}
            className={cls.join(' ')}
          >
            { props.answer.text }
          </li>
        )
      }}
    </ClickContext.Consumer>)
}

export default AnswerItem