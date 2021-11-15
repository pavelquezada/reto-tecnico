'use strict';

var aws = require('aws-sdk');
const uuid = require('uuid');
const axios = require('axios');
var region = process.env.region;
const db = new aws.DynamoDB.DocumentClient({
    region: region,
    apiVersion: '2012-08-10'
});

const tablas = require('../common/constants/Tablas');
const urls = require('../common/constants/Endpoints');
const HTTPStatus = require('../common/constants/HTTPStatus');
var utils = require('../common/utils/Utils');

module.exports.itemsFromStarWarsAPI = async (event, context, callback) => {
    
    let dataFromStarWarsAPI = null;
    
    var configStarWarsAPI = {
        method: 'GET',
        url: urls.URL_STAR_WARS_API
    };

    //Obtener data desde SWAPI
    await axios(configStarWarsAPI)
    .then(res => {
        dataFromStarWarsAPI = res.data;

        const starWarsToDB = {
            id: uuid.v4(),
            createdAt: new Date().toISOString(),

            nombre: dataFromStarWarsAPI.name,
            periodoRotacion: dataFromStarWarsAPI.rotation_period,
            periodoOrbital: dataFromStarWarsAPI.orbital_period,
            diametro: dataFromStarWarsAPI.diameter,
            clima: dataFromStarWarsAPI.climate,
            gravedad: dataFromStarWarsAPI.gravity,
            terreno: dataFromStarWarsAPI.terrain,
            superficieAgua: dataFromStarWarsAPI.surface_water,
            poblacion: dataFromStarWarsAPI.population,
            residentes: dataFromStarWarsAPI.residents,
            peliculas: dataFromStarWarsAPI.films,
            creado: dataFromStarWarsAPI.created,
            editado: dataFromStarWarsAPI.edited,
            url: dataFromStarWarsAPI.url
        };

        //Guardar data en DB
        const params = {
            TableName: tablas.STARWARSDB_TABLE,
            Item: starWarsToDB
        };
        
        return db.put(params)
            .promise()
            .then(() => {
                console.log('guardando en BD');
                callback(null, utils.response(HTTPStatus.STATUS_CREATED, starWarsToDB));
            })
            .catch(
                err => callback(null, utils.response(err.statusCode, err))
            );
    })
    .catch(err => {
        err => callback(null, utils.response(err.statusCode, err))
    });
}

module.exports.getAllStarWarsItems = (event, context, callback) => {

    const params = {
        TableName: tablas.STARWARSDB_TABLE
    }

    return db.scan(params)
        .promise()
        .then(res =>{
            callback(null, utils.response(HTTPStatus.STATUS_OK, res.Items));
        })
        .catch(
            err => callback(null, utils.response(err.statusCode, err))
        );
}