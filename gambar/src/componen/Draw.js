import React, {useRef, useState} from 'react';
import {SketchField, Tools} from 'react-sketch'
import {Button, Alert} from 'react-bootstrap'
import {saveAs} from 'file-saver'
import axios from 'axios'

const styles={
    draw:{
        margin : '0 auto'
    }
}
const Draw = () =>{
    const[send, setSend] = useState(false)
    const[hasil, setResult] = useState()

    const sketch = useRef ()

    const handleSubmit = () => {
        const canvas = sketch.current.toDataURL()
        // console.log(canvas)
        // saveAs (canvas, 'angka.jpg')
        kirimData(canvas)
    }

    const handleReset = () => {
        sketch.current.clear()
        sketch.current._backgroundColor('black')
        setSend(false)
        setResult()
    }
    const kirimData = (c) => {
        console.log(c)

        const headers = {
            'accept' : 'application/json'
        }
        const fd = new FormData()
        fd.append('image', c)

        axios.post('http://127.0.0.1:8000/api/angka/', fd, {headers:headers})
        .then(res=> {
            console.log(res.data)
            setSend(true)
            ambilGambar(res.data.id)
        })
        .catch(err=>console.log(err))
    }
    const ambilGambar = (id) => {
        axios.get(`http://127.0.0.1:8000/api/angka/${id}/`)
        .then(res=>{
            setResult(res.data.hasil)
        })

    }

    return (
        <React.Fragment>
            {send && <Alert variant='info'>sukses Kirim Ke Django</Alert>}
            {hasil && <h3>ini pasti angka {hasil}</h3>}
            <SketchField
                ref = {sketch}
                width='500px'
                height='500px'
                style = {styles.draw}
                tools={Tools.Pencil}
                backgroundColor='black'
                lineColor='white'
                imageFormat='jpg'
                lineWidth={40}
            />
        <div className="mt-3">
            <Button onClick={handleSubmit} variant='primary'>Save</Button>
            <Button onClick={handleReset} variant='secondary'>Clear</Button>
        </div>
        </React.Fragment>
        
    );
}

export default Draw;