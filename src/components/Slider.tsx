import { Slider } from "@mui/material";

interface QuizSliderProps {
  value: number;
  onChange: (newValue: number) => void;
}

function QuizSlider(props: QuizSliderProps) {
  let marks = [...Array(10).keys()].map(x => {
    return {
      value: x + 1,
      label: (x + 1).toString()
    }
  })
  marks[0].label = "1 (Not at all)";
  marks[9].label = "10 (Fully)";

  return (
    <Slider
      sx={{
        '& .MuiSlider-thumb': {
          width: 20, // Thumb size
          height: 20,
          boxShadow: 'none',
        },
        '& .MuiSlider-rail': {
          height: 10, // Height of the rail
        },
        '& .MuiSlider-track': {
          height: 10, // Height of the track (the filled part of the slider)
        },
      }}
      value={props.value}
      min={1}
      max={10}
      marks={marks}
      step={1}
      shiftStep={1}
      onChange={(_e, v, _t) => {
        if (typeof v === "number") {
          props.onChange(v)
        }
      }}
    />
  )
}

export default QuizSlider
