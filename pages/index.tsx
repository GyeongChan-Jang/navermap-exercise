import Head from 'next/head'
import { useCallback, useEffect, useRef, useState } from 'react'
import MapSample from '../MapSample.json'
import styles from '../public/styles/marker.module.css'
import { MainMarker } from '../components/marker/MainMarker'
import { SelectedMainMarker } from '../components/marker/SelectedMainMarker'
import screenStyles from '../public/styles/screenLayout.module.css'
import { MapChangeButton } from '../components/MapChangeButton'
import { useRouter } from 'next/router'
import PuradakData from '../puradakData.json'
import { GraphInfoWindow } from '../components/GraphInfoWindow'

export interface storeInfo {
  store_nm: string
  store_status_str: string
  ceo_no: string
  map_cood_lat: string | null
  map_cood_lgt: string | null
  marker?: any
}

export default function Home() {
  const router = useRouter()

  const mapRef = useRef<HTMLElement | any | null>(null)
  const markerRef = useRef<naver.maps.Marker | null>(null)
  const selectedMarker = useRef<naver.maps.Marker | null>(null)
  const mapChangeButtonRef = useRef<any | null>(null)

  const [storeList, setStoreList] = useState<storeInfo[]>(PuradakData.data.results)

  // 마커 클릭 이동 이벤트 함수
  const markerClickHandler = (marker: naver.maps.Marker, item: storeInfo, name: string) => {
    naver.maps.Event.addListener(marker, 'click', (e: naver.maps.MapEventListener) => {
      // 마커로 이동
      const markerLatLng = new naver.maps.LatLng(+item.map_cood_lat!, +item.map_cood_lgt!)
      mapRef.current.setZoom(14)
      mapRef.current.panTo(markerLatLng)

      // 마커 변경
      if (!selectedMarker.current || (selectedMarker.current !== marker && name !== undefined)) {
        // 클릭된 마커 객체가 null이 아니면 기존 마커를 다시 원래대로
        if (selectedMarker.current) {
          // 클릭된 마커의 이름을 찾아서 마커 타이틀 유지
          const selectedName = PuradakData.data.results.find(
            (item: storeInfo) => item.store_nm === selectedMarker.current?.getTitle()
          )?.store_nm

          selectedMarker.current.setIcon({
            content: MainMarker(selectedName!)
          })
        }

        // 클릭된 마커 객체를 현재 클릭된 마커로 변경
        marker.setIcon({
          content: SelectedMainMarker(item)
        })

        selectedMarker.current = marker
        // mapRef.current.updateBy(mapLatLng, 15)

        graphInfoWindow(marker, item)
      }
    })
  }

  // 스토어 리스트 클릭 이동 이벤트 함수
  const storeListClickHandler = (store: storeInfo) => {
    storeList.find((item) => item.store_nm === store.store_nm)?.marker.trigger('click')
  }

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
        router.push(`map/${element.id}`)
      })
    })
  }

  const updateMarkers = (map: naver.maps.Map, markers: naver.maps.Marker[]) => {
    const mapBounds = map.getBounds()
    markers.map((marker) => {
      if (mapBounds.hasPoint(marker.getPosition())) {
        marker.setMap(map)
      } else {
        marker.setMap(null)
      }
    })
  }

  // 마커 띄우기
  useEffect(() => {
    let markers: naver.maps.Marker[] = []
    markers = PuradakData.data.results.map((item: storeInfo) => {
      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(+item.map_cood_lat!, +item.map_cood_lgt!),
        map: mapRef.current,
        icon: {
          content: MainMarker(item.store_nm)
        },
        title: item.store_nm
      })
      markerClickHandler(markerRef.current, item, item.store_nm)

      // 데이터에 marker 속성을 만들고 생성된 마커 객체를 넣어줌
      item.marker = markerRef.current
      return markerRef.current
    })

    // 마커가 업데이트 될 때마다 실행
    naver.maps.Event.addListener(mapRef.current, 'idle', () => {
      updateMarkers(mapRef.current, markers)
    })
  }, [mapRef])

  // 겹침 마커 처리
  useEffect(() => {
    const markers: naver.maps.Marker[] = PuradakData.data.results.map((item: storeInfo) => item.marker)
    // new naver.maps.MarkerClustering({

    // })
  })

  // 그래프 인포윈도우 띄우기
  const graphInfoWindow = (marker: naver.maps.Marker, item: storeInfo) => {
    const infoWindow = new naver.maps.InfoWindow({
      content: GraphInfoWindow(),
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      anchorSize: new naver.maps.Size(0, 0),
      anchorSkew: true,
      pixelOffset: new naver.maps.Point(0, -30)
    })
    infoWindow.open(mapRef.current, marker)
  }

  return (
    <>
      <Head>
        <title>NaverMap</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div className={screenStyles.container}>
          {/* 지도 */}
          <div style={{ width: '80vw', height: '100vh' }} ref={mapRef} id="map"></div>
          {/* 매장 리스트 뿌리는 사이드바 */}
          <div className={screenStyles.storeList}>
            {storeList.map((store, index) => (
              <div key={index} className={screenStyles.storeItem} onClick={() => storeListClickHandler(store)}>
                {store.store_nm}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
