import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setControllerImageSelection } from '../redux/reducers/controllerReducer';

function useModelImageSelection(max = 10, min = 1) {
	const dispatch = useDispatch();
	const showModelImageSelection = () => {
		dispatch(
			setControllerImageSelection({ show: true, max, min, images: null })
		);
	};

	const hiddenModelImageSelection = (images = null) => {
		dispatch(setControllerImageSelection({ show: false, images }));
	};

	return {
		hiddenModelImageSelection,
		showModelImageSelection,
	};
}

export default useModelImageSelection;
