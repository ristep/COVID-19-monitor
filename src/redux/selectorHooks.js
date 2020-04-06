import { useSelector } from "react-redux";

// userToken Selectos selector Hooks
export const useUserToken = () => useSelector( (state) => (state.userToken) ); 
export const useAuToken = () => useSelector( (state) => (state.userToken.tokenData.auToken) );
export const useTokenError = () => useSelector( (state) => (state.userToken.tokenData.hasError) );

export const useUsersAll = () => useSelector( (state) => (state.jsonData.usersAll));

export const useUserTitles = () => {
	return useSelector((state) => (
		state.userToken.tokenData !== undefined
			?
			{
				userId: state.userToken.tokenData.id,
				userName: state.userToken.tokenData.name,
				userEMail: state.userToken.tokenData.email,
				userRole: state.userToken.tokenData.role,
				firstName: state.userToken.tokenData.first_name,
				secondName: state.userToken.tokenData.second_name,
			}
			: {}
	));
}

export const useIsLoggedIn = () => {
	return useSelector((state) => (
		state.userToken.isValid &&
		state.userToken.tokenData !== undefined &&
		state.userToken.tokenData.name !== 'anonymous'
	));
}

export const usePassDialogState = () => {
	return useSelector((state) => (state.uiState.passDialogState))
};

export const useWorldTotal = () => useSelector( (state) => (state.jsonData.worldTotal.data) );
export const useWorldCountries = () => useSelector( (state) => (state.jsonData.worldCountries.data) );
export const useCountryNames = () => useSelector( (state) => ({ index: state.jsonData.countryNames.index, countryNames: state.jsonData.countryNames.data, count: state.jsonData.countryNames.count }) );
export const useCountryData = () => useSelector( (state) => ({ 
		data: state.jsonData.countryData.data, 
		history: state.jsonData.countryData.history,
	}));

export const useGlobalHistory = () => useSelector( (state) => ({ 
		data: state.jsonData.globalHistory.data, 
		history: state.jsonData.globalHistory.history,
	}));

export const useZdravstvoRSS = () => useSelector( state => state.jsonData.zdravstvoRSS.channel );