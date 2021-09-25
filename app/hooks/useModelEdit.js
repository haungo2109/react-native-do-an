import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setControllerEdit } from '../redux/reducers/controllerReducer';

function useModelEdit(title) {
	const dispatch = useDispatch();

	const showModelEdit = (data) => {
		let payload = { ...data, show: true };
		if (title) {
			payload['title'] = title;
		}
		dispatch(setControllerEdit(payload));
	};

	const hiddenModelEdit = () => {
		dispatch(setControllerEdit({ show: false, data: {} }));
	};

	return {
		hiddenModelEdit,
		showModelEdit,
	};
}

export default useModelEdit;
