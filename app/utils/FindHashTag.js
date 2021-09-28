var regexp = /\B\#\w\w+\b/g

function findHashtags(searchText) {
    let result = searchText.match(regexp)
    if (result) {
        return result
    } else {
        return false
    }
}

export default findHashtags
