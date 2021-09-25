const regxUri = /[\w\d\.:]+\/\/[\w\d\.:]+\//;

const converUri = (str = '') => {
	if (regxUri.test(str)) return '/' + str.replace(regxUri, '');
	else return str;
};

export default converUri;
