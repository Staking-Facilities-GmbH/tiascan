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
import Formatters from "../../formatter/formatters";


const ValidatorDetailPage = ({params}) => {
	const [, navigate] = useLocation()
	const [validatorDetails, setValidatorDetails] = useState({})
	const [info, setInfo] = useState({})
	const nodeId = params.identity || false
	const pageConf = {
		title: 'Validator Details',
		icon: 'node-icon.svg'
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
			setValidatorDetails(data)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
	
	return(
		<>
			<BlockNumberRow stats={info} />

			<Section className="contentSection">
				<Container>
					<FlexContainer bottom="4rem" left="3rem" right="3rem">
						<FlexWrap>
							<CTA title="Go back to the list" onClick={() => { navigate("/validators") }}>
								<figure>
									<Image
										src={`/assets/icons/back-icon.svg`}
										alt=""
										width={24}
										height={24}
									/>
								</figure>
							</CTA>
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
						</FlexWrap>

					</FlexContainer>

					<Content>
						<NodeHead>
							<Identikon identity={validatorDetails?.node_id} size="100" />
							<Identity>
								<Name>{validatorDetails?.moniker || validatorDetails?.node_id}</Name>
								<a href={Formatters.checkHttp(validatorDetails?.description?.website)}
								   target="_blank" rel="noreferrer"
								   title={`${validatorDetails?.moniker} Website`}>
									{validatorDetails?.description?.website}
								</a>
							</Identity>
						</NodeHead>

						<hr />

						<Facts>
							{validatorDetails?.commission?.commission_rates?.rate && (
							<Fact>
								<Number>{Formatters.readableNumber(validatorDetails?.commission?.commission_rates?.rate * 100)}%</Number>
								<Description>
									Commission Initial Rate<br />
									(Comission Rate %)
								</Description>
							</Fact>
							)}
							{validatorDetails?.commission?.commission_rates?.max_rate && (
							<Fact>
								<Number>{Formatters.readableNumber(validatorDetails?.commission?.commission_rates?.max_rate * 100)}%</Number>
								<Description>
									Commission Max Rate<br />
									(Comission Rate %)
								</Description>
							</Fact>
							)}
							{validatorDetails?.commission?.commission_rates?.max_change_rate && (
							<Fact>
								<Number>{Formatters.readableNumber(validatorDetails?.commission?.commission_rates?.max_change_rate * 100)}%</Number>
								<Description>
									Commission Max Change Rate<br />
									(Rate per day)
								</Description>
							</Fact>
							)}
						</Facts>

						<hr />

						<Details>
							{validatorDetails?.description?.security_contact && (
							<Detail>
								<Label>Security Contact:</Label>
								<a href={`mailto:${validatorDetails?.description?.security_contact}`}
								   title={`Send email to ${validatorDetails?.moniker}`}>
									{validatorDetails?.description?.security_contact}
								</a>
							</Detail>
							)}
							{validatorDetails?.node_id && (
							<Detail>
								<Label>Node Identity:</Label>
								{validatorDetails?.node_id}
							</Detail>
							)}
							{validatorDetails?.description?.identity && (
							<Detail>
								<Label>Identity:</Label>
								{validatorDetails?.description?.identity}
							</Detail>
							)}
							{validatorDetails?.min_self_delegation && (
							<Detail>
								<Label>Min Self Delegation:</Label>
								{validatorDetails?.min_self_delegation} TIA
							</Detail>
							)}
							{validatorDetails?.uptime && (
							<Detail>
								<Label>Uptime Score:</Label>
								<ProgressWrapper>
									<ProgressInner progress={(validatorDetails?.uptime)}>
										<span>{Formatters.readableNumber(validatorDetails?.uptime)} %</span>
									</ProgressInner>
									<ProgressBar progress={validatorDetails?.uptime} startColor="#91F5E6" endColor="#610DFC" />
								</ProgressWrapper>
							</Detail>
							)}
						</Details>

						<hr />

						{validatorDetails?.description?.details && (
						<>
						<Details>
							<Detail>
								<Label>Validator Description:</Label>
								<IntroText>
									{validatorDetails?.description?.details}
								</IntroText>
							</Detail>
						</Details>

						<hr />
						</>
						)}


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
	text-align: center;
	margin: 2rem 0 6.8rem;
	
	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		text-align: left;
		display: flex;
		align-items: center;
		justify-content: left;
	}
`

const Identity = styled.div`
	margin: 2rem 0 0;
	
	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		margin: 0 0 0 4.3rem;	
	}
`

const Name = styled.span`
	display: block;
	font-weight: 300;
	font-size: 3rem;
	word-break: break-word;
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
	margin: 1.5rem 0;
	
	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		display: flex;
		margin: 1rem 0;
	}
`

const Label = styled.span`
	display: block;
	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		display: inline-block;
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
	padding: 0 0 2rem;

	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		padding: 0 3rem 2rem 5rem;
	}
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
	font-size: 2rem;
	line-height: 3rem;
	border-bottom: 0.2rem solid;
	vertical-align: top;


	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		font-size: 2.4rem;
	}
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
	max-width: 100%;
	height: 100%;
	text-align: right;

	span {
		color: ${({ progress }) => (parseInt(progress) > 30) ? 'white' : 'black'};
		display: inline-block;
		min-width: 5rem;
		max-width: 100%;
		max-height: 100%;
		line-height: 2.6rem;
		overflow: visible;
		padding-right: 1rem;
		padding-left: ${({ progress }) => (parseInt(progress) > 30) ? '0' : '115%'};
		white-space: nowrap;
		vertical-align: top;
	}
`

const FlexWrap = styled.div`
	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		width: 100%;
		display: flex;
		justify-content: space-between;
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
	margin: -0.1rem 2rem 1rem -3.4rem;
	
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

	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		margin-right: 0;
		margin-left: 0;
	}
`