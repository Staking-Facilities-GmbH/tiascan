// Utils
import Identicon from 'react-identicons'
import styled from 'styled-components'
import { Tooltip } from 'react-tooltip'
import Image from "../image/image.component"




const Identikon = ({identity}) => {
	const palette = [
		"#610DFC",
		"#91F5E6"
	]

	return (
		<>
			<Tooltip anchorId={identity} clickable>
				<Id onClick={() => {navigator.clipboard.writeText(identity)}}>
					<Image
						src={`/assets/icons/copy-icon.svg`}
						alt=""
						width={16}
						height={16}
					/>
					<span style={{paddingLeft: '1rem'}}>{identity}</span>
				</Id>
			</Tooltip>
			<Id onClick={() => {navigator.clipboard.writeText(identity)}}
				id={identity}
				data-tooltip-content={identity}
				data-tooltip-place="top">
				<Identicon string={identity} size={'32'} palette={palette}/>
			</Id>
		</>
	)
}

export default Identikon

const Id = styled.span `
	cursor: pointer;
	
	canvas {
		margin: 0.7rem 0 0;
	}
`