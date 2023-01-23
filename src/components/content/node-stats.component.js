// Utils
import styled from 'styled-components'
import Image from '../image/image.component'

const NodeStats = ({stats, active}) => {
	return (
		<NodeStat className="stats">
			<Stat>
				<figure>
					<Image
						src={`/assets/icons/validator-icon.svg`}
						alt=""
						width={34}
						height={34}
					/>
				</figure>
				<Title className={active === 'validator' ? 'active' : ''}>
					Validators:
				</Title>
				<Count> {stats?.counts?.validators_nodes}</Count>
			</Stat>
			<Stat>
				<figure>
					<Image
						src={`/assets/icons/node-icon.svg`}
						alt=""
						width={34}
						height={34}
					/>
				</figure>
				<Title className={active === 'bridge' ? 'active' : ''}>
					Bridge Nodes:
				</Title>
				<Count> {stats?.counts?.bridge_nodes}</Count>
			</Stat>
			<Stat>
				<figure>
					<Image
						src={`/assets/icons/node-icon.svg`}
						alt=""
						width={34}
						height={34}
					/>
				</figure>
				<Title className={active === 'full' ? 'active' : ''}>
					Full Storage Nodes:
				</Title>
				<Count> {stats?.counts?.full_nodes}</Count>
			</Stat>
			<Stat>
				<figure>
					<Image
						src={`/assets/icons/node-icon.svg`}
						alt=""
						width={34}
						height={34}
					/>
				</figure>
				<Title className={active === 'light' ? 'active' : ''}>
					Light Nodes:
				</Title>
				<Count> {stats?.counts?.light_nodes}</Count>
			</Stat>
		</NodeStat>
	)
}

export default NodeStats


const NodeStat = styled.div`
	margin-left: 3rem;
`

const Stat = styled.div`
	margin: 1.5rem 0;
	
	figure {
		display: inline-block;
		padding-right: 2rem;
	}
`

const Title = styled.span`
	font-size: 2.4rem;
	line-height: 3.4rem;
	vertical-align: top;
	font-weight: 300;

	&.active {
		border-bottom: 1px solid;
	}
`

const Count = styled.span`
	font-size: 2.2rem;
	font-weight: 300;
	line-height: 3.4rem;
	vertical-align: top;
`