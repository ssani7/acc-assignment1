const express = require('express');
const { getRandomUser, getAllUsers, addUser } = require('../../controllers/user.controller');


const router = express.Router();


router
    .route('/all')
    /*
    * @api {get} /user/all All user
    * @apiDescription Get all the user
    * @apiPermission everyone
    *
    *
    * @apiParam  {Number{1-}}         [page=1]     List page
    * @apiParam  {Number{1-100}}      [limit=10]  Users per page
    *
    * @apiSuccess {Object[]} all the user.
   */
    .get(getAllUsers)

router
    .route('/random')
    /*
    * @api {get} /user/:option random user
    * @apiDescription Get random user
    * @apiPermission all
    *
    * @apiSuccess {Object} random user.
   */
    .get(getRandomUser)

router
    .route('/save')
    /*
    * @api {get} /user/:option random user
    * @apiDescription Get random user
    * @apiPermission all
    *
    * @apiSuccess {Object} random user.
   */
    .post(addUser)

router
    .route('/update')
    /*
    * @api {get} /user/:option random user
    * @apiDescription Get random user
    * @apiPermission all
    *
    * @apiSuccess {Object} random user.
   */
    .post(addUser)



module.exports = router;