const nodemailer=require('nodemailer')
const path=require('path')
const fs=require('fs')



const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASSWORD
    },
     tls: {
    rejectUnauthorized:false,
  },
})

function replaceContent(content,creds){
    return Object.keys(creds).reduce((updatedContent,key)=>{
        return updatedContent.replace(new RegExp(`#{${key}}`,"g"),creds[key])
    },content)
}

const Emailhelper =async(templateName,receiverEmail,creds)=>{
    try {
        const templatePath=path.join(__dirname,"email_templates",templateName)
        let content=await fs.promises.readFile(templatePath,"utf-8")
        content=replaceContent(content,creds)
        const emailDetails={
            to:receiverEmail,
            from:process.env.GMAIL_APP_EMAIL,
            subject:'Booking Details',
            html:content
        }
            await transport.sendMail(emailDetails)
            console.log('email sent');
            
            
    } catch (error) {
         if (error.code === "ENOENT") {
      console.error("Template file not found:", err.message);
    } else if (error.response && error.response.body) {
      console.error("Error sending email:", err.response.body);
    } else {
      console.error("Error occurred:", error.message);
    }
    }
}
module.exports=Emailhelper