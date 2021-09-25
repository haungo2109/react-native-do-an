import AsyncStorage from '@react-native-async-storage/async-storage';

const setData = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value);
		return { key, value };
	} catch (e) {
		return null;
	}
};

const getData = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return value;
		}
		return null;
	} catch (e) {
		return null;
	}
};

const removeAll = async () => {
	try {
		await AsyncStorage.clear();
	} catch (e) {}
};

export { getData, setData, removeAll };
