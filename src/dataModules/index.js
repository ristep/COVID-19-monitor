import axios from "axios";
import { useDispatch } from "react-redux";

const axParams = {
	baseURL: "http://192.168.100.8/rapi/",
	headers: {
		"Authorization": "dummy-key",
		"Content-type": "application/json"
	}
};

const Axios = axios.create(axParams);

const errorMediator = (err) => ({
	code: err.response.data.code,
	message:err.response.data.message,
	messageFail: err.message,
	name: err.response.data.error,
	description: err.description,
	method: err.config.method,
	url: err.config.url,
	data: err.response.data,
	baseURL: err.config.baseURL,
});

export const getToken = (args) => {
	const { url = 'tokenizer/', userName, password, callBack, callError } = args;
	const fetchToken = () => {
		Axios.post(url, {
			name: userName,
			password: password
		})
		.then(response => { 
			callBack({ timeStamp: Date.now() ,...response.data});
		})
		.catch(err => {
			console.log(err.toJSON());
			callError(errorMediator(err));
		});
	}
	fetchToken();
}

export const postJsonRequest = (args) => {
	const { request, auToken, callBack, callError } = args;
	const fetchData = async () => {
		try{
			const dtj = await Axios.post("", request, { headers: { Authorization: auToken } }); 
			callBack(dtj.data);
		}
		catch(err){
			callError(errorMediator(err));
		}	
	};
	fetchData();
};

export const imgUrl = axParams.baseURL + 'images/' 
