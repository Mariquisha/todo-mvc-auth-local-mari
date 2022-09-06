//Trips Controller
const Trip = require('../models/Trip')

module.exports = {
   showTrips: async (req, res) => {
      try {
         let user = req.user.userName;
         let allUserTrips = await Trip.find({
            userId: req.user._id,
         });
         res.render('trips', {
            allUserTrips,
            user
         })
      } catch (err) {
         console.log(err)
      }
   },

   createTrip: async (req, res) => {
      try {
         console.log(req.user._id)
         res.render('createTrip')
      } catch (err) {
         console.log(err)
      }
   },

   createPostTrip: async (req, res) => {
      try {
         await Trip.create({
            tripTitle: req.body.tripTitle,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            dateFrom: req.body.dateFrom,
            dateTo: req.body.dateTo,
            tripMembers: req.body.tripMembers,
            userId: req.user._id,
         });
         console.log("Trip created");
         res.redirect("/trips");
      } catch (err) {
         console.log(err);
         res.render("error/500");
      }
   },

   deleteTrip: async (req, res) => {
      try {
         await Trip.remove({
            _id: req.params.id
         })
         console.log('Trip deleted')
         res.redirect("/trips");
      } catch (err) {
         console.error(err)
         res.render("error/500");
      }
   },

   upVoteTrip: async (req, res) => {
      try {
         await Trip.upVoteTrip({
            _id: req.params.id,
            upVoteTrip: true,
         })
         console.log('Trip up voted')
         res.redirect("/trips");
      } catch (err) {
         console.error(err)
         res.render("error/500");
      }
   },

   downVoteTrip: async (req, res) => {
      try {
         await Trip.downVoteTrip({
            _id: req.params.id,
            downVoteTrip: true,
         })
         console.log('Trip down voted')
         res.redirect("/trips");
      } catch (err) {
         console.error(err)
         res.render("error/500");
      }
   },


}    
