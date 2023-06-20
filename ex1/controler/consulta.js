var Consulta = require('../models/consulta')

// Consulta list
module.exports.list = () =>{
    return Consulta.find()
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.getConsulta = id =>{
    return Consulta.findOne({_id:id})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.listIdade = idade =>{
    return Consulta.find({idade: { $gte: idade } })
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.listSexo = sexo =>{
    return Consulta.find({sexo: sexo })
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.listNomes = () =>{
    return Consulta.distinct("nome").sort()
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.listOperacoes = () => {
    return Consulta.aggregate([
      { $unwind: "$operacoes" },
      { $group: { _id: "$operacoes.codigo", operacoes: { $first: "$operacoes" } } },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, operacoes: { $objectToArray: "$operacoes" } } },
      { $project: { operacoes: { $arrayToObject: "$operacoes" } } }
    ])
      .then(dados => {
        const tuples = dados.map(item => Object.values(item.operacoes));
        return tuples;
      })
      .catch(erro => {
        return erro;
      });
  };


module.exports.addConsulta = (consulta) => {
    return Consulta.collection.insertOne(consulta)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
  }

module.exports.editConsulta = (id,consulta)=>{
    return Consulta.updateOne({_id:id},consulta)
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.deleteConsulta = id =>{
    return Consulta.deleteOne({_id:id})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}
