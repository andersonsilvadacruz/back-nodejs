const Customers = require("./SchemaCustomers");
const { encrypt, compare } = require("../utils/handlePassword"); 
const { tokenSign} = require("../utils/verifyToken");
const { schemaLogin, schemaRegister } = require("../utils/validate-body");
const jwt = require("jsonwebtoken");




//LOGIN DE CLIENTES
const loginCustomers = async (req, res, next) => {
  try {
    // Validaciones de login
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    //control mail//
    const user = await Customers.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    //control pass//
    const validPassword = await compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Constraseña invalida" });

    const userToken = {
     
      email: user.email,
    };
    
    //firma token//
    const token = await tokenSign(userToken, "5m");
    //res.status(200).json({ message: "User logged in!", JWT: token });
   
    res.header("auth-token", token).json({
      error: null,
      token: token,
      userToken: userToken,
      message: "Bienvenido",
    });
   
  } catch (error) {
    next(error);
  }
};


//CREAR CLIENTE -REGISTRO//
const createCustomers = async (req, res, next) => {
  try {
    //validaciones de registro
    const { error } = schemaRegister.validate(req.body);
    if (error) {return res.status(400).json({ error: error.message});}

    const data = req.body;
    
    //veo si existe mail
    const isEmailExist = await Customers.findOne({ email: req.body.email });
    if (isEmailExist) {return res.status(400).json({ error: "Email ya registrado" });}

    //encripto pass
    const password = await encrypt(req.body.password);
    const newCustomers = await new Customers({ ...data, password });
    if (newCustomers instanceof Error) return next(newCustomers);
    newCustomers.save();

    //respuesta a cliente
    res.status(201).json({ message: "Usuario registrado!" });
  } catch (error) {
    next(error);
  }
};


//LOGAUT//
const logautCustomers = async (req, res, next) => {

  localStorage.removeItem("token")
  res.redirect('/login') 
  

  //window.localStorage.clear()
    

};



//-------------------------------------------CRUD--------------------------------------------------------------------------------------------------------//

//TRAE TODOS LOS CLIENTES//
const getCustomers = (req, res, next) => {
  Customers.find()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => next(error));
};

//TRAE CLIENTE POR ID//
const getCustomersById = async (req, res) => {
  try {
    const userId = await Customers.findById(req.params.id);
    res.json(userId);
  } catch (error) {
    (error) => next(error);
  }
};

//ACTUALIZA CLIENTE//
const updateCustomers = async (req, res) => {
  try {
    const result = await Customers.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); //new //mantiene a la vista el dato editado
    // https://carlosazaustre.es/como-crear-una-api-rest-usando-node-js //
    res.json(result);
  } catch (error) {
    next(error);
  }
};

//ELIMINA CLIENTE//
const deletCustomers = async (req, res) => {
  try {
    const result = await Customers.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};



module.exports = {
  getCustomers,
  getCustomersById,
  createCustomers,
  updateCustomers,
  deletCustomers,
  loginCustomers,
  logautCustomers,
  
};
