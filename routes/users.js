var express = require('express');
var router = express.Router();

var express = require('express')
var cors = require('cors')


router.use(cors())

const users = [
  {userId: 1, name: 'John', age: 20},
  {userId: 2, name: 'Mary', age: 30},
  {userId: 3, name: 'Mike', age: 40},
  {userId: 4, name: 'Adam', age: 50}
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json(users);
});

router.get('/:userId', function(req, res, next) {
  const userId = req.params.userId;
  console.log("userId", userId);
  const user = users.find(user => user.userId == userId);
  res.status(200).json(user);
});

router.post("/", function(req, res, next) {
  const user = {
    userId: users.length + 1,
    name: req.body.name,
    age: req.body.age
  }
  users.push(user);
  res.status(200).json(user);
});

module.exports = router;
