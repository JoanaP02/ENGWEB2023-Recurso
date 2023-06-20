var express = require('express');
var router = express.Router();
var Consulta = require('../controler/consulta')

/* GET home page. */
router.get('/consultas', function(req, res, next) {
  if(req.query.idade){
    Consulta.listIdade(req.query.idade)
    .then(consultas=>{
      res.json(consultas)
    })
    .catch(erro=>{
      res.status(601).json({ message: "Erro a obter lista de Consultas",error:erro })
    })
  }
  else if (req.query.sexo){
    Consulta.listSexo(req.query.sexo)
    .then(consultas=>{
      res.json(consultas)
    })
    .catch(erro=>{
      res.status(601).json({ message: "Erro a obter lista de Consultas",error:erro })
    })

  }
  else{
    Consulta.list()
      .then(consultas=>{
        res.json(consultas)
      })
      .catch(erro=>{
        res.status(601).json({ message: "Erro a obter lista de Consultas",error:erro })
      })
  }
});

router.get('/consultas/nomes', function(req, res, next) {
  Consulta.listNomes()
    .then(consulta=>{
      res.json(consulta)
    })
    .catch(erro=>{
      res.status(602).json({ message: "Erro a obter Consulta",error:erro })
    })
});

router.get('/consultas/interv', function(req, res, next) {
  Consulta.listOperacoes()
    .then(consulta=>{
      res.json(consulta)
    })
    .catch(erro=>{
      res.status(602).json({ message: "Erro a obter Consulta",error:erro })
    })
});

router.get('/consultas/:id', function(req, res, next) {
  Consulta.getConsulta(req.params.id)
    .then(consulta=>{
      res.json(consulta)
    })
    .catch(erro=>{
      res.status(602).json({ message: "Erro a obter Consulta",error:erro })
    })
});



router.post('/consultas', function(req, res, next) {
  Consulta.addConsulta(req.body)
    .then(consulta=>{
      res.status(201).json(consulta)
    })
    .catch(erro=>{
      res.status(603).json({ message: "Erro a adicionar Consulta",error:erro })
    })
});

router.put('/consultas/:id', function(req, res, next) {
  Consulta.editConsulta(req.params.id,req.body)
    .then(consulta=>{
      res.json(consulta)
    })
    .catch(erro=>{
      res.status(604).json({ message: "Erro a atualizar Consulta",error:erro })
    })
});

router.delete('/consultas/:id', function(req, res, next) {
  Consulta.deleteConsulta(req.params.id)
    .then(consulta=>{
      res.json(consulta)
    })
    .catch(erro=>{
      res.status(605).json({ message: "Erro a eliminar Consulta",error:erro })
    })
});

module.exports = router;
