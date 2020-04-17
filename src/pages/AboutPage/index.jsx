import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const axParam = {
	baseURL: "https://raw.githubusercontent.com/ristep/COVID-19-monitor/master/Citaj-me.md",
	headers: {
		"Content-type": "application/text"
	}
};

const axi = axios.create(axParam);

const AboutPage = () =>{
	const [readme, setReadme] = useState('');

	useEffect(() => {
		axi.get()
    .then((response) => { setReadme(response.data)})
    .catch((error) => {
        console.warn(error);
    })
	},[]);

	return(
		<div className="markBox">
			{/* <h2>COVID-19 Monitor App</h2> */}
			<div>
				<ReactMarkdown source={readme} />
			</div> 
		</div>
	)
}

export default AboutPage;