// Utils
import styled from 'styled-components'

// Components
import TitleBox from '../../components/content/title-box.component';

const PrivacyPage = () => {

	const title = 'Privacy Policy'

	return (
			<>
				<TitleBox title={title} icon={'book-icon.svg'}/>
				<Section className="contentSection">
					<Container>
						<Content>
							<hr />
							<Paragraph>
								This Privacy Policy explains the processing of your personal data by Staking Facilities Services GmbH & Co. KG, Rosenheimer Str. 18, 85653 Aying, Germany ("we") as the controller (Art. 4 no. 7 GDPR) and your rights under the GDPR.
							</Paragraph>
							<h2><strong>1. Purposes of processing</strong></h2>
							<h3><strong>1.1 Delivery of the website</strong></h3>
							<Paragraph>
								If you access our website some personal data is temporarily stored, esp. IP address and browser meta data (e.g., date and time of access and your browser type).
							</Paragraph>
							<Paragraph>
								The temporary storage of this personal data is necessary to deliver the website to you. The legal basis for this processing of your personal data is Art. 6 (1) b) GDPR.
							</Paragraph>
							<h3><strong>1.2 Log data</strong></h3>
							<Paragraph>
								Further storage of this data takes place in log files in order to ensure the functionality of our website and, if necessary, to check and enforce our rights or property, our terms of use and the rights of third parties. The log files are stored as long as necessary for the respective purpose, usually no longer than 14 days. The legal basis is Art. 6 (1) f) GDPR.
							</Paragraph>
							<h3><strong>1.3. Other purposes for which we process your personal data</strong></h3>
							<Paragraph>
								<List>
									<li>to fulfill contracts and in the context of existing or new business relationships. We will retain this personal data at least for the duration of our business relationship. The legal basis is Art. 6 (1) b) GDPR</li>
									<li>to meet our legitimate interests (Art. 6 (1) f) GDPR), including the following:</li>
									<List>
										<li>Enter into corporate transactions (e.g., restructuring, asset deals, mergers)</li>
										<li>Protect our rights or property, enforce our terms of use and legal notices, and provide for the establishment, exercise, and defense of legal claim</li>
									</List>
									<li>to fulfill our legal obligations, court orders or other binding decisions. The legal basis is Art. 6 (1) c) GDPR.</li>
									<li>with your consent (Art. 6 (1) a) GDPR) for other purposes, such as subscription to a newsletter; in this case, you have the option to revoke your consent at any time.</li>
								</List>
							</Paragraph>
							<h2><strong>2. Recipients of personal data</strong></h2>
							<Paragraph>
								In addition to the recipients of personal mentioned above, we also use other companies to process personal data on our behalf, for example for hosting of our website or sending newsletters. Such processors only process the data on our behalf (Art. 28 GDPR).
							</Paragraph>
							<Paragraph>
								Furthermore, we transmit personal data to third parties if this is required by law, necessary for the exercise and defense of legal claims or if third parties provide certain services for us (e.g., lawyers, tax consultants).
							</Paragraph>
							<Paragraph>
								Insofar as we transfer personal data to third countries outside the EU, we ensure an appropriate level of data protection through contractual measures where the level of protection has not been found adequate by the EU commission. You have the right to receive copies of these contracts.
							</Paragraph>
							<h2><strong>3. Regular deletion of personal data</strong></h2>
							<Paragraph>
								Unless a specific duration of data storage is specified in this Privacy Policy, we will only process your data as long as this is necessary for the respective purposes or as long as there are legal retention obligations. After the respective processing purpose ceases to apply and retention obligations end, your data will be routinely deleted.
							</Paragraph>
							<h2><strong>4. Your rights</strong></h2>
							<Paragraph>
								You can request access to the personal data stored by us. If you have provided personal data on the basis of a contract or consent, you have the right to receive this personal data in a standard and machine-readable format.
							</Paragraph>
							<Paragraph>
								You can also request the deletion, correction or restriction of the processing of your personal data subject to the conditions and limitations set out in the GDPR.
							</Paragraph>
							<Paragraph>
								You can revoke your consent at any time without affecting the lawfulness of processing based on your consent before its withdrawal.
							</Paragraph>
							<Paragraph>
								<strong>You can object to the processing of data processed on the basis of our legitimate interests at any time subject to the conditions and limitations set out in the GDPR.</strong>
							</Paragraph>
							<h2><strong>5. Contact; complaint to supervisory authority</strong></h2>
							<Paragraph>
								Please address your questions or concerns regarding the processing of your personal data to:
							</Paragraph>
							<Paragraph>
								Staking Facilities Services GmbH & Co. KG<br/>
								Rosenheimer Str. 18<br/>
								85653 Aying<br/>
								Germany
							</Paragraph>
							<Paragraph>
								<a href="mailto:info@stakingfacilities.com" title="Contact Us">info@stakingfacilities.com</a>
							</Paragraph>
						</Content>
					</Container>
				</Section>
			</>
	)
}

export default PrivacyPage

const Section = styled.section``

const Container = styled.div`
	max-width: ${({ theme }) => theme.const.contentWidth};
	margin: 0 auto;
`

const Content = styled.div`
	overflow-x: auto;
	padding-bottom: 2rem;
	
	h2,h3 {
		padding-top: 3rem;
	}
`

const Paragraph = styled.p`
	padding: 1rem 0;
`

const List = styled.ul`
	list-style: disc;
	padding: 1rem 0 1rem 2rem;
	
	ul {
		list-style-type: '- ';
	}
`