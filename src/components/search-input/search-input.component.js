// Utils
import React from 'react'
import styled, { css } from 'styled-components'

const SearchInput = ({
	name,
	onClick,
	...rest
}) => {


	return (
		<InputContainer className="input">
			<InputGroup>
				<input
					{...rest}
					className="form-input"
					type={"text"}
					onChange={(e) => {
						e.preventDefault()
						e.stopPropagation()
						onClick && onClick(e.target.value)
					}}/>
				<figure>
					<input
						type="image"
						name="submit"
						src="/assets/icons/magnifier-icon.svg"
						alt="search icon"
						width={16}
						height={16}
					/>
				</figure>
			</InputGroup>
		</InputContainer>
	)
}

export default SearchInput

const InputContainer = styled.div`
	p {
		margin-left: 1.5rem;
	}
`

const shrinkLabel = css`
	left: 1.5rem;
	top: -18px;
	font-size: 12px;
	color: ${({ theme }) => theme.colors.fontColor};
`
const InputGroup = styled.div`
	width: 100%;
	position: relative;

	.form-input {
		background-color: ${({ theme }) => theme.colors.background};
		color: ${({ theme }) => theme.colors.fontColor};
		font-size: 1.8rem;
		padding: 1rem 4rem 1rem 3rem;
		display: block;
		width: 100%;
		border: 0.1rem solid transparent;
		border-radius: ${({ theme }) => theme.border.mediumRadius};
		font-family: inherit;
		transition: 1.5s ease-in-out;
		
		&:focus {
			outline: none;
			box-shadow: ${({ theme }) => theme.shadows.ctaShadow};
			border-color: ${({ theme }) => theme.colors.ctaColor};
		}
		&:hover {		
			box-shadow: ${({ theme }) => theme.shadows.ctaShadow};
			border-color: ${({ theme }) => theme.colors.ctaColor};
		}
		&:focus ~ .form-input-label {
			${shrinkLabel}
		}
	}
	
	.form-input-label {
		color: ${({ theme }) => theme.colors.fontColor};
		font-size: 1.8rem;
		font-weight: normal;
		position: absolute;
		pointer-events: none;
		left: 1.5rem;
		top: 1.35rem;
		transition: 300ms ease all;
		&.shrink {
			${shrinkLabel}
		}
	}

	figure {
		cursor: pointer;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 2rem;
		top: 50%;
		transform: translateY(-50%);
		font-size: 2.5rem;
	}
`
