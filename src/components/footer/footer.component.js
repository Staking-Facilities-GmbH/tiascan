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
`

const Nav = styled.nav``

const NavList = styled.ul`
	width: 100%;
	padding: 0.75rem;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 1rem 4rem;
`

const NavItem = styled.li`
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