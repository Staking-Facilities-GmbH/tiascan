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
								We are very delighted that you have shown interest in our enterprise as well as our product, Tiascan. Data protection is of a particularly high priority for the management of the Staking Facilities GmbH.
							</Paragraph>
							<Paragraph>
								The use of the Internet pages of the Staking Facilities GmbH is possible without any indication of personal data; however, if a data subject wants to use special enterprise services via our website, processing of personal data could become necessary. If the processing of personal data is necessary and there is no statutory basis for such processing, we generally obtain consent from the data subject.The processing of personal data, such as the name, address, e-mail address, or telephone number of a data subject shall always be in line with the General Data Protection Regulation (GDPR), and in accordance with the country-specific data protection regulations applicable to the Staking Facilities GmbH. By means of this data protection declaration, our enterprise would like to inform the general public of the nature, scope, and purpose of the personal data we collect, use and process. Furthermore, data subjects are informed, by means of this data protection declaration, of the rights to which they are entitled. As the controller, the Staking Facilities GmbH has implemented numerous technical and organizational measures to ensure the most complete protection of personal data processed through this website. However, Internet-based data transmissions may in principle have security gaps, so absolute protection may not be guaranteed. For this reason, every data subject is free to transfer personal data to us via alternative means, e.g. by telephone.
							</Paragraph>
							<Paragraph>
								1. Definitions
							</Paragraph>
							<Paragraph>
								The data protection declaration of the Staking Facilities GmbH is based on the terms used by the European legislator for the adoption of the General Data Protection Regulation (GDPR). Our data protection declaration should be legible and understandable for the general public, as well as our customers and business partners. To ensure this, we would like to first explain the terminology used in this data protection declaration, we use, inter alia, the following terms:
							</Paragraph>
							<Paragraph>
								a) Personal data
							</Paragraph>
							<Paragraph>
								Personal data means any information relating to an identified or identifiable natural person ("data subject"). An identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.
							</Paragraph>
							<Paragraph>
								b) Data subject
							</Paragraph>
							<Paragraph>
								Data subject is any identified or identifiable natural person, whose personal data is processed by the controller responsible for the processing.
							</Paragraph>
							<Paragraph>
								c) Processing
							</Paragraph>
							<Paragraph>
								Processing is any operation or set of operations which is performed on personal data or on sets of personal data, whether or not by automated means, such as collection, recording, organisation, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction.
							</Paragraph>
							<Paragraph>
								d) Restriction of processing
							</Paragraph>
							<Paragraph>
								Restriction of processing is the marking of stored personal data with the aim of limiting their processing in the future.
							</Paragraph>
							<Paragraph>
								e) Profiling
							</Paragraph>
							<Paragraph>
								Profiling means any form of automated processing of personal data consisting of the use of personal data to evaluate certain personal aspects relating to a natural person, in particular to analyse or predict aspects concerning that natural person's performance at work, economic situation, health, personal preferences, interests, reliability, behaviour, location or movements.
							</Paragraph>
							<Paragraph>
								f) Pseudonymisation
							</Paragraph>
							<Paragraph>
								Pseudonymisation is the processing of personal data in such a manner that the personal data can no longer be attributed to a specific data subject without the use of additional information, provided that such additional information is kept separately and is subject to technical and organisational measures to ensure that the personal data are not attributed to an identified or identifiable natural person.
							</Paragraph>
							<Paragraph>
								g) Controller or controller responsible for the processing
							</Paragraph>
							<Paragraph>
								Controller or controller responsible for the processing is the natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of personal data; where the purposes and means of such processing are determined by Union or Member State law, the controller or the specific criteria for its nomination may be provided for by Union or Member State law.
							</Paragraph>
							<Paragraph>
								h) Processor
							</Paragraph>
							<Paragraph>
								Processor is a natural or legal person, public authority, agency or other body which processes personal data on behalf of the controller.
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
`

const Paragraph = styled.p`
	padding: 1rem 0;
`
