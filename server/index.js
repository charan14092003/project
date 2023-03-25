const express = require("express");
const app = express();

const cookieparser = require("cookie-parser");
app.use(cookieparser());
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");
dotenv.config();

// Swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Morgan
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const port = 9000;

const bodyParser = require("body-parser");
app.use(express.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());

//connect to mongo
mongoose
  .connect(process.env.MONGODB_LINK_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDb  Connected..."))
  .catch((err) => console.log(err));

// Static Files
app.use(express.static("public"));

// Morgan
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

// Implement Swagger

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel API",
      version: "1.0.0",
      description: "Travel API Information",
      contact: {
        name: "Travel API",
      },
      servers: [{
        url: "http://localhost:9000"
      }],
    },
  },
  apis: ["./index.js","./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//routes
app.use("/users", require("./routes/users"));
app.use("/profile", require("./routes/profile"));
app.use("/index", require("./routes/index"));
app.use("/places", require("./routes/places"));
app.use("/book", require("./routes/book"));
app.use("/admins", require("./routes/admins"));
app.use("/payment", require("./routes/payments"));

app.listen(port, function () {
  console.log("server is running on the port 9000");
});


// Swagger Testing --------------------------------------------------------------------------------
/**
 * @swagger
 * /:
 *  get:
 *      summary: This api is used to check if get method is working or not
 *      tags: [Sample]
 *      responses:
 *          200:
 *              description: To test Get Method
 */


// Admin --------------------------------------------------------------------------------------------
/**
 * @swagger
 * /admins/feedbacks:
 *  get:
 *      summary: This api is used to check feedbacks
 *      tags: [Admin]
 *      responses:
 *          200:
 *              description: To test Get Method
 *              content:
 *                  application/json:
 *                    schema: 
 *                     type: object
 *                    properties:
 */

/**
 * @swagger
 * /admins/tours/{id}:
 *  get:
 *      summary: This api is used to check feedbacks
 *      tags: [Admin]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /admins/users:
 *  get:
 *      summary: This api is used to check users in admin
 *      tags: [Admin]
 *      responses:
 *          200:
 *              description: To test Get Method
 *              content:
 *                  application/json:
 *                    schema: 
 *                     type: object
 *                    properties:
 */


/**
 * @swagger
 * /admins/delete/{id}:
 *  delete:
 *      summary: Delete a user by ID
 *      description: Deletes a single user by ID
 *      tags: [Admin]
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID of the user
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: User Deleted
 *          500:
 *              description: Error
 * 
 */


// Book --------------------------------------------------------------------------------------------
/**
 * @swagger
 * /book/booking/{id}:
 *  get:
 *      summary: This api is used to check feedbacks
 *      tags: [Book]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /book/book/{id}:
 *  get:
 *      summary: This api is used to check feedbacks
 *      tags: [Book]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */


// index --------------------------------------------------------------------------------------------
/**
* @swagger
* /index/fd:
*  post:
*     summary: used to insert data to mongodb
*     tags: [Index]
*     requestBody:
*         required: true
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     properties:
*                         username:
*                             type: string
*                         fdbk:
*                             type: string
*     responses:
*         200:
*             description: Added Successfully
*         404:
*             description: Not Found
*         500:
*             description: Internal Server Error
*/


// payment--------------------------------------------------------------------------------------------
/**
 * @swagger
 * /payment/pay/{id}:
 *  get:
 *      summary: This api is used to check feedbacks
 *      tags: [Payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /payment/mybookings/{id}:
 *  get:
 *      summary: This api is used to check feedbacks
 *      tags: [Payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
* @swagger
* /payment/post/{id}:
*  post:
*     summary: used to insert data to mongodb
*     tags: [Payment]
*     parameters:
*          - in: path
*            name: id
*            required: true;
*            description:  String
*            schema:
*               type: string
*     requestBody:
*         required: true
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     properties:
*                         username:
*                             type: string
*                         number:
*                             type: string
*                         name:
*                             type: string
*                         expmonth:
*                             type: string
*                         expyear:
*                             type: string
*                         cvv:
*                             type: string
*     responses:
*         200:
*             description: Added Successfully
*         404:
*             description: Not Found
*         500:
*             description: Internal Server Error
*/

/**
 * @swagger
 * /payment/getTransactions/{id}:
 *  get:
 *      summary: This api is used to check feedbacks
 *      tags: [Payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */


// places--------------------------------------------------------------------------------------------

/**
 * @swagger
 * /places/places/{id}:
 *  get:
 *      summary: This api is used to check feedbacks
 *      tags: [Places]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /places/placedetails/{id}:
 *  get:
 *      summary: This api is used to check feedbacks
 *      tags: [Places]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

// profile--------------------------------------------------------------------------------------------
/**
* @swagger
* /profile/edit:
*  post:
*     summary: This is used to edit profile
*     tags: [Profile]
*     requestBody:
*         required: true
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     properties:
*                         username:
*                             type: string
*                         name:
*                             type: string
*                         phonenumber:
*                             type: string
*                         gender:
*                             type: string
*                         email:  
*                             type: string
*     responses:
*         200:
*             description: Added Successfully
*         404:
*             description: Not Found
*         500:
*             description: Internal Server Error
*/

/**
* @swagger
* /profile/changepass:
*  post:
*     summary: This is used to change password
*     tags: [Profile]
*     requestBody:
*         required: true
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     properties:
*                         email:  
*                             type: string
*                         oldpassword:
*                             type: string
*                         newpassword:
*                             type: string
*     responses:
*         200:
*             description: Added Successfully
*         404:
*             description: Not Found
*         500:
*             description: Internal Server Error
*/

/**
* @swagger
* /profile/remove:
*  post:
*     summary: This is used to remove profile image 
*     tags: [Profile]
*     requestBody:
*         required: true
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     properties:
*                         email:  
*                             type: string
*     responses:
*         200:
*             description: Added Successfully
*         404:
*             description: Not Found
*         500:
*             description: Internal Server Error
*/

/**
* @swagger
* /profile/feedback:
*  post:
*     summary: This is used to change feedback from profile page
*     tags: [Profile]
*     requestBody:
*         required: true
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     properties:
*                         username:  
*                             type: string
*                         feedback:
*                             type: string
*     responses:
*         200:
*             description: Added Successfully
*         404:
*             description: Not Found
*         500:
*             description: Internal Server Error
*/

/**
 * @swagger
 * /profile/deletefeedback/{id}:
 *  delete:
 *      summary: Delete a user by ID
 *      description: Deletes a single user by ID
 *      tags: [Profile]
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID of the user
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: User Deleted
 *          500:
 *              description: Error
 * 
 */


// users--------------------------------------------------------------------------------------------

/**
 * @swagger
 * /users/loguser/{id}:
 *  get:
 *      summary: This api is used to check feedbacks
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
* @swagger
* /users/login:
*  post:
*     summary: used to insert data to mongodb
*     tags: [Users]
*     requestBody:
*         required: true
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     properties:
*                         username:
*                             type: string
*                         password:
*                             type: string
*     responses:
*         200:
*             description: Added Successfully
*         404:
*             description: Not Found
*         500:
*             description: Internal Server Error
*/



