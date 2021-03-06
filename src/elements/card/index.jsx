import React, { useState, useEffect } from "react";

// import "./index.scss";
import { imgUrl } from "dataModules";

export const Card = (props) => {
const { id, title, description, size, imgFileName } = props;
// console.log(props);	
var topStyle = {
  backgroundImage: 'url(' + imgUrl + 'background.png)'
};

return (
	<div className="card">
		<div className="cardTop" style={ topStyle }>
  		<img src={imgUrl+imgFileName} alt="Image?" />
		</div>
  	<div className="cardInfo">
    	<span className="title">
				{title}
			</span>
			<br/>
    	<span className="description">
				{description}
			</span>
		</div>
    	<div className="cardBottom">
				<button className="addButton">Add to cart</button> 
			</div>
	</div>
)
}
