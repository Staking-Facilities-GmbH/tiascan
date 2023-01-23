// utils
import { motion } from 'framer-motion'
import styled from 'styled-components'


const FlexContainer = ({ children, ...props }) => {
	return <Container {...props}>{children}</Container>
}

const Container = styled(motion.div)`
	display: flex;
	flex-wrap: ${({ wrap }) => (wrap ? wrap : "wrap")};
	justify-content: ${({ justifyContent }) =>
		justifyContent ? justifyContent : "space-between"};
	align-items: ${({ alignItems }) => (alignItems ? alignItems : "unset")};
	flex-direction: ${({ flexDirection }) =>
		flexDirection ? flexDirection : "unset"};
	--gap: ${({ gap }) => (gap ? gap : "1rem")};
	gap: var(--gap);
	width: ${({ width }) => (width ? width : "initial")};
	height: ${({ height }) => (height ? height : "initial")};
	margin-top: ${({ top }) => (top ? top : "initial")};
	margin-right: ${({ right }) => (right ? right : "initial")};
	margin-left: ${({ left }) => (left ? left : "initial")};
	margin-bottom: ${({ bottom }) => (bottom ? bottom : "initial")};
`

export default FlexContainer
