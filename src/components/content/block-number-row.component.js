// Utils
import styled from 'styled-components'
import Image from '../image/image.component'
import { useLocation } from 'wouter'

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
						<span>Block Number:</span> {stats?.latest_height}
					</BlockNumber>
				</NumBox>
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
			</Front>
			<Back>

				<CTA title="Reload page data" onClick={() => { navigate("/glossary") }}>
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
	display: flex;
	justify-content: space-between;
	margin-bottom: 4rem;
`

const Front = styled.div`
	figure {
		display: inline-block;
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
`

const BlockNumber = styled.span`
	display: inline-block;
	padding-left: 3rem;
	font-size: 2.4rem;
	line-height: 3rem;
	vertical-align: top;
	font-weight: 300;
	
	span {
		border-bottom: 1px solid;
	}
`

const CTA = styled.div`
	cursor: pointer;
	display: inline-block;
	background-color: ${({ theme }) => theme.colors.contentBg};
	border-radius: ${({ theme }) => theme.border.mediumRadius};
	box-shadow: ${({ theme }) => theme.shadows.boxShadow};
	padding: 1.1rem 2.7rem 0.7rem;
	vertical-align: top;

	figure {
		display: inline-block;
	}
	
	&:hover {
		box-shadow: ${({ theme }) => theme.shadows.ctaShadow}
	}
`

const Back = styled.div``
