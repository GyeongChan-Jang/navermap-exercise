import styles from '../public/styles/graphicInfoWindow.module.css'
import { renderToStaticMarkup } from 'react-dom/server'
import { renderToString } from 'react-dom/server'
import Chart from 'chart.js/auto'

export const GraphInfoWindow = () => {
  // 방법 1. canvas를 미리 html에 그려놓고 잡아서 chart를 그리는 방법
  let ctx = document.getElementById('myChart') as HTMLCanvasElement
  if (ctx) {
    new Chart(ctx?.getContext('2d')!, {
      type: 'line',
      data: {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
        datasets: [
          {
            label: '깃발 노출 수',
            data: [12, 19, 3, 5, 2, 3, 1],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }

  // 방법 2. div에 canvas를 innerHtml로 그려놓고 그 안에 chart를 그리는 방법
  // const chartContainer = document?.getElementById('chart')!

  // if (chartContainer) {
  //   chartContainer.innerHTML = `
  // <canvas class=${styles.chart} id='myChart'></canvas>
  // `
  //   let ctx = document.getElementById('myChart') as HTMLCanvasElement
  //   console.log(ctx)
  //   new Chart(ctx?.getContext('2d')!, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [
  //         {
  //           label: '# of Votes',
  //           data: [12, 19, 3, 5, 2, 3],
  //           borderWidth: 1
  //         }
  //       ]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   })
  // }

  // var myChart = new Chart(chartRef, {
  //   type: 'line',
  //   data: {
  //     labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
  //     datasets: [
  //       {
  //         label: '깃발 노출 수',
  //         data: [12, 19, 3, 5, 2, 3, 1],
  //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //         borderColor: 'rgba(255, 99, 132, 1)',
  //         borderWidth: 1
  //       }
  //     ]
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true
  //       }
  //     }
  //   }
  // })

  // chartContainer.innerHTML = `
  // <canvas class=${styles.chart} id='myChart'></canvas>
  // `

  return /* html */ `
  <div class=${styles.container}>
      <div class=${styles.header}>
        <div class=${styles.headerTitle}>
          <span>1. 깃발 123444</span>
          <button class=${styles.closeButton}>
            <img src=${'/svg/close.svg'} />
          </button>
        </div>
        <div class=${styles.headerContent}>
          <span>경성밥상 | 백반·죽·국수 | 123456</span>
        </div>
      </div>
      <div class=${styles.title}>
        <div>
          <span class=${styles.titleText}>깃발 노출 추이</span>
        </div>
        <div>
          <span class=${styles.detailText}>자세히보기 ></span>
        </div>
      </div>
      <div class=${styles.body}>
        <div id="chart" class=${styles.bodyContent}>
        <canvas class=${styles.chart} id='myChart'></canvas>
        </div>
      </div>
  </div>
  `
}
