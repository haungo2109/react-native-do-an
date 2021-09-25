import { useNavigation } from '@react-navigation/core';
import React from 'react';

import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
	width: 40px;
	height: 40px;
	position: relative;
`;
const UserImage = styled.Image`
	width: 40px;
	height: 40px;
	border-radius: 20px;
	border-color: #1777f2;
`;
const UserActive = styled.View`
	width: 15px;
	height: 15px;
	border-radius: 8px;
	background: #4bcb1f;
	position: absolute;
	bottom: -2px;
	right: -2px;
	border-width: 2px;
	border-color: #ffffff;
`;

const AvatarToProfile = ({
	source,
	online = false,
	story = false,
	user_id = 0,
}) => {
	const navigation = useNavigation();

	const handlePress = () => {
		navigation.navigate('User', { user_id });
	};

	return (
		<Container onPress={handlePress}>
			<UserImage source={source} story={story} />
			{online && <UserActive />}
		</Container>
	);
};

export default AvatarToProfile;
