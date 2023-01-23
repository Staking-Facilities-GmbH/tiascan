// Utils
import styled from 'styled-components'

// Components
import GlossaryItem from '../../components/content/glossary-item.component'
import TitleBox from '../../components/content/title-box.component';

// Hooks
import { useState } from 'react'

// Data
import data from '../../data/glossary.json'

const GlossaryPage = () => {
	const [
		glossaryData,
	] = useState(data)

	const title = 'Glossary'

	return (
			<>
				<TitleBox title={title} icon={'book-icon.svg'}/>
				<Section className="contentSection">
					<Container>
						<LettersContainer>
							<LetterAnchors>
								{glossaryData.map((row, idx) => (
									<span title={`Jump to ${row.letter}`}
										  key={`letterAnchor-${idx}`}
										  onClick={() => {
											  document.getElementById("letter-"+row.letter).scrollIntoView();
										  }}>{row.letter}</span>
								))}
							</LetterAnchors>
						</LettersContainer>

						<Content>
							{glossaryData.map((row, idx) => (
								<LetterSection id={`letter-${row.letter}`} key={idx}>
									<Letter>{row.letter}</Letter>
									{row.entries.map((col, idx) => (
										<GlossaryItem key={row.letter + idx} title={col.title} content={col.content} />
									))}
								</LetterSection>
							))}
						</Content>
					</Container>
				</Section>
			</>
	)
}

export default GlossaryPage

const Section = styled.section``

const Container = styled.div`
	max-width: ${({ theme }) => theme.const.contentWidth};
	margin: 0 auto;
`

const Content = styled.div`
	overflow-x: auto;
	padding-bottom: 2rem;
`

const LetterSection = styled.div``

const Letter = styled.span`
	display: inline-block;
	font-weight: bold;
	font-size: 3.2rem;
`

const LettersContainer = styled.div`
	display: flex;
	justify-content: right;
	margin-bottom: 10rem;
`

const LetterAnchors = styled.div`
	display: inline-block;
	background-color: ${({ theme }) => theme.colors.contentBgHighlight};
	border-radius: ${({ theme }) => theme.border.smallRadius};
	max-width: 100%;
	
	span {
		display: inline-block;
		cursor: pointer;
		font-size: 1.8rem;
		padding: 1.1rem 2rem;
	}
`

