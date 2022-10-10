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
  res.render('next', {page:'Second Title', menuId:'second'});
});


/* GET Services page. */
router.get('/service', function(req, res, next) {
  res.render('service', {page:'service ', menuId:'second'});
});

router.get("/ics.js",  (req, res) => {
console.log("jashan");

});

// using this route .ics file send to user email.
// router.get("/send",  (req, res) => {
//   res.render('send', {page:'send ', menuId:'second'});

//   const output = ` 
  
//   <p>Your ICS file here</p>
//   <a href="www.jdwebservices.com/test.ics">ICS file</a>
//   `;

  
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'deepfilm12@gmail.com',
//     pass: 'phzizvxexwhbkckb'
//   }
// });

// var mailOptions = {
//   from: 'deepfilm12@gmail.com',
//   to: 'jdeep514@gmail.com',
//   subject: 'Merchant Name - Confirmation Email',
//   text: 'That was easy!',
//   html: output
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
  
//   });

router.get("/icsexport",  (req, res) => {
  axios.get("http://localhost:3000/api/v1/business/1")
  .then((response)=>
    {
      console.log(response.data.data);      
      console.log(response.data.data.business.phonenumber);      
      console.log(response.data.data.service[0].servicename);      

      const business_name = response.data.data.business.business_name;

      // const day = response.data.data.time[0].day_name;
      const phonenumber = response.data.data.business.phonenumber;
      const service = response.data.data.service[0].servicename;
      
      res.render('/icsexport', {

        business_name, phonenumber, service
      });



      // Mail send invites

      var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "jdwebservices1@gmail.com",
            pass: "phzizvxexwhbkckb"
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


    let content = contentdetail("This is an email confiramtion for the following appointment:", "This is summary", business_name, phonenumber, service)

     var mailOptions = {
       from: "deepfilm12@gmail.com",
       to: "jdeep514@gmail.com",
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
      var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "jdwebservices1@gmail.com",
            pass: "phzizvxexwhbkckb"
        }
     });
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
const business = await db.query("select * from business_appoint where id = $1", [req.params.id]);
const time =  await db.query("select * from week_time where id= $1" , [
  req.params.id,
]);
const service =  await db.query("select * from add_services where business_id= $1 and id=$2" , [
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
  console.log("req: ",req.body);
  const {business_name, business_email, country, city, province, phonenumber,national, max_appoint} = req.body;
  try{

    const results = await db.query("INSERT INTO business_appoint(business_name, business_email, country, city, province, phonenumber, max_appoint) values ($1, $2, $3, $4, $5, $6, $7) returning *", [business_name,business_email, country, city, province,phonenumber, max_appoint] );
    const countryExists = await db.query("SELECT * FROM holidays WHERE country = $1",[country]);
    const customHolidays = await db.query("INSERT INTO custom_holidays(business_id, dates) VALUES ($1, $2) returning *",[results.rows[0].id, national]);
    console.log("custom holidays: ", customHolidays);
    //console.log("country Exists: ",countryExists);
    //console.log(results);
    if(countryExists.rows.length === 0){
      const holidays = await db.query("INSERT INTO holidays(country, dates) VALUES ($1, $2)",[country, national]);
    }  
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
  console.log(req.body, "Hello body");
  console.log(req.body.id, "Hello id");
  console.log(req.params);
  try{

    const results = await db.query(
      "INSERT INTO week_time( business_id, start_time, end_time) values ($1, $2, $3) returning *", 
      [req.body.id, req.body.start_time, req.body.end_time],);
    console.log(results);
    console.log(results.rows.business_id);


    res.status(201).json({
      status:"succes",
      data: {
        business:results.rows[0].business_id,
      },
    });

  } catch (err) {
    console.log(err);

  }

});

// add Services - Ritwik
router.post("/api/v1/business/:id/services", async (req, res) => {
  //console.log("services:",req.body);
  const {inputList} = req.body;
  const {id} = req.body;
  try{
  inputList.forEach(async (service) => {
    let results = await db.query(`INSERT INTO add_services(servicename, servicecost, servicetime, business_id) VALUES($1, $2, $3, $4)`,[service.serviceName, service.serviceCost, service.serviceTime, id]);
    console.log(results);

    res.status(201).json({
      status: "success",
      
    })
  });
  } catch(err){
    console.log(err);
  }

});








// // add Services -  Jashan
// router.post("/api/v1/business/:id/services", async (req, res) => {
//   console.log(req.body);

//   try{

//     const results = await db.query(
//       "INSERT INTO add_services( servicename, servicecost, servicetime, business_id) values ($1, $2, $3, $4) returning *", [req.body.servicename, req.body.servicecost, req.body.servicetime, req.body.business_id ],);
//     console.log(results);

//     res.status(201).json({
//       status:"succes",
//       data: {
//         business:results.rows[0],
//       },
//     });

//   } catch (err) {
//     console.log(err);

//   }


// });

//get all services

router.get("/api/v1/business/:id/allservices", async (req, res) => {
  //console.log(req.params.id);
  //console.log("ritwik:",req.query);
  try{
const service =  await db.query("select * from add_services where business_id= $1" , [req.query.id]);
const country = await db.query("SELECT * FROM business_appoint WHERE id = $1", [req.query.id]);
//console.log("country ", country.rows[0].country);
//console.log(results.rows[0]);
res.status(200).json({
  status:"succes",
  data: {
    service: service.rows,
    country:  country.rows[0].country
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

      const user1_id = user.rows[0].id;
      const token = jwtGenerator(user.rows[0].id);
      const name = user.rows[0].name;
       return res.status(200).json({ name, token, user1_id, status:"200", message:"User Login Successfully"});
      
      // const token = jwtGenerator(user.rows[0].id);
      // const name = user.rows[0].name;
      // const resp = res.json({ name, token});
      // return name;

  } catch (err) {
      res.status(500).send('Server Error');
  }
});








//Login with Google or Facebook
router.post("/api/v1/business/social-login", async(req,res)=> {
  //console.log("req: ",req);
  const name = req.body.name;
  const email = req.body.email;
  // const googleId = req.body.googleId;

  const googleUser = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  if(googleUser.rows.length > 0){
    res.status(200).json({
      status: "success",
      redirect: "/"
    })
  } else {
    var newUser = await db.query(`INSERT INTO users(name, email) VALUES($1, $2)`, [name, email]);
    res.status(200).json({
      status: "success",
      redirect: "/"
    })
  }
})

// Normal login
router.post("/api/v1/business/login", async(req,res,next)=>{
  console.log(req.body);
  const { email, emailotp, password } = req.body;
  console.log(email);
  const results = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
    console.log(results.rows);

    
    if(results.rows.length > 0) {
      const user = results.rows[0];
      
      if(user.emailverifed == 0 || user.emailverifed == null || user.emailverifed == "")
      {
        if(emailotp != "")
        {
          if(user.emailverifyotp == emailotp)
          {
            const custom = "1";
            const newHolidays = await db.query(`UPDATE users SET emailverifed = '${custom}' WHERE email = '${user.email}'`);
             console.log(newHolidays.rowCount);
            
        if(user.password == 0 || user.password == null || user.password == "")
        {
             return res.status(200).json({
              status: "Email Verified Successfullly",
              successpath: "createpassword",
              redirect: "/login"
            });
          }else{
            return res.status(200).json({
             status: "Email Verified Successfullly",
             successpath: "password",
             redirect: "/login"
           });
          }
          }else{
            return res.status(200).json({
             status: "Your Email Otp was incorrect",
             successpath: "otp",
             redirect: "/login"
           });
          }

        }else{
          const custom = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        const newHolidays = await db.query(`UPDATE users SET emailverifyotp = '${custom}' WHERE email = '${user.email}'`);
         console.log(newHolidays.rowCount);
         const output = `<p>Your Verification Code is: ${custom}</p>`;
         sendemail(email,"jdwebservices1@gmail.com", "Email Verification OTP", output);
         return res.status(200).json({
          status: "Otp Send On your Email",
          successpath: "otp",
          redirect: "/login"
        });
      }
      }else{
        if(user.password == 0 || user.password == null || user.password == "")
        {
             return res.status(200).json({
              status: "data found Create Password",
              successpath: "createpassword",
              redirect: "/login"
            });
          }else{
        if(password == "")
        {
          return res.status(200).json({
           status: "data found",
           successpath: "password",
           redirect: "/login"
         });

        }else{
          passport.authenticate("local", function(err, user, info) {
            if(err) {
              return next(err);
            }
            if(!user) {
              return res.status(401).json({
                status: "failure",
                successpath: "email",
                redirect: "/login"
              });
            }
            return res.status(200).json({
              status: "success",
              successpath: "success",
              data: user,
              redirect: "/"
            });
          })(req, res, next);
        }
      }
      }
}else{
  const custom = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  const newUser = await db.query(`INSERT INTO users(email, emailverifyotp, emailverifed) VALUES('${email}', '${custom}', '0')`);
  const output = `<p>Your Verification Code is: ${custom}</p>`;
  sendemail(email,"jdwebservices1@gmail.com", "Email Verification OTP", output);

  return res.status(200).json({
    status: "Otp Send On your Email",
    successpath: "otp",
    redirect: "/login"
  });
}


async function generateOTP(limit) {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < limit; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
module.exports = {
  generateOTP,
};
async function sendemail(sendto,sendfrom, subject, htmlbody) {
  mailOptions = {
      from: sendfrom,
      to: sendto,
      subject: subject,
      html: htmlbody,

  }
var smtpTransport = nodemailer.createTransport({
 service: "Gmail",
 auth: {
     user: "jdwebservices1@gmail.com",
     pass: "phzizvxexwhbkckb"
 }
});
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
}
);

router.post("/api/v1/business/register", async(req,res) => {
    let {name, email,password,cpassword} = req.body;

    let hashedpassword = await bcrypt.hash(password, 10);
    

    const results = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    console.log(results.rows);

    if(results.rows.length > 0){
      const user = results.rows[0];
      const newHolidays = await db.query(`UPDATE users SET name = '${name}', password = '${hashedpassword}' WHERE email = '${user.email}'`);
      console.log(newHolidays.rowCount);
     
      return res.status(200).json({
        status: "success",
        successpath: "success",
        data: user,
        redirect: "/"
     });
    } else {
      const newUser = await db.query(
        `INSERT INTO users(name, email, password, emailverifed)
        VALUES($1, $2, $3, '0')
        `, [name, email, hashedpassword]
      )
      const user = newUser.rows[0];
      res.status(200).json({
        status: "success",
        successpath: "success",
        data: user,
        redirect: "/"
      });
    }
  
})





// ==========================================================
// =============================================================
// =============================================================
// =============================================================

// embed code login and path - Jashan




// // Login Auth
// router.post('/embedcode/login', validInfo, async (req, res) => {
//   try {
//       // req.body
//       // const email, password;

//       const email = req.body['semail'];
//       const password = req.body['spassword'];
//       console.log(req.body);
      
//       // // error if no such user
//       const user = await  db.query("SELECT * FROM users WHERE email = $1", [
//           email
//       ]);
//       if(user.rows.length === 0) {
//           return res.status(401).json("Password or Username is incorrect, please reenter.");
//       }

//       // password = db password?
//       const passwordValid = await bcrypt.compare(password, user.rows[0].password);
//       if(!passwordValid) {
//           return res.status(401).json("Password or Email is Incorrect.");
//       }

//      console.log(passwordValid);

//       // provide token
//       const token = jwtGenerator(user.rows[0].id , "Id Number");
//       const name = user.rows[0].name;
//       var id = user.rows[0].id;
//       const business = await db.query("SELECT * FROM business_appoint WHERE user_id = $1", [id]);
//       const b_id = business.rows[0].id;
//       const embedcode = await db.query("INSERT INTO componenttable (business_id, embedcode1,embedcode2,embedcode3) values ($1,$2,$3,$4) returning *",
//         [b_id , "TRUE", "False", "False"]);
//        return res.status(200).json({ name, token,b_id, status:"200", message:"User Login Successfully"});


//   } catch (err) {
//       res.status(500).send('Server Error');
//   }
// });


// Appointment api link
router.post("/api/v1/business/appointment/:id", async (req, res) => {
  //console.log("ritwik: ", req)
  try{
    // console.log("id", req.params)

//     dought lines
    console.log(req.body);  
    const business_id = req.body.postData.id;
    const m_service = req.body.postData['m_service'];
    let appointment_date = new Date(req.body.postData['appointment_date']);
    const time_slot = req.body.postData['time_slot'];

    // const business_id = 1;
    // const m_service = req.body['m_service'];
    // const appointment_date = req.body['appointment_date'];
    // const time_slot = req.body['time_slot'];

    console.log('test');
    console.log("appointment", new Date(appointment_date.getTime() - (appointment_date.getTimezoneOffset() * 60000)));
    appointment_date = new Date(appointment_date.getTime() - (appointment_date.getTimezoneOffset() * 60000));
    // Check if Time Slot already exists (if so, throw error)
    const time = await db.query("SELECT * FROM appointment_list WHERE business_id = $1 and appointment_date = $2 and time_slot = $3", 
    [business_id, appointment_date, time_slot]);
    const max_appoint = await db.query("SELECT max_appoint FROM business_appoint WHERE id=$1", [business_id]);
    
      
    
  if (time.rows.length >= parseInt(max_appoint.rows[0].max_appoint)) {
      return res.status(204).json({
        status: "204",
        message: "This Time Slot is already Booked!"
      });
    } 
    

  // console.log("Time Slot: ",time_slot);
  // console.log('Business ID: ', business_id);
  // console.log('Date: ', appointment_date);
  // console.log('m_service: ', m_service);

    
    console.log("Business Id 2 :",business_id);
     // Insert details in db
    const results = await db.query(
      "INSERT INTO appointment_list(business_id, m_service, appointment_date, time_slot) values ($1, $2, $3, $4) returning *", [business_id, m_service, appointment_date, time_slot ]);
    console.log("Results",results.rows[0]);

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







// disable dates 
router.get("/api/v1/business/:id/appointment", async (req, res) => {
  try{

    const business_id = "1";

    // Check if Time Slot already exists (if so, throw error)
    // Select appointment_date WHERE business_id = $1 * FROM appointment_list
    // const fetchDate = await db.query("SELECT * FROM appointment_list WHERE business_id = $1 and appointment_date = $2", 
    const fetchDate = await db.query("SELECT appointment_date from appointment_list WHERE business_id = $1", 
    [business_id]);
    console.log(fetchDate.rows);

    res.status(200).json({
      status:"succes",
      data: {
        fetchDate: fetchDate.rows
      },
    });

  }catch(err) {
    console.log(err)
  }
});


// Calendar events
router.get("/api/v1/business/calendar/:id", async (req, res) => {
  const id = req.query.id;
  try{
    const appointments = await db.query("SELECT * FROM appointment_list WHERE business_id = $1", [id]);
    res.status(200).json({
      status: "success",
      appointments: appointments.rows
    });
    // console.log("appointments:",appointments);
  }
  catch(err){
    console.log(err);
  }
});


// get holidays
router.get("/api/v1/business/:id/holiday", async (req, res) => {
  const id = req.query.id;
  //console.log("id:",req);
  //console.log(id);
  try{
    const holidays = await db.query("SELECT * FROM custom_holidays WHERE business_id = $1",[id]);
    //console.log("holidays: ",holidays);

    if(holidays.rows.length > 0){
      res.status(200).json({
        status: "success",
        holidays: holidays.rows[0].dates
      });
    }
  }
  catch(err){
    console.log(err);
  }
}) 

//update custom holidays
router.put("/api/v1/business/:id/holiday", async (req, res) => {
  let {id, custom} = req.body.data;
  console.log(id);
  console.log(custom);
  custom = custom.map(day => ({
    date: new Date(day.date),
    title: day.title
  }));
  custom = custom.map(day => ({
    date: new Date(day.date.getTime() - (day.date.getTimezoneOffset() * 60000)),
    title: day.title
  }))
  console.log(custom);
  try{
    const newHolidays = await db.query("UPDATE custom_holidays SET dates = $1 WHERE business_id = $2", [custom, id])
    console.log(newHolidays);
    res.status(200).json({
      success: "Holidays Successfully updated"
    })
  }
  catch (err) {
    console.log(err);
  }
})


module.exports = router;