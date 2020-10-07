import express from "express";
import request from "supertest";
import { registerRoutes } from "../register-routes";

export const getTestServer = (): request.SuperTest<request.Test> => {
  const app = express();

  registerRoutes(app);

  return request(app);
};
