import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { MapChangeButton } from '../../components/map/control/MapChangeButton'
import FCMap from 'components/map'

const Ranking = () => {
  const mapRef = useRef<any>(null)

  return (
    <>
      <FCMap mapRef={mapRef} />
    </>
  )
}

export default Ranking
