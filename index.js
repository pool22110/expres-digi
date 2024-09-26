import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000

// app.get('/',(req,res)=>{
//     res.send("Hello from Raj and his tea")
// })
// app.get('/ice-tea',(req,res)=>{
//     res.send("Which ice tea do you want")
// })
app.use(express.json())

let teaData=[]
let nextId = 1

// ADD Tea
app.post('/teas',(req,res)=>{
    
    const {name,price} = req.body
    const newTea = {id:nextId++, name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

/////to get all tae
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

///get tea according to id
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=> t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Tea not found')
    } else {
        return res.status(200).send(tea)
    }
})

/////update tea
app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=> t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Tea not found')
    }

    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

/////delete tea
app.delete('/tea/:id',(req,res)=>{
    const index = teaData.findIndex(t=> t.id === parseInt(req.params.id))
    if (index===-1) {
       return res.status(404).send("tea not found")
    }
    teaData.splice(index,1)
    return res.status(204).send('Tea deleted')
})

app.listen(port,()=>{
    console.log(`Server is running at  port:${port}...`)
})