// Utils
import styled from 'styled-components'
import Formatters from "../../formatter/formatters";

// Components
import FlexContainer from '../../components/flex-container/flex-container.component'
import Image from '../../components/image/image.component'
import Identikon from '../../components/content/identikon.component'
import BlockNumberRow from '../../components/content/block-number-row.component'

// Hooks
import { useEffect, useState } from 'react'

// Styles
import '../../styles/pagination.css'

// Data
import CelestiaApi from '../../api/celestia-api'

// Conf
import {useLocation} from "wouter";
import ProgressBar from "../../components/content/progress-bar.component";

const NodeDetailPage = ({nodeType, identity}) => {
	const [, navigate] = useLocation()
	const [nodeDetails, setNodeDetails] = useState({})
	const [info, setInfo] = useState({})
	const nodeId = identity || false
	const pageConf = {
		title: 'Node Details',
		icon: 'node-icon.svg'
	}

	switch (nodeType) {
		case 'bridge':
			pageConf.title = 'Bridge Node Details'
			break
		case 'full':
			pageConf.title = 'Full Node Details'
			break
		case 'light':
			pageConf.title = 'Light Node Details'
			break
		default:
			pageConf.title = 'Node Details'
	}
	
	// go back to list if no validator ID given
	if (!nodeId) navigate(`/${nodeType}-nodes`, { replace: true })

	useEffect( ()=>{
		async function triggerFetchInfo() {
			return await CelestiaApi.fetchInfo()
		}

		triggerFetchInfo().then((data) => {
			setInfo(data)
		})
		async function triggerFetchNodeDetails() {
			return await CelestiaApi.fetchNodeDetails(nodeId)
		}

		triggerFetchNodeDetails().then((data) => {
			//handle not found - back to list?
			if (!data.node_id) navigate(`/${nodeType}-nodes`, { replace: true })
			setNodeDetails(data)
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
							<CTA title="Go back to the list" onClick={() => { navigate(`/${nodeType}-nodes`) }}>
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
							<Identikon identity={nodeId} size="50" />
							<Identity>
								<Name>{nodeId}</Name>
							</Identity>
						</NodeHead>

						<hr />

						<Details>
							{nodeDetails.head && (
							<Detail>
								<Label>Head:</Label>
								{Formatters.readableNumber(nodeDetails.head)}
							</Detail>
							)}
							{(nodeType === 'bridge' && nodeDetails.total_synced_headers) && (
							<Detail>
								<Label>Total Synced Headers:</Label>
								{Formatters.readableNumber(nodeDetails.total_synced_headers)}
							</Detail>
							)}
							{(nodeType !== 'bridge' && nodeDetails.das_total_sampled_headers) && (
							<Detail>
								<Label>Total Sampled Headers (DAS):</Label>
								{Formatters.readableNumber(nodeDetails.das_total_sampled_headers)}
							</Detail>
							)}
							{nodeDetails.start_time && (
							<Detail>
								<Label>Node Start Time:</Label>
								{ nodeDetails.start_time.charAt(0) === '2' ? new Date(nodeDetails.start_time).toLocaleString() : 'N/A'}
							</Detail>
							)}
							{nodeDetails.pfb_count !== undefined && (
							<Detail>
								<Label>PayForBlob Count:</Label>
								{Formatters.readableNumber(nodeDetails.pfb_count+1)}
							</Detail>
							)}
							{nodeDetails.last_pfb_timestamp && (
							<Detail>
								<Label>Last PayForBlob:</Label>
								{Formatters.timeSince(nodeDetails.last_pfb_timestamp)}
							</Detail>
							)}
							{nodeDetails.das_latest_sampled_timestamp && (
							<Detail>
								<Label>Last Sampled Time:</Label>
								{Formatters.timeSince(nodeDetails.das_latest_sampled_timestamp)}
							</Detail>
							)}
							{nodeDetails.last_restart_time && (
							<Detail>
								<Label>Last Restart Time:</Label>
								{Formatters.timeSince(nodeDetails.last_restart_time)}
							</Detail>
							)}
							{(nodeDetails.node_runtime_counter_in_seconds || nodeDetails.last_accumulative_node_runtime_counter_in_seconds) && (
							<Detail>
								<Label>Node Uptime:</Label>
								{Formatters.readableNumber(nodeDetails.node_runtime_counter_in_seconds + nodeDetails.last_accumulative_node_runtime_counter_in_seconds) + ' seconds'}
							</Detail>
							)}
							{!nodeDetails?.jailed && nodeDetails?.uptime && (
							<Detail>
								<Label>Uptime Score:</Label>
								<ProgressWrapper>
									<ProgressInner progress={(nodeDetails?.uptime)}>
										<span>{Formatters.readableNumber(nodeDetails?.uptime)} %</span>
									</ProgressInner>
									<ProgressBar progress={nodeDetails?.uptime} startColor="#91F5E6" endColor="#610DFC" />
								</ProgressWrapper>
							</Detail>
							)}
							{nodeDetails?.jailed && (
								<Detail>
									<Label><strong>Jailed:</strong></Label>
									{nodeDetails?.jailed ? '<strong>Yes</strong>' : 'No'}
								</Detail>
							)}
						</Details>

						<hr />
					</Content>
				</Container>
			</Section>
		</>
	)
}

export default NodeDetailPage

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
	margin-left: 2rem;
`

const Name = styled.span`
	display: block;
	font-weight: 300;
	font-size: 1.6rem;
	word-break: break-word;

	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		display: flex;
		margin: 1rem 0;
		font-size: 2.4rem;
	}
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