// Utils
import styled, { css } from 'styled-components'

const HamMenuButton = ({ isOpen, onClick, ...props }) => {
	return (
		<ToggleButton onClick={onClick} isOpen={isOpen} {...props}>
			<div />
			<div />
			<div />
		</ToggleButton>
	)
}

export default HamMenuButton

export const ToggleButton = styled.button`
	outline: none;
	z-index: 101;
	cursor: pointer;
	transition: all 0.5s ease-out;
	background-color: transparent;
	border: none;
	width: 3.5rem;
	height: 2.5rem;
	position: relative;

	&:focus {
		outline: none;
	}

	div {
		position: absolute;
		width: 3.5rem;
		height: 2.5px;
		background-color: ${({ theme, isOpen }) =>
			!isOpen ? theme.hamMenu.color : theme.hamMenu.color};
		transition: all 0.3s ease-in-out;
		${(props) =>
			props.isOpen
				? css`
						&:nth-child(1) {
							top: 1rem;
							transform: rotate(45deg);
						}
						&:nth-child(2) {
							opacity: 0;
						}
						&:nth-child(3) {
							bottom: 1.3rem;
							transform: rotate(-45deg);
						}
				  `
				: css`
						&:nth-child(1) {
							top: 0;
						}
						&:nth-child(2) {
							top: 50%;
							transform: translateY(-50%);
						}
						&:nth-child(3) {
							bottom: 0;
						}
				  `}
	}
`
