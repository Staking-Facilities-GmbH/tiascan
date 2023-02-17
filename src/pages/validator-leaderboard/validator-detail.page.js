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
							<Identikon identity={validatorDetails?.node_id} size="100" />
							<Identity>
								<Name>{validatorDetails?.moniker}</Name>
								<a href={Formatters.checkHttp(validatorDetails?.description?.website)}
								   target="_blank" rel="noreferrer"
								   title={`${validatorDetails?.moniker} Website`}>
									{validatorDetails?.description?.website}
								</a>
							</Identity>
						</NodeHead>

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
								<Label>Node Identity</Label>
								{validatorDetails?.node_id}
							</Detail>
							<Detail>
								<Label>Identity</Label>
								{validatorDetails?.description?.identity}
							</Detail>
							<Detail>
								<Label>Uptime Score</Label>
								<ProgressWrapper>
									<ProgressInner progress={(validatorDetails?.uptime)}>
										<span>{Formatters.readableNumber(validatorDetails?.uptime)} %</span>
									</ProgressInner>
									<ProgressBar progress={validatorDetails?.uptime} startColor="#91F5E6" endColor="#610DFC" />
								</ProgressWrapper>
							</Detail>
						</Details>

						<hr />

						<Details>
							<Detail>
								<Label>Validator Description</Label>
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