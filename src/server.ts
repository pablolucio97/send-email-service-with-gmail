import express, {Request, Response} from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user: "pablojmde@gmail.com",
        pass: "yourpassword"
    },
    tls:{
        rejectUnauthorized: false
    }
})

const newEmail = {
        from: 'pablojmde@gmail.com',
        to: 'pablolucio_@hotmail.com',
        subject: 'Testing Nodemailer with Gmail.',
        text: `Im testing the email send with Nodemailer and Gmail.`
    }

app.post('/new-email', (req: Request, res: Response) => {
   const sendEmail = transporter.sendMail(newEmail, (error, info) => {
       if(error){
           return res.status(500).send('Fail to send e-mail')
       }
   })
    return res.send(`Email to ${newEmail.to} has sent.`)
})


app.listen('3335', () => {
    console.log('Server runnig at localhost:3335')
})
