// Utils
import styled from "styled-components"

// Components
import Header from "../../components/header/header.component"
import Image from "../../components/image/image.component"
import Footer from "../../components/footer/footer.component"

const PageLayout = ({ children }) => {
	return (
		<>
			<Header />
			<Main>{children}</Main>
			<BackgroundFigure>
				<Image
					src="/assets/bg-validators.png"
					alt="background"
					width={"100%"}
					height={"100%"}
				/>
			</BackgroundFigure>
			<Footer />
		</>
	)
}

export default PageLayout

const Main = styled.main``

const BackgroundFigure = styled.figure`
	position: absolute;
	line-height: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
	mix-blend-mode: multiply;
`
