// @ts-nocheck

import { duration } from "@mui/material";
import { Context } from "chartjs-plugin-datalabels";
import { useEffect, useRef, useState } from "react";
import { PolarArea } from "react-chartjs-2";

interface ResultsWheelProps {
  sections: string[];
  colors: string[];
  answers: number[][];
  aspect: number;
  base64Image: string;
  setBase64Image: (string) => void;
}

function ResultsWheel(props: ResultsWheelProps) {
  let chartData = props.answers.map(v => v.reduce((sum, currentValue) => sum + currentValue, 0) / v.length)

  const data = {
    labels: props.sections,
    datasets: [
      {
        label: 'Outer Labels (Text)',
        data: chartData,
        backgroundColor: props.colors,
        borderColor: 'rgb(255, 255, 255)',
        datalabels: {
          textStrokeColor: 'black',
          textStrokeWidth: 1,
          font: (context: Context) => {
            const value = context.dataset.data[context.dataIndex] as number;
            const minSize = 13;
            const maxSize = 50;
            const scaledSize = minSize + (maxSize - minSize) * (value / 10);
            return {
              size: scaledSize
            }
          },
          color: (context: Context) => {
            const datasetIndex = context.datasetIndex;
            const index = context.dataIndex;
            return context.chart.data.datasets[datasetIndex].backgroundColor[index];
          },
          formatter: (v: number, context: Context) => {
            let key = (context.chart.data.labels as string[])[context.dataIndex];
            return key;
          },
          anchor: 'end',
          align: 'end',
          offset: (context: Context) => context.chart.width / 100,
        },
      },
      {
        label: 'Inner Numbers',
        data: chartData,
        backgroundColor: 'rgba(0, 0, 0, 0)', // invisible
        borderColor: 'rgba(0, 0, 0, 0)', // invisible
        datalabels: {
          display: true,
          anchor: 'center',
          align: 'center',
          color: 'black',
          font: (context: Context) => {
            const value = context.dataset.data[context.dataIndex] as number;
            const minSize = 5;
            const maxSize = 50;
            const scaledSize = minSize + (maxSize - minSize) * (value / 10);
            return {
              size: scaledSize,
              weight: 'bold',
            }
          },
          formatter: (value: number) => value.toFixed(1),
        },
      }
    ]
  };

  const options = {
    responsive: false,
    animation: {
      duration: 0,
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 100,
        bottom: 100,
        left: props.aspect > 1.2 ? 150 : 30,
        right: props.aspect > 1.2 ? 290 : 30,
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
        display: props.aspect > 1.2,
        position: 'left',
      },
      title: {
      },
      display: false,
      text: 'Vitality Coach result',
    },
  };

  const chartRef = useRef(null)
  const [chartRendered, setChartRendered] = useState(0)

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current
      const img = chartInstance.toBase64Image()
      props.setBase64Image(img)
      setChartRendered(chartRendered + 1)
    }
  })

  return (
    <>
      {(chartRendered < 3) && <PolarArea data={data} options={options} width={props.aspect > 1.2 ? 2000 : 1000} height={1000} ref={chartRef} />}
      <img src={props.base64Image} alt="Chart as Image" style={{
        width: "90vw"
      }} />
    </>
  )
}

export default ResultsWheel
