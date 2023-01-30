// Utils
import styled from 'styled-components'
import Formatters from "../../formatter/formatters"

// Components
import FlexContainer from '../../components/flex-container/flex-container.component'
import SearchInput from '../../components/search-input/search-input.component'
import Image from '../../components/image/image.component'
import Identikon from '../../components/content/identikon.component'
import NodeStats from '../../components/content/node-stats.component'
import BlockNumberRow from '../../components/content/block-number-row.component'
import ProgressBar from '../../components/content/progress-bar.component'
import MapChart from "../../components/content/map.component"
import Pagination from 'rc-pagination'

// Hooks
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useLocationProperty } from 'wouter/use-location'
import { useLocation } from "wouter";

// Styles
import '../../styles/pagination.css'

// Data
import CelestiaApi from '../../api/celestia-api'

// Conf
import apiConf from '../../config/api-config.json'
import {Link} from "wouter";

const NodesPage = ({nodeType}) => {
	const [searchValue, setSearchValue] = useState(
		useLocationProperty(() => new URLSearchParams(window.location.search).get('search')) || '')
	const [info, setInfo] = useState()
	const [nodes, setNodes] = useState({})
	const [page, setPage] = useState(1)

	let pageConf = {
		showSearch: false,
		title: 'Validator Leaderboard',
		cols: ['Identity', 'Node Identity', 'Node Uptime'],
		icon: 'node-icon.svg',
		rowGrid: 'minmax(8rem, 8rem) minmax(40rem, auto) minmax(17.7rem, 25rem)'
	}

	switch (nodeType) {
		case 'bridge':
			pageConf.title = 'Bridge Nodes'
			break
		case 'full':
			pageConf.title = 'Full Nodes'
			break
		case 'light':
			pageConf.title = 'Light Nodes'
			break
		default: //validators
			pageConf.showSearch = true
			pageConf.cols = ['Identity', 'Validator Name', 'Missed Blocks', 'Uptime Score']
			pageConf.icon = 'validator-icon.svg'
			pageConf.rowGrid = 'minmax(7rem, 10rem) minmax(35rem, auto) minmax(10rem, 15rem) minmax(17.7rem, 25rem)'
	}

	useEffect( ()=>{
		async function triggerFetchInfo() {
			return await CelestiaApi.fetchInfo()
		}

		async function triggerFetchNodes() {
			switch (nodeType) {
				case 'bridge':
					return await CelestiaApi.fetchBridgeNodes(page)
				case 'full':
					return await CelestiaApi.fetchFullNodes(page)
				case 'light':
					return await CelestiaApi.fetchLightNodes(page)
				default:
					if (searchValue) {
						return await CelestiaApi.fetchValidatorSearch(page, searchValue)
					} else {
						return await CelestiaApi.fetchValidators(page)
					}
			}
		}

		triggerFetchInfo().then((data) => {
			setInfo(data)
		})
		triggerFetchNodes().then((data) => {
			setNodes(data)
		})
	},[page, searchValue, nodeType])


	const methods = useForm({
		defaultValues: {
			search: '',
		},
	})

	const pageChange = page => {
		setPage(page)
	};

	const searchChange = (value) => {
		setSearchValue(value)
	}

	const [,navigate] = useLocation();

	return (
		<FormProvider {...methods}>
			<BlockNumberRow stats={info} />
			<Section className="contentSection">
				<Hero className="hero">
					<MapChart />
					<NodeStats stats={info} active={nodeType} />
				</Hero>
			</Section>

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

						{pageConf.showSearch &&
							<Form onSubmit={(e) => {
								e.preventDefault()
								navigate(`?search=${searchValue}`, { replace: true })
							}}>
								<SearchInput
									name="search"
									id="searchBox"
									value={searchValue ?? searchValue}
									placeholder="Search for name or identity..."
									onClick={searchChange}/>
							</Form>
						}
					</FlexContainer>

					<Content>
						<Row pageConf={pageConf}>
							{pageConf.cols.map((col, index) => (
								<ColHead key={index}>
									<ColSpan className="head">{col}</ColSpan>
								</ColHead>
							))}
						</Row>
						{nodes.rows?.map((row, index) => (
							<Row pageConf={pageConf} key={index}>
							{(nodeType === 'validator') &&
							<>
								<Col>
									<Identikon identity={row.opr_addr} />
								</Col>

								<Col>
									<ColSpan>
										<Link to={`/validator/${row.opr_addr}`}
											title={`Check details of ${row.moniker}`}>
											{row.moniker}
										</Link>
									</ColSpan>
								</Col>

								<Col>
									<ColSpan>{Formatters.readableNumber(row.missed_blocks_counter)}</ColSpan>
								</Col>

								<Col>
									<ColSpan>
										<ProgressWrapper>
											<ProgressInner progress={(100-index)}>
												<span>{(100-index)} %</span>
											</ProgressInner>
											<ProgressBar progress={(100-index)} startColor="#91F5E6" endColor="#610DFC" />
										</ProgressWrapper>
									</ColSpan>
								</Col>
							</>
							}

							{(nodeType !== 'validator') &&
							<>
								<Col>
									<Identikon identity={row.node_id} />
								</Col>

								<Col>
									<ColSpan className="nodeId">
										<Link to={`/${nodeType}-node/${row.node_id}`}
											  title={`Check details of ${row.node_id}`}>
											{row.node_id}
										</Link>
									</ColSpan>
								</Col>

								<Col>
									<ColSpan>
										<ProgressWrapper>
											<ProgressInner progress={(100-index)}>
												<span>{(100-index)} %</span>
											</ProgressInner>
											<ProgressBar progress={(100-index)} startColor="#91F5E6" endColor="#610DFC" />
										</ProgressWrapper>
									</ColSpan>
								</Col>
							</>
							}
							</Row>
						))}
					</Content>
				</Container>
			</Section>

			<Section className="pagination">
				<Pagination
					current={page}
					defaultPageSize={apiConf.ITEMS_PER_PAGE}
					total={(nodes?.pagination?.total_pages || 1) * apiConf.ITEMS_PER_PAGE}
					onChange={pageChange}
					locale={'en_US'}
				/>
			</Section>
		</FormProvider>
	)
}

export default NodesPage

const Section = styled.section``

const Hero = styled.div``

const Container = styled.div`
	max-width: 85.2rem;
	margin: 0 auto;
`

const Form = styled.form`
	flex-grow: 1;
	width: 100%;
	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		max-width: 50rem;
		min-width: unset;

		@media all and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
		}
	}
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

const Row = styled.div`
	display: grid;
	grid-template-columns: ${({pageConf}) => pageConf.rowGrid};
	border-bottom: ${({ theme }) => theme.section.border};
	
	&:last-of-type {
		border-bottom: none;
	}
`

const ColHead = styled.div`
	font-size: 1.8rem;
	padding: 1.6rem 0.6rem;
`

const Col = styled.div`
	position: relative;
	font-size: 1.8rem;
	padding: 0 1.6rem;
`

const ColSpan = styled.span`
	display: block;
	line-height: 4.5rem;
	
	&.nodeId {
		font-size: 1.4rem;
	}

	&.head {
		line-height: 2rem;
	}
	
	a {
		color: ${({ theme }) => theme.colors.fontColor};
		
		&:hover {
			text-decoration: underline;
		}
	}
`

const ProgressWrapper = styled.div`
	position: relative;
	width: 17.7rem;
	height: 3rem;
	margin: 0.7rem 0;
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