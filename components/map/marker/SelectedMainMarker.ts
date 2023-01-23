import { StoreInfoType } from '..'
import markerStyles from 'public/styles/marker.module.css'

export const SelectedMainMarker = (item: StoreInfoType) => {
  return /* html */ `
<div
class=${markerStyles.selectedBubbleMarker}
>
    ${item.store_nm}
    <div class=${markerStyles.selectedBubbleMarkerBottomOuter}>
        <div class=${markerStyles.selectedBubbleMarkerBottomInner}></div>
    </div>
</div>`
}
