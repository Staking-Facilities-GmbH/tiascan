// Utils
import styled from 'styled-components'

// Components
import TitleBox from '../../components/content/title-box.component';
import Image from '../../components/image/image.component';

const AboutPage = () => {

	const title = 'About'

	return (
			<>
				<TitleBox title={title} icon={'smiley-icon.svg'}/>
				<Section className="contentSection">
					<Container>
						<Content>
							<Headline>Staking Facilities GmbH</Headline>
							<hr />
							<Paragraph>
								Staking Facilities is a Munich-based, Web 3.0 infrastructure, and service provider. They run industry-grade, highly secure physical infrastructure co-located in certified data centers within reach of their company headquarters. Guaranteed uptime, biometric security, and redundant power supply reinforce a continuous and secure operation of their nodes. Through state-of-the-art monitoring, Staking Facilities always knows about the status of their servers and they are alerted immediately if any abnormalities occur. For their customers, they offer non-custodial staking services, personal support, and tools for a variety of thoroughly vetted public Proof-of-Stake blockchains.
							</Paragraph>
							<Paragraph>
								Staking Facilities supported Celestia ever since the beginning as participant in the early testnet phases and also the incentivized testnet as validator and bridge node operators.
							</Paragraph>
							<Paragraph>
								Our goal is to not only contribute to our ecosystem as an infrastructure provider but also enrich the space with useful tooling, such as tiascan.com or solanabeach.io. Furthermore our team members serve in verious positions as foundation members, councillors and many more.
							</Paragraph>
							<Flex>
								<Image
									src="/assets/stakingfacilities-logo.png"
									alt="Staking Facilities"
									style={{maxWidth: '27rem'}}
								/>
								<LinkBox>
									<a href={'mailto:info@stakingfacilities.com'} title={'Send us a mail'}>
										<figure>
											<Image
												src={`/assets/icons/mail-icon.svg`}
												alt=""
												width={34}
												height={34}
											/>
										</figure>
										<LinkText>Contact us</LinkText>
									</a>
								</LinkBox>
							</Flex>
						</Content>
					</Container>
				</Section>
			</>
	)
}

export default AboutPage

const Section = styled.section``

const Container = styled.div`
	max-width: ${({ theme }) => theme.const.contentWidth};
	margin: 0 auto;
`

const Content = styled.div`
	overflow-x: auto;
	padding-bottom: 2rem;
`

const Headline = styled.h2`
	font-size: 2.4rem;
	line-height: 2.6rem;
	font-weight: normal;
`

const Paragraph = styled.p`
	padding-top: 3rem;
`

const Flex = styled.div`
	margin-top: 15rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
`

const LinkBox = styled.div`
	display: inline-block;
	background-color: ${({ theme }) => theme.colors.contentBg};
	border-radius: ${({ theme }) => theme.border.mediumRadius};
	padding: 0.8rem 2.8rem 0.5rem;
	margin-top: 2rem;

	@media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		margin-top: 0;
	}
	
	a {
		display: inline-block;
		color: ${({ theme }) => theme.colors.fontColor};
	}
	
	figure {
	display: inline-block;
	padding-right: 2rem;
}
`

const LinkText = styled.span`
	font-size: 2.4rem;
	line-height: 3.2rem;
	border-bottom: 1px solid;
	vertical-align: top;
`