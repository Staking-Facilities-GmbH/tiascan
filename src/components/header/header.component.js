// Utils
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import { Link } from 'wouter'
import Image from '../image/image.component'
import HamMenuButton from '../ham-menu-button/ham-menu-button.component'

// Hooks
import { useBoolean } from 'usehooks-ts'
import { useLocation } from 'wouter'
import {useEffect, useState} from "react";
import CelestiaApi from "../../api/celestia-api";

// Icons

const Header = () => {
	const location = useLocation()
	const { value: showMenu, toggle } = useBoolean(false)
	const [info, setInfo] = useState()
	const navItems = [
		{
			name: 'Validators',
			slug: '/validators',
		},
		{
			name: 'Bridge Nodes',
			slug: '/bridge-nodes',
		},
		{
			name: 'Full Storage Nodes',
			slug: '/full-storage',
		},
		{
			name: 'Light Nodes',
			slug: '/light-nodes',
		},
	]

	useEffect( ()=>{
		async function triggerFetchInfo() {
			return await CelestiaApi.fetchInfo()
		}
		triggerFetchInfo().then((data) => {
			setInfo(data)
		})
	},[])

	const onNavItemClick = () => {
		toggle()
	}

	return (
		<>
			<TopBar>
				<TopBarContent>
					Network: {info?.network}
				</TopBarContent>
			</TopBar>
			<HeaderContainer>
				<Link to="/">
					<LogoFigure>
						<Image
							src="/assets/tiascan-logo.png"
							alt="Celestia Logo"
							width={"100%"}
							effect="blur"
						/>
					</LogoFigure>
				</Link>

				<Nav>
					<NavList>
						{navItems.map((item, index) => (
							<NavItem key={index}>
								<NavLink
									to={item.slug}
									className={location[0].includes(item.slug) ? 'active' : ''}
								>
									{item.name}
								</NavLink>
							</NavItem>
						))}
					</NavList>
				</Nav>


				<AnimatePresence>
					{showMenu && (
						<MobileNav
							initial={{ opacity: 0, y: -100 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -100 }}
							transition={{ duration: 0.3 }}
						>
							<MobileNavList>
								{navItems.map((item, index) => (
									<MobileNavItem key={index}>
										<MobileNavLink
											onClick={onNavItemClick}
											to={item.slug}
										>
											{item.name}
										</MobileNavLink>
									</MobileNavItem>
								))}
							</MobileNavList>
						</MobileNav>
					)}
				</AnimatePresence>

				<HamMenuButton className="ham" isOpen={showMenu} onClick={toggle} />
			</HeaderContainer>
		</>
	)
}

export default Header

const HeaderContainer = styled.header`
	padding: 2rem;
	/* position: fixed; */

	top: 0;
	left: 0;
	right: 0;
	/* height: 6.4rem; */
	z-index: 100;

	display: flex;
	align-items: center;
	justify-content: space-between;
	max-width: ${({ theme }) => theme.const.pageWidth};
	margin: 0 auto;

	.ham {
		@media all and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
			@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
				display: none;
				visibility: hidden;
			}
		}
	}
`

const LogoFigure = styled.figure`
	cursor: pointer;
	width: 20rem;
`

const Nav = styled.nav`
	display: none;
	visibility: hidden;

	@media all and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
		@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
			display: block;
			visibility: visible;
		}
	}
`

const NavList = styled.ul`
	display: flex;
	align-items: center;
	gap: 2.8rem;
`

const NavItem = styled.li``


const NavLink = styled(Link)`
	cursor: pointer;
	color: ${({ theme }) => theme.header.navItemColor};
	font-size: 1.8rem;
	transition: 0.1s linear;

	&.active {
		border-bottom: 0.2rem solid;
	}
	
	&:hover {
		border-bottom: 0.2rem solid;
	}
`

const MobileNav = styled(motion.nav)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: ${({ theme }) => theme.header.mobileNavBgColor};
	z-index: 99;
	display: flex;
	align-items: center;
	justify-content: center;

	@media all and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
		@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
			display: none;
			visibility: hidden;
		}
	}
`

const MobileNavList = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2.8rem;
`

const MobileNavItem = styled.li``
const MobileNavLink = styled(Link)`
	cursor: pointer;
	color: ${({ theme }) => theme.header.navItemColor};
	font-size: 2.4rem;

	&:hover {
		color: ${({ hoverColor }) => hoverColor};
		border-bottom: 0.2rem solid ${({ hoverColor }) => hoverColor};
	}
`

const TopBar = styled.div`
	height: 4.2rem;
	background-color: ${({ theme }) => theme.footer.backgroundColor};
	text-align: right;
`

const TopBarContent = styled.div`
	color: ${({ theme }) => theme.footer.color};
	font-size: 1.8rem;
	line-height: 4.2rem;
	max-width: ${({ theme }) => theme.const.pageWidth};	
	margin: 0 auto;
	padding: 0 2rem;
`
