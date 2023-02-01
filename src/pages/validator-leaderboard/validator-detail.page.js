// Utils
import styled from 'styled-components'

// Components
import FlexContainer from '../../components/flex-container/flex-container.component'
import Image from '../../components/image/image.component'
import Identikon from '../../components/content/identikon.component'
import BlockNumberRow from '../../components/content/block-number-row.component'
import ProgressBar from '../../components/content/progress-bar.component'

// Hooks
import { useEffect, useState } from 'react'

// Styles
import '../../styles/pagination.css'

// Data
import CelestiaApi from '../../api/celestia-api'

// Conf
import {useLocation} from "wouter";


const ValidatorDetailPage = ({params}) => {
	const [, navigate] = useLocation()
	const [validatorDetails, setValidatorDetails] = useState({})
	const [info, setInfo] = useState({})
	const nodeId = params.identity || false
	const pageConf = {
		title: 'Validator Details',
		icon: 'node-icon.svg'
	}

	const placeholderData = {
		commission_max_rate: '5%',
		commission_rate: '3%',
		commission_max_change_rate: '0.1%',
		min_self_delegation: '100 TIA'
	}
	
	// go back to list if no validator ID given
	if (!nodeId) navigate("/validators", { replace: true })

	useEffect( ()=>{
		async function triggerFetchInfo() {
			return await CelestiaApi.fetchInfo()
		}

		triggerFetchInfo().then((data) => {
			setInfo(data)
		})
		async function triggerFetchValidatorDetails() {
			return await CelestiaApi.fetchValidatorDetails(nodeId)
		}

		triggerFetchValidatorDetails().then((data) => {
			//handle not found - back to list?
			if (!data.node_id) navigate("/validators", { replace: true })
			setValidatorDetails({...placeholderData, ...data})
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
	
	return(
		<>
			<BlockNumberRow stats={info} />

			<Section className="contentSection">
				<Container>
					<FlexContainer bottom="4rem" left="3rem" right="3rem">
						<HeaderBox>
							<figure>
								<Image
									src={`/assets/icons/${pageConf.icon}`}
									alt=""
									width={34}
									height={34}
								/>
							</figure>
							<Title>{pageConf.title}</Title>
						</HeaderBox>
					</FlexContainer>

					<Content>
						<NodeHead>
							<Identikon identity={validatorDetails.node_id} size="100" />
							<Identity>
								<Name>{validatorDetails?.moniker}</Name>
								<a href={validatorDetails?.description?.website}
								   target="_blank" rel="noreferrer"
								   title={`${validatorDetails?.moniker} Website`}>
									{validatorDetails?.description?.website}
								</a>
							</Identity>
						</NodeHead>

						<hr />

						<Facts>
							<Fact>
								<Number>{validatorDetails.commission_rate}</Number>
								<Description>
									Commission Initial Rate<br />
									(Comission Rate %)
								</Description>
							</Fact>
							<Fact>
								<Number>{validatorDetails.commission_max_rate}</Number>
								<Description>
									Commission Initial Rate<br />
									(Comission Rate %)
								</Description>
							</Fact>
							<Fact>
								<Number>{validatorDetails.commission_max_change_rate}</Number>
								<Description>
									Commission Initial Rate<br />
									(Comission Rate %)
								</Description>
							</Fact>
						</Facts>

						<hr />

						<Details>
							<Detail>
								<Label>Security Contact</Label>
								<a href={`mailto:${validatorDetails?.description?.security_contact}`}
									title={`Send email to ${validatorDetails?.moniker}`}>
									{validatorDetails?.description?.security_contact}
								</a>
							</Detail>
							<Detail>
								<Label>Identity</Label>
								{validatorDetails?.description?.identity}
							</Detail>
							<Detail>
								<Label>Min Self Delegation</Label>
								{validatorDetails.min_self_delegation}
							</Detail>
							<Detail>
								<Label>Uptime Score (last 100 blocks)</Label>
								<ProgressWrapper>
									<ProgressInner progress={(100)}>
										<span>{(100)} %</span>
									</ProgressInner>
									<ProgressBar progress={(100)} startColor="#91F5E6" endColor="#610DFC" />
								</ProgressWrapper>
							</Detail>
						</Details>

						<hr />

						<Details>
							<Detail>
								<Label>Details</Label>
								<IntroText>
									{validatorDetails?.description?.details}
								</IntroText>
							</Detail>
						</Details>

						<hr />

					</Content>
				</Container>
			</Section>
		</>
	)
}

export default ValidatorDetailPage

const Section = styled.section`
	a {
		color: ${({ theme }) => theme.colors.primary};
		text-decoration: underline;
	}
`

const NodeHead = styled.div`
	display: flex;
	align-items: center;
	justify-content: left;
	margin: 2rem 0 6.8rem;
`

const Identity = styled.div`
	margin-left: 4.3rem;
`

const Name = styled.span`
	display: block;
	font-weight: 300;
	font-size: 3rem;
`

const Description = styled.div`
	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		text-align: left;
	}
`

const Facts = styled.div`
	margin: 5.8rem 0;
	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		display: flex;
		justify-content: space-between;
	}
`

const Fact = styled.div`
	text-align: center;
	
	:nth-child(1) {
		span {
			color:  ${({ theme }) => theme.colors.fact1}
		}
	}
	:nth-child(2) {
		span {
			color:  ${({ theme }) => theme.colors.fact2}
		}
	}
	:nth-child(3) {
		span {
			color:  ${({ theme }) => theme.colors.fact3}
		}
	}
`

const Number = styled.span`
	font-size: 6rem;
	font-weight: 800;
`

const Details = styled.div`
	margin: 5.8rem 0;
`

const Detail = styled.div`
	display: flex;
	margin: 1rem 0;
`

const Label = styled.span`
	display: inline-block;
	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		min-width: 42%;
	}
`
const IntroText = styled.div`
	display: inline-block;
`

const Container = styled.div`
	max-width: 85.2rem;
	margin: 0 auto;
`

const Content = styled.div`
	overflow-x: auto;
	padding: 0 3rem 2rem 5rem;
`

const HeaderBox = styled.div`
	margin-left: -3rem;
	
	figure {
		display: inline-block;
		padding-right: 2rem;
	}
`

const Title = styled.h1`
	display: inline;
	font-size: 2.4rem;
	line-height: 3rem;
	border-bottom: 0.2rem solid;
	vertical-align: top;
`

const ProgressWrapper = styled.div`
	display: inline-block;
	position: relative;
	width: 17.7rem;
	height: 3rem;
	color: ${({ theme }) => theme.colors.background};
	background-color: ${({ theme }) => theme.colors.progressBg};
	border: 1px solid white;
	box-shadow: ${({ theme }) => theme.shadows.progressShadow};
	text-align: right;
`

const ProgressInner = styled.div`
	position: absolute;
	z-index: 1;
	width: ${({ progress }) => progress && progress}%;
	height: 100%;
	text-align: right;

	span {
		color: ${({ progress }) => (parseInt(progress) > 30) ? 'white' : 'black'};
		display: inline-block;
		min-width: 5rem;
		max-height: 100%;
		line-height: 2.6rem;
		overflow: visible;
		padding-right: 1rem;
		padding-left: ${({ progress }) => (parseInt(progress) > 30) ? '0' : '115%'};
		white-space: nowrap;
		vertical-align: top;
	}
`