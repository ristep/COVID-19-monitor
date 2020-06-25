import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useLanguage } from "locales/langReducer";

const axParam = {
	baseURL: "https://raw.githubusercontent.com/ristep/COVID-19-monitor/master/",
	headers: {
		"Content-type": "application/text"
	}
};

const axi = axios.create(axParam);
  
const AboutPage = () =>{
	const [readme, setReadme] = useState('');
	const language = useLanguage();
	const [rdm, setRdm] = useState('Read-me.md');
	
	useEffect(() => {
		setRdm( language==='mk' ? 'Citaj-me.md' : 'Read-me.md');
		axi.get( rdm )
    .then((response) => { setReadme(response.data);})
    .catch((error) => {
        console.warn(error);
    });
	},[language, rdm]);

	return(
		<div className="markBox">
			{/* <ReactJson src={{language}} /> */}
			<div>
				<ReactMarkdown source={readme} />
			</div> 
		</div>
	)
}

export default AboutPage;