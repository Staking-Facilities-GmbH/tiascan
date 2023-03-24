// Utils
import styled from 'styled-components'
import Image from '../image/image.component'
import {Link} from "wouter";
import Formatters from "../../formatter/formatters";

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
				<TitleLink to="/validators" className={active === 'validator' ? 'active' : ''}>
					Validators:
				</TitleLink>
				<Count> {Formatters.readableNumber(stats?.counts?.validators_nodes)}</Count>
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
				<TitleLink to="/bridge-nodes" className={active === 'bridge' ? 'active' : ''}>
					Bridge Nodes:
				</TitleLink>
				<Count> {Formatters.readableNumber(stats?.counts?.bridge_nodes)}</Count>
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
				<TitleLink to="/full-storage" className={active === 'full' ? 'active' : ''}>
					Full Storage Nodes:
				</TitleLink>
				<Count> {Formatters.readableNumber(stats?.counts?.full_nodes)}</Count>
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
				<TitleLink to="/light-nodes" className={active === 'light' ? 'active' : ''}>
					Light Nodes:
				</TitleLink>
				<Count> {Formatters.readableNumber(stats?.counts?.light_nodes)}</Count>
			</Stat>
		</NodeStat>
	)
}

export default NodeStats


const NodeStat = styled.div`
	padding: 2rem 1rem;
	background-color: ${({ theme }) => theme.colors.contentBg};
	border-radius: ${({ theme }) => theme.border.mediumRadius};

	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		margin-left: 3rem;
		padding: 2rem 3rem;
	}
`

const Stat = styled.div`
	margin-bottom: 3rem;
	
	figure {
		display: inline-block;
		padding-right: 2rem;
	}
`

const TitleLink = styled(Link)`
	font-size: 2rem;
	line-height: 3.4rem;
	vertical-align: top;
	font-weight: 300;
	color: ${({ theme }) => theme.header.navItemColor};
	
	&.active {
		border-bottom: 0.2rem solid;
	}
	
	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		font-size: 2.4rem;
	}
`

const Count = styled.span`
	font-size: 2rem;
	font-weight: 300;
	line-height: 3.4rem;
	vertical-align: top;

	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		font-size: 2.4rem;
	}
`