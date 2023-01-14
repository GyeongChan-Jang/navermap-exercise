import { storeInfo } from '../../pages'
import markerStyles from '../../public/styles/marker.module.css'

export const MainMarker = (item: storeInfo | any) => {
  return /* html */ `
<div
    class=${markerStyles.bubbleMarker}>
    ${item.store_nm}
    <div class=${markerStyles.bubbleMarkerBottomOuter}>
        <div class=${markerStyles.bubbleMarkerBottomInner}></div>
    </div>
</div>`
}
