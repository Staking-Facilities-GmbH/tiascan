import React, { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import chroma from 'chroma-js'

// Data
import CelestiaApi from '../../api/celestia-api'

const colorScale = chroma.scale(["#610DFC", "#91F5E6"]).colors(8)
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json"

export default function MapChart() {
	const [locations, setLocations] = useState([])

	useEffect(() => {
		let allLocations = []
		const getLocations = async (page) => {
			try {
				const response = await CelestiaApi.fetchLocations(page)
				allLocations = allLocations.concat(response.rows)
				if (page < response.pagination.total_pages) {
					await getLocations(page + 1)
				} else {
					setLocations(groupLocationsByRadius(allLocations))
				}
			} catch (error) {
				console.log(error)
			}
		}
		getLocations(1)
	}, [])

	function groupLocationsByRadius(locations) {
		const groupedLocations = {}

		locations.forEach((location) => {
			const [longitude, latitude] = location.location.split(",")
			const roundedLongitude = Math.floor(longitude / 12) * 12
			const roundedLatitude = Math.floor(latitude / 12) * 12
			const key = `${roundedLatitude},${roundedLongitude}`

			if (!groupedLocations[key]) {
				groupedLocations[key] = []
			}

			groupedLocations[key].push(location)
		})

		return groupedLocations
	}

	function getColor(num) {
		if (num < 8) {
			return colorScale[num-1]
		}
		else {
			return colorScale[7]
		}
	}
	function getFill(num) {
		if (num < 4) {
			return "lightgrey"
		}
		else {
			return "black"
		}
	}

	function getMarkerSize(num) {
		if (num < 4) {
			return 18
		}
		if (num < 7) {
			return 22
		}
		else {
			return 28
		}
	}


	return (
		<ComposableMap className="map" projection="geoMercator" style={{ fill: "lightgrey" }}>
			<Geographies geography={geoUrl} >
				{({ geographies }) =>
					geographies.map((geo) => (
						<Geography key={geo.rsmKey} geography={geo} />
					))
				}
			</Geographies>
			{Object.keys(locations).map((key) => (
				<Marker key={key} coordinates={key.split(",")}>
					<rect
						width={getMarkerSize(locations[key].length)}
						height={getMarkerSize(locations[key].length)}
						fill={getColor(locations[key].length)}
						rx={1}
					>
					</rect>
					<text   style={{ textAnchor: 'middle', dominantBaseline: 'central', overflow: 'hidden', textOverflow: 'ellipsis' }} x={getMarkerSize(locations[key].length)/2} y={getMarkerSize(locations[key].length)/2} fontSize={getMarkerSize(locations[key].length) * 0.7} fontWeight="bold" dominantBaseline="middle" textAnchor="middle" fill={getFill(locations[key].length)}>
						{locations[key].length}
					</text>

				</Marker>
			))}
		</ComposableMap>
	)
}