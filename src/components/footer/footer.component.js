// Utils
import styled from 'styled-components'
import {Link} from 'wouter';
import { useLocation } from 'wouter'


// Components

const Footer = () => {
	const navItems = [
		{
			name: 'About',
			slug: '/about',
		},
		{
			name: 'Imprint',
			slug: '/imprint',
		},
		{
			name: 'Privacy',
			slug: '/privacy',
		},
		{
			name: 'Glossary',
			slug: '/glossary',
		},
	]

	const location = useLocation()

	return <FooterContainer>
		<FooterContent>
			<Nav>
				<NavList>
					<NavItem>
						<a href="https://celestia.org/" target="_blank" rel="noreferrer" title="Celestia">Celestia</a>
					</NavItem>
					{navItems.map((item, index) => (
						<NavItem key={index}>
							<NavLink
								to={item.slug}
								className={location[0].includes(item.slug) ? 'active' : ''}>
								{item.name}
							</NavLink>
						</NavItem>
					))}
				</NavList>
			</Nav>
			<Copy>Made with ❤ by Staking Facilities</Copy>
		</FooterContent>
	</FooterContainer>
}

export default Footer

const FooterContainer = styled.footer`
	width: 100%;
	background-color: ${({ theme }) => theme.footer.backgroundColor};

	@media all and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
		position: fixed;
		bottom: 0;
		z-index: 100;
	}
`

const FooterContent = styled.div`
	max-width: ${({ theme }) => theme.const.pageWidth};	
	margin: 0 auto;

	@media all and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
		display: flex;
		justify-content: space-between;
	}
`

const Nav = styled.nav``

const NavList = styled.ul`
	padding: 0;
	margin: 0;	
	display: block;
	overflow: hidden;

	@media all and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
		width: auto;
	}
`

const NavItem = styled.li`
	margin: 1rem 1.7rem;
	float: left;
	
	a {
		cursor: pointer;
		color: ${({ theme }) => theme.footer.color};
		font-size: 1.8rem;
		transition: 0.1s linear;

		&.active {
			border-bottom: 0.2rem solid;
		}

		&:hover {
			border-bottom: 0.2rem solid;
		}
	}
`

const NavLink = styled(Link)`
`

const Copy = styled.span`
	color: ${({ theme }) => theme.footer.color};
	font-size: 1.8rem;
	text-align: left;
	display: inline-block;
	margin: 1rem 1.7rem;

	@media all and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
		text-align: right;
	}
`