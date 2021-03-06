const express = require('express')
const router = express.Router()
const Task = require('../models/taskModel')

router.post('/tasks', (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    isDone: req.body.isDone,
    date: req.body.date,
    subtasks: req.body.subtasks
  })
  task.save((err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send({
        message: `Task with ID_${data._id} saved successfully!`
      })
    }
  })
})

router.get('/tasks', (req, res) => {
  Task.find(
    { isDone: { $eq: false } },
    'title description date subtasks',
    (err, tasks) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({ tasks: tasks })
      }
    }
  ).sort({ _id: -1 })
})

router.get('/archive', (req, res) => {
  Task.find(
    { isDone: { $eq: true } },
    'title description date',
    (err, tasks) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({ tasks: tasks })
      }
    }
  ).sort({ _id: -1 })
})

router.get('/tasks/:id', (req, res) => {
  Task.findById(req.params.id, 'title description date subtasks', (err, task) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(task)
    }
  })
})

router.put('/tasks/:id', (req, res) => {
  Task.findById(
    req.params.id,
    'title description isDone date subtasks',
    (err, task) => {
      if (err) {
        console.log(err)
      } else {
        if (req.body.title) {
          task.title = req.body.title
        }
        if (req.body.description) {
          task.description = req.body.description
        }
        if (req.body.isDone) {
          task.isDone = req.body.isDone
        }
        if (req.body.date) {
          task.date = req.body.date
        }
        if (req.body.subtasks) {
          task.subtasks = req.body.subtasks
        }
        task.save(err => {
          if (err) {
            res.sendStatus(500)
          } else {
            res.sendStatus(200)
          }
        })
      }
    }
  )
})

router.delete('/tasks/:id', (req, res) => {
  Task.remove({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router
