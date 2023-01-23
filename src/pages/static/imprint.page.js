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
								Staking Facilities GmbH
							</ParagraphTitle>
							<Paragraph>
								Claudius-Keller-Straße 3b<br />
								81669 Munich<br />
								Germany
							</Paragraph>
							<ParagraphTitle>
								Represented by Managing Directors
							</ParagraphTitle>
							<Paragraph>
								Wolfgang Albrecht, Julius Schmidt
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
								Register number: HRB 232811<br />
								VAT identification number in accordance with section 27a of the German VAT act: DE 313007966<br /><br />
								© 2021 All rights reserved. Reprint by permission only. All information is subject to change.
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
