var cors = require('cors');
var express = require('express');
const morgan = require("morgan");
const app = require('../app');
const db = require('../db');
const { Pool } = require('pg')
const axios = require('axios');
const { response } = require('express');
const ics = require('ics');
const { writeFileSync } = require('fs');
var nodemailer = require('nodemailer');
const ical = require('ical-generator');
const bcrypt = require('bcrypt'); //for hashing passwords
// const flash = require('express-flash');
const passport = require('passport');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../db/middleware/validInfo');
const authorization = require('../db/middleware/authorization');
const { json } = require('body-parser');


var router = express.Router();
router.all(cors());

// Add Access Control Allow Origin headers
// router.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method ==='OPTIONS'){
//     res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }
//   next();
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});


/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', {page:'About Us', menuId:'about'});
});


/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', {page:'Contact Us', menuId:'contact'});
});


/* GET Time page. */
router.get('/next', function(req, res, next) {
  res.render('next', {page:'Second ', menuId:'second'});
});


/* GET Services page. */
router.get('/service', function(req, res, next) {
  res.render('service', {page:'service ', menuId:'second'});
});

router.get("/ics.js",  (req, res) => {
console.log("jashan");

});

// using this route .ics file send to user email.
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
const business = await db.query("select * from business where id = $1", [req.params.id]);
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



// CREAT A BUSINESS - Sign up Form
router.post("/api/v1/business", async (req, res, next) => {
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
    next();
  } catch (err) {
    console.log(err);

  }


});



// add time days
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
      "INSERT INTO add_services( servicename, servicecost, servicetime, weektime_id,business_id) values ($1, $2, $3, $4, $5) returning *", [req.body.servicename, req.body.servicecost, req.body.servicetime, "1", req.body.business_id ],);
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

//get all services

router.get("/api/v1/business/:id/allservices", async (req, res) => {
  console.log(req.params.id);

  try{
const service =  await db.query("select * from add_services where business_id= $1" , [req.params.id]);
//console.log(results.rows[0]);
res.status(200).json({
  status:"succes",
  data: {
    service: service.rows,
  },
});
}catch (err){
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




// Login Auth
// Login
router.post('/login', validInfo, async (req, res) => {
  try {
      
      // req.body
      // const email, password;

      const email = req.body['semail'];
      const password = req.body['spassword'];
        console.log(req.body);
      
      // // error if no such user
      const user = await  db.query("SELECT * FROM users WHERE email = $1", [
          email
      ]);
      if(user.rows.length === 0) {
          return res.status(401).json("Password or Username is incorrect, please reenter.");
      }

      // password = db password?

      const passwordValid = await bcrypt.compare(password, user.rows[0].password);
      
      if(!passwordValid) {
          return res.status(401).json("Password or Email is Incorrect.");
      }

     console.log(passwordValid);

      // provide token

      const token = jwtGenerator(user.rows[0].id);
      const name = user.rows[0].name;
       return res.status(200).json({ name, token, status:"200", message:"User Login Successfully"});
      
      // const token = jwtGenerator(user.rows[0].id);
      // const name = user.rows[0].name;
      // const resp = res.json({ name, token});
      // return name;

  } catch (err) {
      res.status(500).send('Server Error');
  }
});






// Registration

router.post('/register', validInfo, async (req, res) => {

  try {
       // Take apart req.body (name, email, pass)
          // const { name, email, password } = req.query;

          const name = req.query['name'];
          const email = req.query['email'];
          const password = req.query['password'];
         
      // Check if email already exists (if so, throw error)
          const user = await db.query("SELECT * FROM users WHERE email = $1", [
              email
          ]);
          if (user.rows.length > 0) {
              return res.json("An account is already linked to that email!");
            } 
            

            
      // Bcrypt password
            
          const saltRound = 10;
          const salt = await bcrypt.genSalt(saltRound);
          
          const bcryptPassword = await bcrypt.hash(password, salt);

      // Insert details in db
          const newUser = await db.query("INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *", [
              name, email, bcryptPassword
          ]);
          
      
      // Generate JWT 
          const token = jwtGenerator(newUser.rows[0].id);
          res.json({ name, token, status:"200", message:"Your account Created" });
      
  } catch (err) {
      res.status(500).send('Server Error');
  }
});

router.post("/verified", authorization, (req, res) => {
  try {
      res.json(true); 

  } catch (err) {
      res.status(500).send('Server Error');     
  }
});



// Login Auth
router.use("/dashboard", require("./dashbaord"));


// Appointment api link
router.post("/api/v1/business/:id/appointment", async (req, res) => {
  console.log(req.body);
  try{
    const business_id = req.body['business_id'];
    const m_service = req.body['m_service'];
    const appointment_date = req.body['appointment_date'];
    const time_slot = req.body['time_slot'];
    const amount = req.body['amount'];


    // Check if email already exists (if so, throw error)
    const time = await db.query("SELECT * FROM appointment_list WHERE business_id = $1 and appointment_date = $2 and time_slot = $3", [
      req.body.business_id, req.body.appointment_date, req.body.time_slot
  ]);
  console.log(req.body.time_slot);
  console.log(business_id);

  if (time.rows.length > 0) {
      return res.status(204).json({
        status: "204",
        message: "This Time Slot is already Booked!"
      });
    } 
    
    console.log(business_id);
     // Insert details in db
    const results = await db.query(
      "INSERT INTO appointment_list(business_id, m_service, appointment_date, time_slot) values ($1, $2, $3, $4) returning *", [business_id, m_service, appointment_date, time_slot ],);
    console.log(results);

    res.status(200).json({
      status:"200",
      message: "Appointment Successfully Booked!",
      data: {
        business:results.rows[0],
      },
    });
    

  } catch (err) {
    console.log(err);

  }


});










module.exports = router;
