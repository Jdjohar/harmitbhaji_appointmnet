var express = require('express');
const morgan = require("morgan");
var bodyParser = require('body-parser')
const app = require('../app');
const db = require('../db');
const cors = require('cors');
const { Pool } = require('pg')
const axios = require('axios');
const { response } = require('express');
const ics = require('ics');
const { writeFileSync } = require('fs');
var nodemailer = require('nodemailer');
const ical = require('ical-generator');

// const pool = new Pool({
//   connectionString:process.env.DATABASE_URL,
//   ssl:{ rejectUnauthorized: false }
// });

var router = express.Router();

// router.use(morgan("dev"));

router.use(cors());
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/about', function(req, res, next) {
  res.render('about', {page:'About Us', menuId:'about'});
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {page:'Contact Us', menuId:'contact'});
});
router.get('/next', function(req, res, next) {
  res.render('next', {page:'Second ', menuId:'second'});
});
router.get('/service', function(req, res, next) {
  res.render('service', {page:'service ', menuId:'second'});
});

router.get("/ics.js",  (req, res) => {
console.log("jashan");

});

// router.get('/db', async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query('SELECT * FROM business_appoint');
//     const results = { 'results': (result) ? result.rows : null};
//     res.send(JSON.stringify(result));
//     client.release();
//   } catch (err) {
//     console.error(err);
//     res.send("Error " + err);
//   }
// })

router.get("/send",  (req, res) => {
  res.render('send', {page:'send ', menuId:'second'});

  const output = ` 
  
  <p>Your ICS file here</p>
  <a href="www.jdwebservices.com/test.ics">ICS file</a>
  `;

  
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'deepfilm12@gmail.com',
    pass: 'Jashan86990'
  }
});

var mailOptions = {
  from: 'deepfilm12@gmail.com',
  to: 'jdeep514@gmail.com',
  subject: 'Merchant Name - Confirmation Email',
  text: 'That was easy!',
  html: output
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
  
  });

router.get("/icsexport",  (req, res) => {
  axios.get("http://localhost:3000/api/v1/business/1")
  .then((response)=>
    {
      console.log(response.data.data);      
      console.log(response.data.data.time[0].day_name);      
      console.log(response.data.data.business.phonenumber);      
      console.log(response.data.data.service[0].servicename);      

      const business_name = response.data.data.business.business_name;
      const day = response.data.data.time[0].day_name;
      const phonenumber = response.data.data.business.phonenumber;
      const service = response.data.data.service[0].servicename;
      
      res.render('icsexport', {
        business_name, day, phonenumber, service
      });



      // Mail send invites

      var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "deepfilm12@gmail.com",
            pass: "Jashan86990"
        }
     });


     function contentdetail(description, summary, business_name1, day1, phone_number, service){
      let content = 'BEGIN:VCALENDAR\n' +
      'VERSION:2.0\n' +
      'BEGIN:VEVENT\n' +
      'SUMMARY:'+ summary +'\n' +
      'DTSTART;TZID=Asia/Kolkata:20210123T120000\n' +
      'DTEND;TZID=Asia/Kolkata:20210123T130000\n' +
      'RRULE:FREQ=WEEKLY;BYDAY=SA \n' +
      'LOCATION:JD Web Services \n' +
      'ORGANIZER;CN=deepfilm12@gmail.com:mailto:deepfilm12@gmail.com \n ' +
      'DESCRIPTION:' + description + '\n' +
      'BUSINESSNAME:`business_name` \n' +
      'STATUS:CONFIRMED\n' +
      'SEQUENCE:3\n' +
      'BEGIN:VALARM\n' +
      'TRIGGER:-PT10M\n' +
      'DESCRIPTION:' + description + '\n' +
      'ACTION:DISPLAY\n' +
      'END:VALARM\n' +
      'END:VEVENT\n' +
      'END:VCALENDAR'; 
      


      return content

     }


       
     //  let content = 'BEGIN:VCALENDAR\r\nPRODID:-//ACME/DesktopCalendar//EN\r\nMETHOD:REQUEST\r\n...';
    //  let content = 'BEGIN:VCALENDAR\n' +
    //  'VERSION:2.0\n' +
    //  'BEGIN:VEVENT\n' +
    //  'SUMMARY:Summary123\n' +
    //  'DTSTART;VALUE=DATE:20201030T093000Z\n' +
    //  'DTEND;VALUE=DATE:20201030T113000Z\n' +
    //  'LOCATION:Webex \n' +
    //  'DESCRIPTION:Ics file \n' +
    //  'BUSINESSNAME:`business_name` \n' +
    //  'STATUS:CONFIRMED\n' +
    //  'SEQUENCE:3\n' +
    //  'BEGIN:VALARM\n' +
    //  'TRIGGER:-PT10M\n' +
    //  'DESCRIPTION:Description123\n' +
    //  'ACTION:DISPLAY\n' +
    //  'END:VALARM\n' +
    //  'END:VEVENT\n' +
    //  'END:VCALENDAR'; 

    let content = contentdetail("This is an email confiramtion for the following appointment:", "This is summary", business_name, day, phonenumber, service)

     var mailOptions = {
       from: "deepfilm12@gmail.com",
       to: "hkamboe@gmail.com",
       subject: "Merchant Name - Confirmation Email",
       //html: "<h1>Welcome to my website</h1>",
       icalEvent: {
        contentType: 'text/calendar; charset="utf-8"; method=REQUEST',
         filename: 'invitation.ics',
         method: 'request',
         content: content
     }
       
     }
     smtpTransport.sendMail(mailOptions, function (error, response) {
       if (error) {
           console.log(error);
       } else {
           console.log("Message sent: " , response);
       }
     })
     
     //send obj
     
     async function sendemail(sendto,sendfrom, subject, htmlbody) {
         mailOptions = {
             from: sendfrom,
             to: sendto,
             subject: subject,
             html: htmlbody,
     
         }
     smtpTransport.sendMail(mailOptions, function (error, response) {
             if (error) {
                 console.log(error);
             } else {
                 console.log("Message sent: " , response);
             }
         })
     }
     module.exports = {
         sendemail,
     };





      // End Mail send invites










    })
    .catch((err)=>{
      console.log(err);
    });

})


// Get all business
router.get("/api/v1/business", async (req, res) => {
  try{
    const results = await db.query("select * from business_appoint");
    // console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data:{
        business:results.rows,
      },
    });

  }catch (err) {
    console.log(err);
  }


});


// Get One business

router.get("/api/v1/business/:id", async (req, res) => {
  console.log(req.params.id);

  try{
const business = await db.query("select * from business where id = $1", [req.params.id,
]);


const time =  await db.query("select * from week_time where id= $1" , [
  req.params.id,
]);

const service =  await db.query("select * from add_services where business_id= $1 and weektime_id=$2" , [
  req.params.id, req.params.id
]);
//console.log(results.rows[0]);
res.status(200).json({
  status:"succes",
  data: {
    business: business.rows[0],
    time: time.rows,
    service: service.rows,
  },
});
}catch (err){
    console.log(err);
  }
});

// CREAT A BUSINESS
router.post("/api/v1/business", async (req, res) => {
  console.log(req.body);

  try{

    const results = await db.query("INSERT INTO business_appoint(business_name, business_email, country, city, province, phonenumber) values ($1, $2, $3, $4, $5, $6) returning *", [req.body.business_name,req.body.business_email, req.body.country, req.body.city, req.body.province,req.body.phonenumber] );
    console.log(results);

    res.status(201).json({
      status:"succes",
      data: {
        business:results.rows[0],
      },
    });

  } catch (err) {
    console.log(err);

  }


});




// add time all days
router.post("/api/v1/business/:id/time", async (req, res) => {
  console.log(req.body);

  try{

    const results = await db.query(
      "INSERT INTO week_time( business_id, start_time, end_time, day_name) values ($1, $2, $3, $4) returning *", 
      [req.body.business_id, req.body.start_time, req.body.end_time, "Monday" ],);
    console.log(results);

    res.status(201).json({
      status:"succes",
      data: {
        business:results.rows[0],
      },
    });

  } catch (err) {
    console.log(err);

  }


});



// add Services
router.post("/api/v1/business/:id/services", async (req, res) => {
  console.log(req.body);

  try{

    const results = await db.query(
      "INSERT INTO add_services( servicename, servicecost, servicetime, weektime_id,business_id) values ($1, $2, $3, $4, $5) returning *", [req.body.servicename, req.body.servicecost, req.body.servicetime, req.body.weektime_id,  req.body.business_id ],);
    console.log(results);

    res.status(201).json({
      status:"succes",
      data: {
        business:results.rows[0],
      },
    });

  } catch (err) {
    console.log(err);

  }


});

// UPDATE A BUSINESS
router.put("/api/v1/business/:id", async(req, res) => {

  try{

    const results = await db.query(
      "UPDATE business SET business_name= $1, country = $2 where id = $3 returning *", 
      [req.body.business_name, req.body.country, req.params.id]
      );
      console.log(results);
      res.status(200).json({
        status:"succes",
        data: {
          business:results.rows[0],
        },
      });

  }catch (err) {

  }
  console.log(req.params.id);
  console.log(req.body);

 
});     

router.delete("/api/v1/business/:id", async(req, res) => {
  try{
    const results =await db.query("DELETE FROM business where id = $1", [req.params.id]);
    console.log(results);
    res.status(204).json({
      status:"succes",
    });
  }catch (err) {
console.log(err);
  }
   
}); 


module.exports = router;
