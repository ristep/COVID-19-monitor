import React from "react";
import { useDispatch } from "react-redux";
import { nextLanguage } from "redux/actions";
import { useFlag } from "locales/langReducer";
// import mkd from "../../img/iconfinder_Macedonia-Flag_32270.png"

const LangButton = () => {
	const dispatch = useDispatch();
	const znamce = useFlag();

	const toggle = () => {
		dispatch(nextLanguage())
	}

	return (
			<img className="LangButton" src={znamce} alt={"Lang"} onClick={() => toggle()} /> 
	);
}

export default LangButton;