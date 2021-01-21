// var nodemailer = require("nodemailer");
// const ical = require('ical-generator');
// var smtpTransport = nodemailer.createTransport({
//    service: "Gmail",
//    auth: {
//        user: "deepfilm12@gmail.com",
//        pass: "Jashan86990"
//    }
// });
// var mailOptions = {
//     to: "jdeep514@gmail.com",
//     subject: "This is a test email from a developer",
//     html: "<h1>Welcome to my website</h1>"
// }
// smtpTransport.sendMail(mailOptions, function (error, response) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Message sent: " , response);
//     }
// })

// function getIcalObjectInstance(starttime, endtime, summary,             description, location, url , name ,email) {
//     const cal = ical({ domain: "mytestwebsite.com", name: 'My test calendar event' });
//     cal.domain("mytestwebsite.com");
//     cal.createEvent({
//             start: starttime,         // eg : moment()
//             end: endtime,             // eg : moment(1,'days')
//             summary: summary,         // 'Summary of your event'
//             description: description, // 'More description'
//             location: location,       // 'Delhi'
//             url: url,                 // 'event url'
//             organizer: {              // 'organizer details'
//                 name: name,
//                 email: email
//             },
//         });
//     return cal;
//     }


//     async function sendemail(sendto, subject, htmlbody, calendarObj = null) {
//         mailOptions = {
//             to: sendto,
//             subject: subject,
//             html: htmlbody
//         }
//     if (calendarObj) {
//             let alternatives = {
//                 "Content-Type": "text/calendar",
//                 "method": "REQUEST",
//                 "content": new Buffer(calendarObj.toString()),
//                 "component": "VEVENT",
//                 "Content-Class": "urn:content-classes:calendarmessage"
//             }
//     mailOptions['alternatives'] = alternatives;
//     mailOptions['alternatives']['contentType'] = 'text/calendar'
//     mailOptions['alternatives']['content'] 
//         = new Buffer(calendarObj.toString())
//     }
//     smtpTransport.sendMail(mailOptions, function (error, response) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log("Message sent: " , response);
//             }
//         })
//     }
//     module.exports = {
//         sendemail,
//     };