export async function sendRequest(method, url, data){
    const res = await fetch(url,{
        method: method,
        headers: data ? {'Content-Type': 'application/json'} : {},
        body: JSON.stringify(data)
    }).then(response=>{
        if(response.status >= 400){
            return response.json().then(errResData =>{
            const error = new Error('Something went wrong!');
            error.data = errResData;
            throw error;
            })
        }
        return response.json()
    })
    return res

}
