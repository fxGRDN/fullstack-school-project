//response zrob normalnie debilu
export async function fetchData(url:string, options?:object) {
    try{
        const response: Response = await fetch(url, options);

        
        if(response.ok){
            let type = response.headers.get('Content-Type');
            if(type?.includes('application/json')) return await response.json();
            if(type?.includes('text/html')) return await response.text();

        } else {
            
            return Promise.reject(await response.text());
        }
        
    } catch (err) {
        console.error(err);
        
    }
}

