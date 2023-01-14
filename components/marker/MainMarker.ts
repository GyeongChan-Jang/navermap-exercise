import { storeInfo } from '../../pages'
import markerStyles from '../../public/styles/marker.module.css'

export const MainMarker = (item: string) => {
  return /* html */ `
<div
    class=${markerStyles.bubbleMarker}>
    ${item}
    <div class=${markerStyles.bubbleMarkerBottomOuter}>
        <div class=${markerStyles.bubbleMarkerBottomInner}></div>
    </div>
</div>`
}
