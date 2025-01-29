import ResultsWheel from "../components/ResultsWheel"
import { ScreenName } from "./ScreenProps";

interface ResultsScreenProps {
  nextScreen: (next: ScreenName) => void;
  retake: () => void;
  sections: string[];
  colors: string[];
  answers: number[][];
}

function ResultsScreen(props: ResultsScreenProps) {
  return (
    <>
      <div className='title-div'>
        <h1><b>Your results</b></h1>
      </div>
      <div className='chart-div'>
        <ResultsWheel
          sections={props.sections}
          colors={props.colors}
          answers={props.answers}
        />
      </div>
      <h2><b>Develop continuously</b></h2>
      <p>Register today and have your results delivered straight to your email.<br />You'll also gain access to the Vitaltiy Clinic newsletter, packed with valuable tips, exciting projects, and practical exercises to keep you motivated and help you work toward your best life.<br />But that's not all! As a subscriber, you'll receive an exclusive offer to book your first 60-minute psychological vitality consultation with me at 50% off the regular price. This session will help you identify your goals and overcome the barriers holding you back from a more fulfilling life.<br />And don't worry- you can unsubscribe at any time.</p>

      <div className="retake-div">
        <button
          className="start-button"
          onClick={props.retake}
        >Retake Quiz</button>
      </div>
    </>
  )
}

export default ResultsScreen
