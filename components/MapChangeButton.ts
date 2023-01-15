import control from '../public/styles/mapChangeButton.module.css'

export const MapChangeButton = (pathname: string) => {
  return /* html */ ` 
  <div class=${control.changeButtons}>
      <div id=flag-analysis class="${control.buttonContainer} ${pathname}">
          <img src="/svg/flag.svg" width="20px" alt="랭킹" />
          <div class=${control.text}>깃발분석</div>
      </div>
      <div id=ranking-in-map class='${control.buttonContainer} ${pathname}'>
          <img src="/svg/ranking.svg" width="20px" alt="랭킹" />
          <div class=${control.text}>맛집랭킹</div>
      </div>
      <div id=sales-distribution class='${control.buttonContainer} ${pathname}'>
          <img src="/svg/polygon.svg" width="20px" alt="랭킹" />   
          <span class=${control.text}>매출분포</span>
      </div>
  </div>`
}
