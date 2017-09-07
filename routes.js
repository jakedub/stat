const express = require('express');
const router = express.Router();
const models = require("./models");

//test
router.use(function(req, res, next) {
    console.log('Stuff happening here?');
    next();
});

// // GET	/activities	Show a list of all activities I am tracking, and links to their individual pages
// //List of all activities tracking
router.route('/activities')
.get(function(req, res){
  models.Activity.findAll().then(function(err, activity){
    if (err){
      res.send(err);
    } else{
      res.json({activity: activity_id});
    }

  })
})

// // POST	/activities	Create a new activity for me to track.
// //Create new activity to track
router.route('/activities')
.post(function(req, res){
  let newActivity = {
    name: req.body.name,
    performance: req.body.performance,
    date: req.body.date
  }
  models.Activity.create(newActivity).then(function(err, activity){
    if (err){
      res.send(err);
    } else {
      res.json({activity});
    }
  })
})


// // GET	/activities/{id}	Show information about one activity I am tracking, and give me the data I have recorded for that activity.
router.route('/activities/:id')
.get(function(req,res){
  let id = req.params.id;
  models.Activity.findById(id).then(function(activity){
    res.send({activity});
  })
})

// // PUT	/activities/{id}	Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
router.route('/activities/:id')
.put(function(req, res){
  models.Activity.update({
    name: req.body.name
  }, {
    where: {
      id: req.params.id
    }
  }).then(function(update){
    res.json({message:'Updated name'});
  })
})
// // DELETE	/activities/{id}	Delete one activity I am tracking. This should remove tracked data for that activity as well.
router.route('/activities/:id')
.delete(function(req, res){
  models.Activity.destroy({
    where: {
      id: req.params.id
    }}, {
      name: req.body.name,
      performance: req.body.performance,
      date: req.body.date,
      id: req.body.id
    },
  ).then(function(removed){
    res.json({message: 'Deleted'});
  })
})

// // POST	/activities/{id}/stats	Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.
router.route('/activities/:id/stats')
.post(function(req, res){
  models.Activity.create({
    where: {
      date: req.params.date
    }}, {
      name: req.body.name,
      performance: req.body.performance,
      date: req.body.date,
    },
  ).then(function(added){
    res.json({message: 'Added tracked data for the following date: ' + req.body.date});
  })
})

// // DELETE	/stats/{id}	Remove tracked data for a day.
router.route('/stats')
.delete(function(req, res){
  models.Activity.destroy({
    where: {
      date: req.query.date,
    }},
  ).then(function(removed){
    res.json({message: 'Deleted tracked data for a day'});
  })
})



router.use('/api', router);

module.exports = router;
