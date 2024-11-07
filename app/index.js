import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {methods  as authentication} from './controlers/authentication.controller.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Server
const app = express()
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en el puerto",app.get("port"));

// Config
app.use(express.static(__dirname + "/public"));
app.use(express.json());

// Rutas
app.get("/", (req,res) => res.sendFile(__dirname + "/pages/login.html"))
app.get("/register", (req,res) => res.sendFile(__dirname + "/pages/register.html"))
app.get("/admin", (req,res) => res.sendFile(__dirname + "/pages/admin/admin.html"))
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);