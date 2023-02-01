// Utils
import styled from 'styled-components'
import Image from '../image/image.component'

const TitleBox = ({ icon, title }) => {

	return (
		<TitleElem>
			<figure>
				<Image
					src={`/assets/icons/${icon}`}
					alt=""
					width={34}
					height={34}
				/>
			</figure>
			<Title>
				{title}
			</Title>
		</TitleElem>
	)
}

export default TitleBox


const TitleElem = styled.div`
	display: inline-block;
	min-width: 47rem;
	background-color: ${({ theme }) => theme.colors.contentBg};
	border-radius: ${({ theme }) => theme.border.mediumRadius};
	padding: 0.8rem 3.4rem 0.5rem;
	margin-bottom: 3.8rem;
	
	
	figure {
		display: inline;
		padding-right: 2rem;
	}
`

const Title = styled.h1`
	display: inline;
	border-bottom: 0.2rem solid;
	font-size: 2.4rem;
	line-height: 3.2rem;
	vertical-align: top;
`