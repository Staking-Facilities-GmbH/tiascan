// Utils
import styled from 'styled-components'
import Image from '../image/image.component'

const NodeAnimation = () => {

	return (
		<Mover>
			<figure>
				<Image
					src={`/assets/visual_block.png`}
					alt=""
				/>
			</figure>
		</Mover>
	)
}

export default NodeAnimation

const Mover = styled.div`
	position: relative;
	top: -14.8rem;
	margin-bottom: -25.8rem;
	height: 25.6rem;
	z-index: -1;
	left: -2000px;
	animation: 8s blockMove infinite 1s linear;

	@keyframes blockMove {
		from {
			left: -2000px;
		}
		30% {
			left: -2000px;
		}
		to {
			left: 3000px;
		}
	}
`