var express = require('express');
var app = express();
const { readFile, writeFile } = require('fs').promises
/*
let gg = readFile('./data.json').then(e=>{
    let gg = JSON.parse(e)
    for(let key in gg){
        let newName = key.toLocaleLowerCase();
        gg[newName] = gg[key]
        delete gg[key]
    }
    let text = JSON.stringify(gg);
    console.log(text);
    writeFile('./data.json', text).then(e=> console.log('overwrite successful!'))
})
*/
app.listen(3023, ()=>console.log('listening on port: 3023'))

app.get('/', async (request, response)=>{
    response.send('Hello')
})

app.get('/get/request/:name', async (request, response)=>{
    let payload;
    let file = await readFile('./data.json');
    if(!request.params.name){
        payload = {Error: 'No movie queried'}
    }
    if(request.params.name === 'all'){
        payload = JSON.parse(file)
    } else{
        payload = JSON.parse(file)[request.params.name]
    }
    console.log(request.params);
    response.set({'Access-Control-Allow-Origin' : '*'})
    response.send(payload);
})

app.get('/get/search/:query', async (request, response)=>{
    console.log('accessed');
    let payload;
    let file = await readFile('./data.json');
    if(!request.params.query){
        payload = {Error: 'No query!'}
    }else{
        const res = Object.keys(JSON.parse(file)).filter(e=> e.startsWith(request.params.query));

        const data =  Object.values(JSON.parse(file))
        const newdata = data.filter(e=> e.Title.toLowerCase().startsWith(request.params.query)).map(e=>{ 
            return {title: e.Title, poster: e.Poster, id:e.imdbID}
        });
        console.log(newdata);
        payload = newdata;
    }
    
    response.set({'Access-Control-Allow-Origin' : '*'});
    response.send(payload);
})
