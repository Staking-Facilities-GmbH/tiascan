const Formatters = {
    timeSince(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000)
        let interval = seconds / 31536000;

        if (interval > 1) {
            if (new Date().getFullYear() - interval < 2000) return 'N/A'
            return Math.floor(interval) + " years ago"
        }

        interval = seconds / 2592000
        if (interval > 1) {
            return Math.floor(interval) + " months ago"
        }

        interval = seconds / 86400
        if (interval > 1) {
            return Math.floor(interval) + " days ago"
        }

        interval = seconds / 3600
        if (interval > 1) {
            return Math.floor(interval) + " hours ago"
        }

        interval = seconds / 60
        if (interval > 1) {
            return Math.floor(interval) + " minutes ago"
        }

        return Math.floor(seconds) + " seconds"
    },

    readableNumber(number, rounding = true) {
        if (isNaN(number)) return number
        if (rounding) number = Math.round((number + Number.EPSILON) * 100) / 100
        return parseFloat(number).toLocaleString('en-US')
    },

    checkHttp(link) {
        if (!link || link.startsWith('http')) return link
        return `http://${link}`
    }
}

export default Formatters
