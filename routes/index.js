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
//     pass: 'Jashan86990'
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
      // console.log(response.data.data.time[0].day_name);      
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
            user: "deepfilm12@gmail.com",
            pass: "Jashan@123@"
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
  console.log(req.body, "Hello body");
  console.log(req.body.id, "Hello id");

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
  //console.log(req.body);
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





// Login and register (currently unused)
router.get("/users/login",checkAuthenticated, (req, res) => {
  res.render("login");
});

router.get("/users/register",checkAuthenticated, (req,res) => {
  res.render("register")
});

router.get("/users/logout", (req, res) => {
  req.logOut();
  req.flash('sucess_msg', "You have successfully logged out");
  res.redirect("/users/login");
});



//Login with Google or Facebook
router.post("/api/v1/business/social-login", async(req,res)=> {
  console.log("req: ",req);
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
router.post("/api/v1/business/login",function(req,res,next){
  passport.authenticate("local", function(err, user, info) {
    if(err) {
      return next(err);
    }
    if(!user) {
      return res.status(401).json({
        status: "failure",
        redirect: "/login"
      });
    }
    return res.status(200).json({
      status: "success",
      data: user,
      redirect: "/"
    });
  })(req, res, next);
}
);

router.post("/api/v1/business/register", async(req,res) => {
    let {name, email,password,cpassword} = req.body;

    let hashedpassword = await bcrypt.hash(password, 10);
    

    const results = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    console.log(results.rows);

    if(results.rows.length > 0){
      res.json({
        status: "failure",
        data: results.rows[0]
      })
    } else {
      const newUser = await db.query(
        `INSERT INTO users(name, email, password, cpassword)
        VALUES($1, $2, $3, $4)
        `, [name, email, hashedpassword, hashedpassword]
      )
      res.status(200).json({
        status: "success",
        data: newUser.rows,
        redirect: "/api/v1/business/login"
      });
    }
  
})

// Middlewares for redirecting authenticated/unauthenticated users
function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/users/login");
}



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
  try{
    const business_id = 1;
    const m_service = req.body['m_service'];
    const appointment_date = req.body['appointment_date'];
    const time_slot = req.body['time_slot'];
    console.log('test');

    // Check if Time Slot already exists (if so, throw error)
    const time = await db.query("SELECT * FROM appointment_list WHERE business_id = $1 and appointment_date = $2 and time_slot = $3", 
    [business_id, appointment_date,time_slot]);
      
    
  if (time.rows.length > 0) {
      return res.status(204).json({
        status: "204",
        message: "This Time Slot is already Booked!"
      });
    } 
    

  console.log("Time Slot: ",time_slot);
  console.log('Business ID: ', business_id);
  console.log('Date: ', appointment_date);
  console.log('m_service: ', m_service);

    
    console.log("Business Id 2 :",business_id);
     // Insert details in db
    const results = await db.query(
      "INSERT INTO appointment_list(business_id, m_service, appointment_date, time_slot) values ($1, $2, $3, $4) returning *", [business_id, m_service, appointment_date, time_slot ]);
    // console.log("Results",results);

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

    const business_id = "7";

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


















module.exports = router;