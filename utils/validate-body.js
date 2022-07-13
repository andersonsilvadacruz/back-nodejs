const Joi = require("@hapi/joi");
const { id } = require("@hapi/joi/lib/base");

const schemaRegister = Joi.object({
  email: Joi.string()
    .min(6)
    .max(255)
    .required()
    .email()
    .error(new Error("Email  invalidos")),
  password: Joi.string()
    .min(6)
    .max(1024)
    .required()
    .error(new Error("El password debe tener minimo 6 caracteres")),
});

// Esquema del login
const schemaLogin = Joi.object({
  email: Joi.string()
    .min(6)
    .max(255)
    .required()
    .email()
    .error(new Error("Email o password invalidos")),
  password: Joi.string()
    .min(6)
    .max(1024)
    .required()
    .error(new Error("Email o password invalidos")),
});
//Esquema de post
const schemaPost = Joi.object({
  _id: Joi.string(),
  title: Joi.string()
    .min(6)
    .max(255)
    .required()
    .error(new Error("El titulo debe tener  minimo 6 caracteres")),


  body: Joi.string()
    .min(6)
    .max(1024)
    .required()
    .error(new Error("Contenido debe tener  minimo 20 caracteres")),
});

module.exports = { schemaLogin, schemaRegister, schemaPost };
