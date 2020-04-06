
export function group3(n){ 
	return String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,')
}