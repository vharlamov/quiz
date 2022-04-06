import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { answerClick, fetchQuizById, repeatQuiz } from '../../store/actions/quizListActions'
import { connect } from 'react-redux'

export const ClickContext = React.createContext()

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.onRepeat()
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на вопросы:</h1>

          {
            this.props.loading || !this.props.quiz
              ? <Loader />
              : this.props.isFinished
                ? <FinishQuiz 
                    results={this.props.results}
                    quiz={this.props.quiz}
                    repeat={this.props.onRepeat}
                  />
                : <ClickContext.Provider value={this.props.quizAnswerClick}>
                    <ActiveQuiz 
                      question={this.props.quiz[this.props.activeQuestion].question}
                      answers={this.props.quiz[this.props.activeQuestion].answers}
                      quizLength={this.props.quiz.length}
                      answerNum={this.props.activeQuestion + 1}
                      state={this.props.answerState}
                    />
                  </ClickContext.Provider>
          }
          
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isFinished: state.quiz.isFinished,
    loading: state.quiz.loading,
    quiz: state.quiz.quiz
  }
}

function  mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    onRepeat: data => dispatch(repeatQuiz(data)),
    quizAnswerClick: answerId => dispatch(answerClick(answerId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)