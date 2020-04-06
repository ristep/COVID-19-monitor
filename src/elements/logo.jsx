import React from 'react';
import styled from 'styled-components';
import logo from "../logo.svg";
 
const Img = styled.img`
	/* z-index: -10; */
	position: absolute;
	align-self: right;
  top: 3px;
	left: 6px;	
	height: 42px;
`;

const Logo = () => {
	
	return (
		<>
			<Img src={logo} alt="logo" />
		</>
	);
} 

export default Logo;