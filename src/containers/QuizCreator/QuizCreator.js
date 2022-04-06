import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import { createControl, validateForm, validation } from "../../form/formFramework";
import { Auxilliary } from "../../hoc/Auxilliary/Auxilliary";
import { createQuestion, createQuiz } from "../../store/actions/createQuizActions";
import classes from "./QuizCreator.module.css";

function createOptionControl(number) {
  return createControl({
    label: `Ответ ${number}`,
    errorMessage: 'Ответ не может быть пустым',
    id: number
    }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос:',
      errorMessage: 'Вопрос не может быть пустым',
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends Component {

  state = {
    rightAnswer: 1,
    isFormValid: false,
    formControls: createFormControls()
  }

  submitHandler = event => {
    event.preventDefault()
  }

  addQuestionHandler = event => {
    event.preventDefault()

    const {question, option1, option2, option3, option4} = this.state.formControls

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswer: this.state.rightAnswer,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    this.props.createQuestion(questionItem)

    this.setState({
      rightAnswer: 1,
      isFormValid: false,
      formControls: createFormControls()  
    })
  }

  createQuizHandler = event => {
    event.preventDefault()
      
      this.setState({
        rightAnswer: 1,
        isFormValid: false,
        formControls: createFormControls()
      })

    this.props.createQuiz()
  }

  onChangeHandler = (value, name) => {
    const formControls = {...this.state.formControls}
    const control = formControls[name]

    control.touched = true
    control.value = value
    control.valid = validation(control.value, control.validation)

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswer: +event.target.value
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((name, index) => {

      const control = this.state.formControls[name]
      
      return (
        <Auxilliary key={name + index}>
          <Input
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={event => this.onChangeHandler(event.target.value, name)}
          />
          { name === 'question' ? <hr /> : null }
        </Auxilliary>
      )
    })
  }

  render() {

    const select = <Select 
        label='Выберите правильный ответ'
        value={this.state.rightAnswer}
        onChange={this.selectChangeHandler}
        options={[
          {text: 1, value: 1},
          {text: 2, value: 2},
          {text: 3, value: 3},
          {text: 4, value: 4}
        ]}
      />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создать тест</h1>
          
          <form onSubmit={this.submitHandler}>

            { this.renderInputs() }

            { select }

            <Button
              type='primary'
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>

            <Button
              type='success'
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Создать тест
            </Button>

          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
  }
}

function mapDispatchToProps(dispatch) {
  return  {
    createQuestion: item => dispatch(createQuestion(item)),
    createQuiz: () => dispatch(createQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)