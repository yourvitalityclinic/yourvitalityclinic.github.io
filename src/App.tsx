import { useState } from 'react'
import './App.css'
import { ArcElement, CategoryScale, Chart, Legend, RadialLinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ScreenName } from './screens/ScreenProps';
import HomeScreen from './screens/Home';
import QuestionsScreen from './screens/Questions';
import ResultsScreen from './screens/Results';
import questions from './questions.json';

Chart.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  RadialLinearScale,
  ChartDataLabels
);

const colors = [
  'rgb(227, 6, 18)',
  'rgb(245, 136, 1)',
  'rgb(254, 203, 1)',
  'rgb(161, 199, 19)',
  'rgb(78, 175, 50)',
  'rgb(67, 190, 234)',
  'rgb(0, 124, 198)',
  'rgb(158, 87, 154)'
]

const dimColors = [
  'rgba(227, 6, 18, 0.2)',
  'rgba(245, 136, 1, 0.2)',
  'rgba(254, 203, 1, 0.2)',
  'rgba(161, 199, 19, 0.2)',
  'rgba(78, 175, 50, 0.2)',
  'rgba(67, 190, 234, 0.2)',
  'rgba(0, 124, 198, 0.2)',
  'rgba(158, 87, 154, 0.2)'
]

const sections = [
  "Mental health and stress management",
  "Relationships / Connections",
  "Nutrition",
  "Exercise",
  "Sleep",
  "Work / Education / Passions",
  "Health",
  "Spirituality / Philosophy of life"
]

const sectionsShort = [
  "Mental Health",
  "Relationships",
  "Nutrition",
  "Exercise",
  "Sleep",
  "Work/Education",
  "Health",
  "Spirituality"
]

function App() {
  const [screen, setScreen] = useState<ScreenName>("home")
  const [answers, setAnswers] = useState(questions.map(v => v.map(() => 1)))

  if (screen == "home") {
    return <HomeScreen
      nextScreen={setScreen}
    />
  } else if (screen == "questions") {
    return <div className='wrapper'><QuestionsScreen
      nextScreen={setScreen}
      sections={sections}
      colors={colors}
      dimColors={dimColors}
      answers={answers}
      setAnswers={setAnswers}
    /></div>
  } else if (screen == "results") {
    return <ResultsScreen
      nextScreen={setScreen}
      sections={sectionsShort}
      colors={colors}
      answers={answers}
      retake={() => {
        setScreen("questions")
        setAnswers(questions.map(v => v.map(() => 1)))
      }}
    />
  }
}

export default App
