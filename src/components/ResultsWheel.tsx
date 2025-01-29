// @ts-nocheck

import { duration } from "@mui/material";
import { Context } from "chartjs-plugin-datalabels";
import { useEffect, useRef, useState } from "react";
import { PolarArea } from "react-chartjs-2";

interface ResultsWheelProps {
  sections: string[];
  colors: string[];
  answers: number[][];
}

function ResultsWheel(props: ResultsWheelProps) {
  let chartData = props.answers.map(v => v.reduce((sum, currentValue) => sum + currentValue, 0) / v.length)

  const data = {
    labels: props.sections,
    datasets: [
      {
        label: 'Overall Score',
        data: chartData,
        backgroundColor: props.colors,
        borderColor: 'rgb(255, 255, 255)'
      },
    ],
  };

  const options = {
    responsive: false,
    animation: {
      duration: 0,
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 150,
        right: 290,
      }
    },
    scales: {
      r: {
        min: 0,
        max: 10,
        beginAtZero: true,
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'left',
        layout: {
        }
      },
      title: {
        display: false,
        text: 'Vitality Coach result',
      },
      datalabels: {
        textStrokeColor: 'black',
        textStrokeWidth: 1,
        font: {
          family: 'Roboto',
          size: 15,
        },
        color: (context: Context) => {
          const datasetIndex = context.datasetIndex;
          const index = context.dataIndex;
          // Access the color of the specific segment
          return context.chart.data.datasets[datasetIndex].backgroundColor[index];
        },
        formatter: (v: number, context: Context) => {
          let key = (context.chart.data.labels as string[])[context.dataIndex];
          return key;
        },
        anchor: 'end',
        align: 'end',
        offset: (context: Context) => {
          return context.chart.width / 100;
        },
      }
    },
  };

  const chartRef = useRef(null)
  const [base64Image, setBase64Image] = useState('')
  const [chartRendered, setChartRendered] = useState(0)

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current
      const img = chartInstance.toBase64Image()
      setBase64Image(img)
      setChartRendered(chartRendered + 1)
    }
  })

  return (
    <>
      {(chartRendered < 2) && <PolarArea data={data} options={options} width={2000} height={1000} ref={chartRef} />}
      <img src={base64Image} alt="Chart as Image" className="rendered-chart" style={{
        height: "80vh"
      }} />
    </>
  )
}

export default ResultsWheel
