import control from '../styles/MapChangeButton.module.css'

export const MapChangeButton = () => {
  return /* html */ ` 
  <div class=${control.changeButtons}>
      <div class=${control.buttonContainer} id=mapChange>
          <img src="/svg/map/flag.svg" width="20px" alt="랭킹" />
          <div class=${control.text}>깃발분석</div>
      </div>
      
      <div class='${control.buttonContainer} mapChange'>
          <img src="/svg/map/ranking.svg" width="20px" alt="랭킹" />
          <div class=${control.text}>맛집랭킹</div>
      </div>
      <div class='${control.buttonContainer} mapChange'>
          <img src="/svg/map/polygon.svg" width="20px" alt="랭킹" />   
          <span class=${control.text}>매출분포</span>
      </div>
  </div>`
}
