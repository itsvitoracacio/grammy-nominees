const Functions = [
  // Function to convert the category name from the url to the format that can match the AllAwards obj
	function toSpaceCaseCat ( categoryNameUrl ) {
		return categoryNameUrl
			.replaceAll('-', ' ')
			.replaceAll('Dance Eletronic', 'Dance/Eletronic')
			.replaceAll('Gospel Contemporary', 'Gospel/Contemporary')
			.replaceAll('Video Film', 'Video/Film')
			.replaceAll('Composing Arranging', 'Composing/Arranging')
	},
	// Function to convert the award name from the url to the format that can match the AllAwards obj
	function toSpaceCaseAward ( awardNameUrl ) {
		return awardNameUrl
			.replaceAll('-', ' ')
			.replaceAll('Dance Eletronic', 'Dance/Eletronic')
			.replaceAll('Duo Group', 'Duo/Group')
			.replaceAll('Performance Song', 'Performance/Song')
			.replaceAll('Music Small', 'Music/Small')
	}
]

export default Functions