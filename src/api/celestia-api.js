// Config
import apiConf from '../config/api-config.json'
import { Sttp } from '@supercharge/sttp'

// Const
const apiBase = [apiConf.API_URL, apiConf.API_PREFIX, apiConf.API_VERSION].join('/')

const CelestiaApi = {

    async fetchInfo() {
        const url = [apiBase, 'info'].join('/')
        const returnValue = await Sttp
            .withOptions({withCredentials: false})
            .withQueryParams({})
            .get(url)

        return returnValue.payload()
    },

    async fetchValidators(page) {
        const url = [apiBase, 'validators'].join('/')
        const returnValue = await Sttp
            .withOptions({withCredentials: false})
            .withQueryParams({page: page || 0})
            .get(url)

        return returnValue.payload()
    },

    async fetchValidatorSearch(page, search) {
        const url = [apiBase, 'validators'].join('/')
        const returnValue = await Sttp
            .withOptions({withCredentials: false})
            .withQueryParams({page: page || 0, query: search || ''})
            .get(url)

        return returnValue.payload()
    },

    async fetchValidatorDetails(nodeId) {
        const url = [apiBase, 'validators', nodeId].join('/')
        const returnValue = await Sttp
            .withOptions({withCredentials: false})
            .get(url)

        return returnValue.payload()
    },

    async fetchFullNodes(page) {
        const url = [apiBase, 'nodes', 'full'].join('/')
        const returnValue = await Sttp
            .withOptions({withCredentials: false})
            .withQueryParams({page: page || 0})
            .get(url)

        return returnValue.payload()
    },

    async fetchBridgeNodes(page) {
        const url = [apiBase, 'nodes', 'bridge'].join('/')
        const returnValue = await Sttp
            .withOptions({withCredentials: false})
            .withQueryParams({page: page || 0})
            .get(url)

        return returnValue.payload()
    },

    async fetchLightNodes(page) {
        const url = [apiBase, 'nodes', 'light'].join('/')
        const returnValue = await Sttp
            .withOptions({withCredentials: false})
            .withQueryParams({page: page || 0})
            .get(url)

        return returnValue.payload()
    },

    async fetchLocations(page) {
        const url = [apiBase, 'locations'].join('/')
        const returnValue = await Sttp
            .withOptions({withCredentials: false})
            .withQueryParams({page: page || 0})
            .get(url)

        return returnValue.payload()
    }
}

export default CelestiaApi;
