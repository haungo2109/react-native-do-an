import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setControllerMenu } from '../redux/reducers/controllerReducer';

function useModelMenu() {
	const dispatch = useDispatch();

	const showModelMenu = (
		data = { id: 0, data: {}, listChoose: ['edit', 'delete', 'report'] }
	) => {
		dispatch(setControllerMenu({ ...data, show: true }));
	};

	const hiddenModelMenu = () => {
		dispatch(setControllerMenu({ show: false, data: {} }));
	};

	return {
		hiddenModelMenu,
		showModelMenu,
	};
}

export default useModelMenu;
