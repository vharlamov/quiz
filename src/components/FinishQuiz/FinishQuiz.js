import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../UI/Button/Button'
import classes from './FinishQuiz.module.css'

const FinishQuiz = props => {
  const results = Object.keys(props.results)
  const rightAnswers = results.reduce((total, item) => {
    if (props.results[item] === 'success') total++
    return total
  }, 0)

  return (
    <div className={classes.FinishQuiz}>
      <ul>
        { props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error'
              ? 'fa-times'
              : 'fa-check',
            classes[props.results[quizItem.id]]
          ]

          return (
            <li key={index}>
              <strong>{quizItem.id}. </strong>
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          )
        })
        }
      </ul>
      <p>Правильно {rightAnswers} из {results.length}</p>
      <div>
      <Button 
            onClick={props.repeat}
            type='primary'
          >
          Повторить 
        </Button>
        <Link to='/'>
          <Button 
            type='success'
          >
            Перейти к списку тестов
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishQuiz