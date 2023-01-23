import styles from '../public/styles/graphicInfoWindow.module.css'
import { renderToStaticMarkup } from 'react-dom/server'
import { renderToString } from 'react-dom/server'
import Chart from 'chart.js/auto'
import { storeInfo } from '../pages'

export const GraphInfoWindow = (item: storeInfo) => {
  console.log(item)
  return /* html */ `
  <div class=${styles.container}>
      <div class=${styles.header}>
        <div class=${styles.headerTitle}>
          <span>1. 깃발 123444</span>
          <button class=${styles.closeButton}>
            <img id="close" src=${'/svg/close.svg'} />
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
        <div class=${styles.bodyContent}>
        <canvas class=${styles.chart} id='myChart'></canvas>
        </div>
      </div>
  </div>
  `
}
