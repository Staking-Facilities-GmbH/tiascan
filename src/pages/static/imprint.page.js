// Utils
import styled from 'styled-components'

// Components
import TitleBox from '../../components/content/title-box.component';

const ImprintPage = () => {

	const title = 'Imprint'

	return (
			<>
				<TitleBox title={title} icon={'book-icon.svg'}/>
				<Section className="contentSection">
					<Container>
						<Content>
							<hr />
							<ParagraphTitle>
								Responsible in accordance with section 51 TMG
							</ParagraphTitle>
							<ParagraphTitle>
								Staking Facilities Services GmbH & Co. KG
							</ParagraphTitle>
							<Paragraph>
								Rosenheimer Str. 18<br />
								85653 Aying<br />
								Germany
							</Paragraph>
							<ParagraphTitle>
								Represented by Managing Directors
							</ParagraphTitle>
							<Paragraph>
								Wolfgang Albrecht
							</Paragraph>
							<ParagraphTitle>
								Contact
							</ParagraphTitle>
							<Paragraph>
								info [at] stakingfacilities.com
							</Paragraph>
							<ParagraphTitle>
								Register
							</ParagraphTitle>
							<Paragraph>
								Entry in the commercial register<br />
								Register court: Amtsgericht Munich<br />
								Register number: HRB 116001<br />
							</Paragraph>
							<Paragraph>
								© 2023 All rights reserved. Reprint by permission only. All information is subject to change.
							</Paragraph>
						</Content>
					</Container>
				</Section>
			</>
	)
}

export default ImprintPage

const Section = styled.section``

const Container = styled.div`
	max-width: ${({ theme }) => theme.const.contentWidth};
	margin: 0 auto;
`

const Content = styled.div`
	overflow-x: auto;
	padding-bottom: 2rem;
`

const ParagraphTitle = styled.p`
	font-weight: bold;
	padding: 3rem 0 0.5rem;
`

const Paragraph = styled.p``
