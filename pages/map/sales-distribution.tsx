import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { MapChangeButton } from '../../components/MapChangeButton'

const SalesDistribution = () => {
  const mapRef = useRef<any>(null)
  const mapChangeButtonRef = useRef<any | null>(null)

  const router = useRouter()

  // 지도 띄우기
  useEffect(() => {
    mapRef.current = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.5657, 126.9769),
      zoom: 12,
      disableKineticPan: false,
      mapDataControl: false
    })

    // 지도 변경 버튼
    if (!mapRef.current) return
    naver.maps.Event.once(mapRef.current, 'init', () => {
      mapChangeButtonRef.current = new naver.maps.CustomControl(MapChangeButton(router.pathname), {
        position: naver.maps.Position.TOP_RIGHT
      })
      mapChangeButtonRef.current.setMap(mapRef.current)

      // 커스텀컨트롤 클릭 이벤트
      const flagButton = document.getElementById('flag-analysis')
      const rankingButton = document.getElementById('ranking-in-map')
      const salesButton = document.getElementById('sales-distribution')
      mapChangeHandler([flagButton!, rankingButton!, salesButton!])
    })
  }, [])

  const mapChangeHandler = (elements: HTMLElement[]) => {
    if (!elements) return
    elements.map((element) => {
      naver.maps.Event.addDOMListener(element, 'click', () => {
        if (router.pathname === `/map/${element.id}`) return
        router.replace(`/map/${element.id}`)
      })
    })
  }

  return <div style={{ width: '80vw', height: '100vh' }} ref={mapRef} id="map"></div>
}

export default SalesDistribution
