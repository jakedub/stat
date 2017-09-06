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
router.route('/activities/{id}')
.get(function(req,res){
  let id = req.params.id;
  models.Activity.findById(id).then(function(activity){
    res.send(activity);
  })
})

// PUT	/activities/{id}	Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
router.route('/activities/{id}')
.put(function(req, res){
  let id = req.params.id;
  let update = {
    activity.name = req.body.name
  }
  models.Activity.findById(id).then(function(activity){
    models.Activity.save(update).then(function(update){
      res.send(update);
    })
  })
})


// DELETE	/activities/{id}	Delete one activity I am tracking. This should remove tracked data for that activity as well.
//Likely needs to do a "where: {activity_id: req.params.activity_id}"
router.route('/activities/{id}')
.delete(function(req,res){
  models.Activity.delete({activity_id: req.params.activity_id}).then(function(err, activity){
    if (err){
      res.send(err);
    } else {
      res.json({message: 'Activity deleted'});
    }
  })
})
// POST	/activities/{id}/stats	Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.
router.route('/activities/{id}/stats')
.post(function(req,res){
  let id = req.params.id;
  let tracked = {
    activity.name = req.body.name,
    activity.performance = req.body.performance,
    activity.date = req.body.date
  }
  models.Activity.findById(id).then(function(err, activity){
    if (err){
      res.send(err);
    } else {
      res.json({message: 'Added tracked data for a day'})
    }
  })
})


// DELETE	/stats/{id}	Remove tracked data for a day.
//currently set to id. Needs to be id and date.
router.route('stats/{id}')
.delete(function (req,res){
  let id = req.params.id;
  let tracked = {
    activity.name = req.body.name,
    activity.performance = req.body.performance,
    activity.date = req.body.date
  }
  models.Activity.findById(id).then(function(err, activity){
    if (err){
      res.send(err);
    } else {
      models.Activity.delete(tracked).then(function(activity){
        res.json({message: 'Tracked activity deleted'})
      })
    }
  })

})



router.use('/api', router);

module.exports = router;
