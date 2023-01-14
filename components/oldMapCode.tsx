import Head from 'next/head'
import { useCallback, useEffect, useRef, useState } from 'react'
import MapSample from '../MapSample.json'
import styles from '../public/styles/marker.module.css'

export default function Home() {
  const mapRef = useRef<HTMLElement | any | null>(null)
  const markerRef = useRef<naver.maps.Marker | null>(null)
  const selectedMarker = useRef<any | null>(null)
  // const itemRef = useRef<any | null>(null)

  const [storeList, setStoreList] = useState<storeInfo[]>(MapSample.data.results)

  interface storeInfo {
    store_nm: string
    store_status_str: string
    ceo_no: string
    map_cood_lat: string
    map_cood_lgt: string
    marker?: any
  }

  const markerHtml = (item: storeInfo) => {
    return /* html */ `
    <div
      class=${styles.marker}
      style="position:relative; height: 27px; line-height: 19px; font-weight:500; font-size:13px; padding:4px 17px; border:solid 1px #222; box-shadow:0 3px 6px 0 rgba(0, 0, 0, 0.16); background-color: #fff; border-radius: 4px;"
    >
      <span>
        ${item.store_nm}
      </span>
      <!-- <div style="position:absolute; width:50%; height:10px; background-color:red "></div> -->
    </div>`
  }

  const selectedMarkerHtml = (item: storeInfo) => {
    return /* html */ `
    <div
      style="position:relative; height: 27px; line-height: 19px; font-weight:500; font-size:13px; padding:4px 17px; border:solid 1px #222; box-shadow:0 3px 6px 0 rgba(0, 0, 0, 0.16); background-color: red; border-radius: 4px;"
    >
      <span>
        ${item.store_nm}
      </span>
      <!-- <div style="position:absolute; width:50%; height:10px; background-color:red "></div> -->
    </div>`
  }
  const updateMarkers = (map: naver.maps.Map, markers: any[]) => {
    let mapBounds = map.getBounds()
    let marker, position
    for (var i = 0; i < markers.length; i++) {
      marker = markers[i]
      position = marker.getPosition()
    }
  }

  useEffect(() => {
    // 지도 그리기
    const { naver } = window
    const location: naver.maps.LatLng = new naver.maps.LatLng(37.5657, 126.9769)
    if (!naver || !mapRef) return
    mapRef.current = new naver.maps.Map('map', {
      center: location,
      zoom: 10,
      zoomControl: false
    })
  }, [mapRef])

  useEffect(() => {
    // 마커 그리기
    if (!mapRef.current) return
    let markers: any[] = []
    markers = MapSample.data.results.map((item) => {
      markerRef.current = new naver.maps.Marker({
        icon: {
          content: markerHtml(item)
        },
        position: new naver.maps.LatLng(+item.map_cood_lat, +item.map_cood_lgt),
        map: mapRef.current,
        title: item.store_nm
      })

      markerClickEvent(markerRef.current, item)

      // 매장 리스트에 마커 속성 넣어줌
      setStoreList((prev) => {
        return prev.map((prevItem) => {
          if (prevItem.store_nm === item.store_nm) {
            return {
              ...prevItem,
              marker: markerRef.current
            }
          }
          return prevItem
        })
      })
      console.log(storeList)
      return markerRef.current
    })

    naver.maps.Event.addListener(mapRef.current, 'idle', () => {
      updateMarkers(mapRef.current, markers)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef, markerRef])

  // 마커 클릭 이벤트

  const markerClickEvent = useCallback(
    // 해당 마커로 맵 중심 이동
    (marker: naver.maps.Marker, item: storeInfo) => {
      naver.maps.Event.addListener(marker, 'click', (e: any) => {
        const mapLatLng = new naver.maps.LatLng(+item.map_cood_lat, +item.map_cood_lgt)
        mapRef.current.panTo(mapLatLng, e?.coord)
      })

      // 마커 클릭시 해당 마커 표시
      naver.maps.Event.addListener(marker, 'click', (e: any) => {
        if (selectedMarker.current) {
          selectedMarker.current.setMap(null)
        }
        selectedMarker.current = new naver.maps.Marker({
          icon: {
            content: selectedMarkerHtml(item)
          },
          position: new naver.maps.LatLng(+item.map_cood_lat, +item.map_cood_lgt),
          map: mapRef.current,
          title: item.store_nm
        })
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mapRef, markerRef]
  )

  // 매장 리스트 클릭 이벤트
  const storeClickEvent = useCallback(
    (item: storeInfo) => {
      if (selectedMarker.current) {
        selectedMarker.current.setMap(null)
      }
      selectedMarker.current = new naver.maps.Marker({
        icon: {
          content: selectedMarkerHtml(item)
        },
        position: new naver.maps.LatLng(+item.map_cood_lat, +item.map_cood_lgt),
        map: mapRef.current,
        title: item.store_nm
      })
      const mapLatLng = new naver.maps.LatLng(+item.map_cood_lat, +item.map_cood_lgt)
      mapRef.current.panTo(mapLatLng)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mapRef, markerRef]
  )

  // 겹침 마커 처리
  // const recognizer = new MarkerOverlappingRecognizer({

  // })

  return (
    <>
      <Head>
        <title>NaverMap</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.container}>
          <div style={{ width: '80vw', height: '100vh' }} ref={mapRef} id="map"></div>
          {/* 매장 리스트 뿌리는 사이드바 */}
          <div className={styles.storeList}>
            {storeList.map((item) => (
              <div key={item.store_nm} className={styles.storeItem} onClick={() => storeClickEvent(item)}>
                {item.store_nm}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}