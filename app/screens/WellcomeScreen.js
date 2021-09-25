import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../config/Colors';

const ImageBackground = styled.ImageBackground`
	flex: 1;
	height: 100%;
	resize-mode: cover;
	border-radius: 20px;
`;

const Container = styled.View`
	flex: 1;
	flex-direction: column;
`;

const LogoWrapper = styled.View`
	flex: 3;
	align-items: center;
	justify-content: center;
`;

const LogoImage = styled.Image`
	width: 150px;
	height: 150px;
`;

const LogoText = styled.Text`
	color: white;
	font-size: 15px;
`;

const GroupButton = styled.View`
	flex: 6;
	align-items: center;
	justify-content: center;
`;

const Button = styled.TouchableOpacity`
	width: 75%;
	height: 42px;
	flex-direction: row;
	border-radius: 21px;
	background: #eeeeee;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
`;

const ButtonFacebook = styled(Button)`
	background-color: ${Colors.facebookColor};
`;
const ButtonLogin = styled(Button)`
	background-color: transparent;
	border: 1px solid;
`;

const TextButtonFacebook = styled.Text`
	color: #f3f4f6;
`;
const TextButtonLogin = styled.Text`
	color: #f3f4f6;
`;

const ButtonLink = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	margin-top: 5px;
`;

const Icon = styled.View`
	margin-right: 6px;
	position: absolute;
	left: 15px;
`;

const TextLink = styled.Text`
	font-weight: bold;
	font-size: 13px;
	color: #d1d5db;
`;

const SmallText = styled.Text`
	margin-top: 20px;
	font-size: 11px;
	color: #9ca3af;
`;

export {
	ImageBackground,
	Container,
	LogoWrapper as Logo,
	ButtonLink,
	TextLink,
	SmallText,
};

function WellcomeScreen({ navigation }, props) {
	const handleLoginGoogle = () => {};
	const handleLoginFacebook = () => {};
	const handleLoginAccount = () => {
		navigation.navigate('Login');
	};
	const handleCreate = () => {
		navigation.navigate('Register');
	};
	return (
		<ImageBackground source={require('./../assets/story2.jpg')}>
			<Container>
				<LogoWrapper>
					<LogoImage source={require('./../assets/logo/logo.png')} />
					<LogoText>Connect everyone</LogoText>
				</LogoWrapper>
				<GroupButton>
					<ButtonFacebook onPress={handleLoginFacebook}>
						<Icon>
							<FontAwesome5
								name="facebook-f"
								size={24}
								color="white"
							/>
						</Icon>
						<TextButtonFacebook>Facebook</TextButtonFacebook>
					</ButtonFacebook>
					<Button onPress={handleLoginGoogle}>
						<Icon>
							<FontAwesome5
								name="google"
								size={24}
								color={'red'}
							/>
						</Icon>
						<Text>Google</Text>
					</Button>
					<ButtonLogin onPress={handleLoginAccount}>
						<TextButtonLogin>Login</TextButtonLogin>
					</ButtonLogin>
					<SmallText>Don't have an account?</SmallText>
					<ButtonLink onPress={handleCreate}>
						<TextLink>Create account</TextLink>
					</ButtonLink>
				</GroupButton>
			</Container>
		</ImageBackground>
	);
}

export default WellcomeScreen;
