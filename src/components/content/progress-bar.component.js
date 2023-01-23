import chroma from 'chroma-js'

const ProgressBar = ({ progress, startColor, endColor }) => {
	const divs = Array(100).fill(0)
	const colorScale = chroma.scale([startColor, endColor]).colors(25)
	return (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(25, 7px)', gridTemplateRows: 'repeat(4, 7px)' }}>
			{divs.map((_, index) => (
				<div key={index} style={{ backgroundColor: index < progress ? colorScale[Math.floor(index / 4)] : 'transparent', gridRow: (index % 4) + 1, gridColumn: Math.floor(index / 4) + 1}} />
			))}
		</div>
	)
}

export default ProgressBar