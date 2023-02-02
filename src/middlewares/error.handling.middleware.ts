import { NextFunction, Request, Response } from "express";

export function handleErros(err, req, res, next) {
  console.log(err, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  if (err.name === "NotFoundError") {
    res.status(404).send(err);
    return;
  }

  if (err.name === "Unprocessable") {
    res.status(422).send(err);
    return;
  }
  //   { name: "NotFoundError", message: "User not found" }

  if (err.name === "ConflictError") {
    res.status(409).send(err);
    return;
  }

  if (err.name === "BadRequest") {
    res.status(400).send(err);
    return;
  }
}

type Erros = {
  name: String;
  message: String;
};
