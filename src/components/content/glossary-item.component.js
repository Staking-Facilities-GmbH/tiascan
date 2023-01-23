// Utils
import React, { useState } from 'react'
import styled from 'styled-components'
import Image from '../image/image.component'
import ReactHtmlParser from 'react-html-parser'


const GlossaryItem = ({ title, content }) => {
	const [isActive, setIsActive] = useState(false)


	return (
		<GlossaryItm>
			<GlossaryTitle onClick={() => setIsActive(!isActive)}>
				{title}
				<figure>
					<Image
						src="/assets/icons/caret-icon.svg"
						alt="⌄"
						width={16}
						height={16}
						style={{transform: `rotate(${isActive ? '0':'180'}deg)`}}
					/>
				</figure>
			</GlossaryTitle>
			{isActive &&
				<GlossaryContent>
					{ReactHtmlParser(content)}
				</GlossaryContent>
			}
		</GlossaryItm>
	)
}

export default GlossaryItem


const GlossaryItm = styled.div`
	margin: 4rem 0;
`

const GlossaryTitle = styled.div`
	cursor: pointer;
	border-bottom: ${({ theme }) => theme.glossary.titleBorder};
	font-size: 2.4rem;
	
	figure {
		display: inline;
		padding-left: 1rem;
	}
`

const GlossaryContent = styled.div`
	padding-top: 2rem;
`