import { Router } from "express";
import { success } from "../../../network/response.js";
import {getData}  from "../../../model/db.js";
import { getUser } from "../../../model/users.js";
import cors from "cors";

const router = Router();

router.use(cors());

router.get("/list", async function (req, res) {
  const client = await getData();

  const query_request = {
    text: "SELECT * FROM dbl_usersdb",
  };

  client
    .query(query_request)
    .then((r) => {
      success(req, res, r, 200);
    })
    .catch((e) => {
      success(req, res, e.stack, 200);
    });
});

router.post("/register", async function (req, res) {
  //Realizar conexion a DB

  const client = await getData();

  let username = req.query.username;
  let email = req.query.email;
  let password = req.query.password;
  let phone_number = req.query.phone_number;

  const query_request = {
    text: "INSERT INTO dbl_usersdb(username, email, password, phone_number) VALUES ($1, $2, $3, $4)",
    values: [username, email, password, phone_number],
  };

  client
    .query(query_request)
    .then((r) => {
      success(req, res, r, 200);
    })
    .catch((e) => {
      success(req, res, e.stack, 200);
    });
});

router.delete("/delete", async function (req, res) {
  const client = await getData();

  let id = req.query.id;

  const query_request = {
    text: `DELETE FROM dbl_usersdb WHERE id = ${id}`,
  };

  client
    .query(query_request)
    .then((r) => {
      success(req, res, r, 200);
    })
    .catch((e) => {
      success(req, res, e.stack, 200);
    });
});

router.put("/update", async function (req, res) {
  const client = await getData();

  let id = req.query.id;
  let username = req.query.username;
  let email = req.query.email;
  let password = req.query.password;
  let phone_number = req.query.phone_number;

  const query_request = {
    text: `UPDATE dbl_usersdb SET username = $1, email = $2, password = $3, phone_number = $4 WHERE id = $5`,
    values: [username, email, password, phone_number, id],
  };

  client
    .query(query_request)
    .then((r) => {
      success(req, res, r, 200);
    })
    .catch((e) => {
      success(req, res, e.stack, 200);
    });
});

router.get("/all_users", async function (req, res) {
  getUser
    .findAll({ attributes: ["name"] })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.post("/create_users_orm", async function (req, res) {
  getUser
    .create({
      id: req.query.id,
      username: req.query.username,
      email: req.query.email,
      password: req.query.password,
      phone_number: req.query.phone_number,
    })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.put("/update_users_orm", async function (req, res) {
  let id = req.query.id;
  let newDato = req.query;
  getUser
    .findOne({
      where: { id: id },
    })
    .then((users) => {
       res.sendStatus(200);
      users.update(newDato);
    });
});


router.delete("/delete_users_orm/:id", async function (req, res) {
  getUser
    .findByPk(req.params.id)
    .then(function (users) {
      users.destroy();
    })
    .then((users) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
});


export default router;
 