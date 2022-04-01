import { useRouter } from 'next/router'
const LastFM = require('last-fm')
const lastfm = new LastFM('6444395aab91bc170539e7312aaf7638', { userAgent: 'QuarterNotes/1.0.0 (http://example.com)' })


const Search = () => {
	const router = useRouter()

	const searchQuery = router.query.q

	var searchResults

	const callback = function (error, data) {
		if (error) console.error(error)
		else {
			searchResults = data
			return data
		}
	}
	lastfm.trackSearch({ q: 'whats up', limit: 5 }, callback)
	console.log(searchResults)

	return <p>search: {searchResults}</p>
}
export default Search