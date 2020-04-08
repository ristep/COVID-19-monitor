import React from "react";
import { useDispatch } from "react-redux";
import { nextLanguage } from "redux/actions";

const LangButton = () => {
	const dispatch = useDispatch();

	const toggle = () => {
		dispatch(nextLanguage())
	}

	return (
		<button className="LangButton" onClick={toggle}>
			Lang 
		</button> 
	);
}

export default LangButton;