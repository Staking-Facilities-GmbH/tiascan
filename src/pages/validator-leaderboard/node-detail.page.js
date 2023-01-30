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

const NodeDetailPage = ({nodeType, identity}) => {
	const [, navigate] = useLocation()
	const [nodeDetails, setNodeDetails] = useState({})
	const [info, setInfo] = useState({})
	const nodeId = identity || false
	const pageConf = {
		title: 'Node Details',
		icon: 'node-icon.svg'
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
							<Identikon identity={nodeId} size="50" />
							<Identity>
								<Name>{nodeId}</Name>
							</Identity>
						</NodeHead>

						<hr />

						<Details>
							<Detail>
								<Label>Head</Label>
								{Formatters.readableNumber(nodeDetails.head)}
							</Detail>
							<Detail>
								<Label>PayForData Count</Label>
								{Formatters.readableNumber(nodeDetails.pfd_count)}
							</Detail>
							<Detail>
								<Label>Last PayForData</Label>
								{Formatters.timeSince(nodeDetails.last_pfd_timestamp)}
							</Detail>
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
	font-size: 2.4rem;
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
	border-bottom: 1px solid;
	vertical-align: top;
`