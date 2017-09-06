const express = require('express');
const router = express.Router();
const models = require("./models");

//test
router.use(function(req, res, next) {
    console.log('Stuff happening here?');
    next();
});

// GET	/activities	Show a list of all activities I am tracking, and links to their individual pages
//List of all activities tracking
router.route('/activities')
.get(function(req, res){
  models.Activity.findAll().then(function(err, activity){
    if (err){
      res.send(err);
    } else{
      res.json({activity});
    }

  })
})


// POST	/activities	Create a new activity for me to track.
//Create new activity to track
router.route('/activities')
.post(function(req, res){
  let newActivity = {
    activity.name = req.body.name,
    activity.performance = req.body.performance,
    activity.date = req.body.date
  }
  models.Activity.create({newActivity}).then(function(err, activity){
    if (err){
      res.send(err);
    } else {
      res.json({activity});
    }
  })
})


// GET	/activities/{id}	Show information about one activity I am tracking, and give me the data I have recorded for that activity.


// PUT	/activities/{id}	Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.


// DELETE	/activities/{id}	Delete one activity I am tracking. This should remove tracked data for that activity as well.


// POST	/activities/{id}/stats	Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.



// DELETE	/stats/{id}	Remove tracked data for a day.




router.use('/api', router);

module.exports = router;
