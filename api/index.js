PORT = 8080
const express = require('express');
const cors = require('cors');

const app = express();


app.use(express.json())
app.use(cors({origin: '*'}));





app.get('/', (req, res) =>{
    res.send('api on');
})

app.listen(PORT, ()=>{
    console.log('ta ouvindo essa bomba');
});