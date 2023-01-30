// Utils
import React, { lazy, Suspense } from 'react'
import theme from './styles/theme.styles'

// Providers
import { ThemeProvider } from 'styled-components'

// Layout
import PageLayout from './layouts/page/page.layout'

// Styles
import 'react-tooltip/dist/react-tooltip.css'

// Components
import { Switch, Route, Redirect } from 'wouter'
import { GlobalStyles } from './styles/global.styles'

// Pages
const NodesPage = lazy(() => import('./pages/validator-leaderboard/nodes.page'))
const ValidatorDetailPage = lazy(() => import('./pages/validator-leaderboard/validator-detail.page'))

const AboutPage = lazy(() => import('./pages/static/about.page'))
const ImprintPage = lazy(() => import('./pages/static/imprint.page'))
const PrivacyPage = lazy(() => import('./pages/static/privacy.page'))
const GlossaryPage = lazy(() => import('./pages/static/glossary.page'))



const App = () => {
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<GlobalStyles />

				<PageLayout>
					<Suspense fallback={""}>
						<Switch>
							<Route path="/validators">
								<NodesPage nodeType="validator" />
							</Route>
							<Route path="/bridge-nodes">
								<NodesPage nodeType="bridge" />
							</Route>
							<Route path="/full-storage">
								<NodesPage nodeType="full" />
							</Route>
							<Route path="/light-nodes">
								<NodesPage nodeType="light" />
							</Route>

							<Route path="/validator/:identity" component={ValidatorDetailPage} />

							<Route path="/about" component={AboutPage} />
							<Route path="/imprint" component={ImprintPage} />
							<Route path="/privacy" component={PrivacyPage} />
							<Route path="/glossary" component={GlossaryPage} />

							<Redirect to="/validators" />
						</Switch>
					</Suspense>
				</PageLayout>
			</ThemeProvider>
		</React.Fragment>
	)
}

export default App
