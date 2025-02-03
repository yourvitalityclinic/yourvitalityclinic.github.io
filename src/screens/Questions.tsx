import { useState } from "react";
import SectionsBar from "../components/SectionsBar";
import QuizSlider from "../components/Slider";
import { ScreenName } from "./ScreenProps";
import questions from '../questions.json'
import AltSectionsBar from "../components/AltSectionsBar";

export interface QuestionsScreenProps {
  nextScreen: (next: ScreenName) => void;
  sections: string[];
  colors: string[];
  dimColors: string[];
  answers: number[][];
  aspect: number;
  setAnswers: (newValue: number[][]) => void;
}

function QuestionsScreen(props: QuestionsScreenProps) {
  console.log(props.aspect)
  let numberOfQuestions = props.answers.reduce((acc, v) => acc + v.length, 0)

  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(1)

  const nextButton = () => {
    if (currentQuestion + 1 === questions[currentSection].length) {
      setCurrentSection(currentSection + 1)
      setCurrentQuestion(0)
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
    setQuestionNumber(questionNumber + 1)
  }

  const previousButton = () => {
    if (currentQuestion === 0) {
      setCurrentQuestion(questions[currentSection - 1].length - 1)
      setCurrentSection(currentSection - 1)
    } else {
      setCurrentQuestion(currentQuestion - 1)
    }
    setQuestionNumber(questionNumber - 1)
  }

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      margin: "0px 0px 0px 0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>

      <div className="section-div">
        {props.aspect > 1.2 ?
          <SectionsBar
            sections={props.sections}
            colors={props.colors}
            dimColors={props.dimColors}
            currentSection={currentSection}
          /> : <AltSectionsBar
            sections={props.sections}
            colors={props.colors}
            dimColors={props.dimColors}
            currentSection={currentSection}
          />}
      </div>

      {currentSection === (props.sections.length - 1) ?
        <div className="skip-div">
          <p>Not everyone believes that being on a spiritual journey contributes to vitality and full aliveness. You can complete this section to reflect on this aspect of your life, or you can skip it entirely.</p>
          <button
            className="start-button"
            onClick={() => {
              let newAnswers = [...props.answers]
              newAnswers.pop()
              props.setAnswers(newAnswers)
              props.nextScreen("results")
            }}
          >Skip to results</button>
        </div> : <></>}

      <div className='question-div'>
        <p className='question-text'>({questionNumber}/{numberOfQuestions}) {questions[currentSection][currentQuestion]}</p>
      </div>

      <div className="slider-div">
        <QuizSlider
          value={props.answers[currentSection][currentQuestion]}
          onChange={(newValue) => {
            let newAnswers = [...props.answers]
            newAnswers[currentSection][currentQuestion] = newValue
            props.setAnswers(newAnswers)
          }}
        />
      </div>

      <div className='buttons-div'>
        <button
          className='but'
          onClick={previousButton}
          disabled={currentQuestion == 0 && currentSection == 0}
        >← Previous</button>

        {
          (currentSection == questions.length - 1 && currentQuestion == questions[currentSection].length - 1) ? (
            <button className='but' onClick={() => props.nextScreen("results")}>
              Complete
            </button>
          ) : (
            <button className='but' onClick={nextButton}>
              → Next
            </button>
          )
        }

      </div>
    </div>
  )
}

export default QuestionsScreen
