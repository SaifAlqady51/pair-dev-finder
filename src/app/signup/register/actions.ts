"use server"
import * as nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
})

type CheckEmailType = {
    email:string;
    template:any;
    code?:string;
}


export async function checkEmail({email,template,code}: CheckEmailType) {
        try{
            await transporter.sendMail({
                from: email,
                to: email,
                replyTo: email,
                subject: `Website activity from ${email}`,
                html: template
            });

        }catch(error){
            throw new Error(`unable to send email : ${error} ` )
        }
    

    
}