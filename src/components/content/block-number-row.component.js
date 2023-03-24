// Utils
import styled from 'styled-components'
import Image from '../image/image.component'
import { useLocation } from 'wouter'
import Formatters from '../../formatter/formatters'

const reloadPage = () => {
	window.location.reload();
}

const BlockNumberRow = ({stats}) => {
	const [, navigate] = useLocation()

	return (
		<FlexBox>
			<Front>
				<NumBox>
					<figure>
						<Image
							src={`/assets/icons/block-icon.svg`}
							alt=""
							width={34}
							height={34}
						/>
					</figure>
					<BlockNumber>
						<span>Block Number:</span> {Formatters.readableNumber(stats?.latest_height)}
					</BlockNumber>
				</NumBox>
			</Front>
			<Back>
				<CTA title="Reload page data" onClick={reloadPage}>
					<figure>
						<Image
							src={`/assets/icons/reload-icon.svg`}
							alt=""
							width={24}
							height={24}
						/>
					</figure>
				</CTA>
				<CTA title="Check out the glossary" onClick={() => { navigate("/glossary") }}>
					<figure>
						<Image
							src={`/assets/icons/info-icon.svg`}
							alt=""
							width={24}
							height={24}
						/>
					</figure>
				</CTA>
			</Back>
		</FlexBox>
	)
}

export default BlockNumberRow

const FlexBox = styled.div`
	margin-bottom: 4rem;
`

const Front = styled.div`
	figure {
		display: inline-block;
		width: 0;
		overflow: hidden;
		margin-left: -1.3rem;

		@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
			width: auto;
			margin-left: 0;
			overflow: initial;
		}
	}
`

const NumBox = styled.div`
	display: inline-block;
	padding: 0.5rem 3.4rem 0.1rem;
	margin-right: 1.3rem;
	border: 1px solid rgba(255,255,255,0.5);
	background-color: ${({ theme }) => theme.colors.blocksBg};
	border-radius: ${({ theme }) => theme.border.mediumRadius};
	box-shadow: ${({ theme }) => theme.shadows.boxShadow};
	position: relative;
	z-index: -1;
	margin-bottom: 2rem;

	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		float: left;
		margin-bottom: 0;
	}
`

const BlockNumber = styled.span`
	display: inline-block;
	font-size: 2rem;
	line-height: 3rem;
	vertical-align: top;
	font-weight: 300;
	
	span {
		border-bottom: 0.2rem solid;
	}

	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		font-size: 2.4rem;
		padding-left: 3rem;
	}
`

const CTA = styled.div`
	cursor: pointer;
	display: inline-block;
	background-color: ${({ theme }) => theme.colors.contentBg};
	border-radius: ${({ theme }) => theme.border.mediumRadius};
	padding: 1.1rem 2.7rem 0.7rem;
	vertical-align: top;
	transition: 1.5s ease-in-out;
	border: 0.1rem solid transparent;
	margin-top: -0.1rem;
	
	&::before {
		display: block;
		width: 100%;
		height: 100%;
		box-shadow: ${({ theme }) => theme.shadows.boxShadow};
	}
	
	figure {
		display: inline-block;
	}
	
	&:hover {
		box-shadow: ${({ theme }) => theme.shadows.ctaShadow};
		border-color: ${({ theme }) => theme.colors.ctaColor};
	}

	@media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
		margin-right: 2rem;
	}
`

const Back = styled.div`
	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		display: flex;
		justify-content: space-between;
	}
`
