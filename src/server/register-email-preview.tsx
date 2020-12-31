import React from "react";
import ReactDOMServer from "react-dom/server";
import { Express } from "express";
import { templates } from "../email/templates";
import { HttpStatusCode } from "./common/http-status-code";

export const registerEmailPreview = (app: Express) => {
  app.get("/email-preview", async (req, res) => {
    res.set("Content-Type", "text/html");

    const { template } = req.query;

    if (!template) {
      res.send(Buffer.from("<div>Must provide 'template' parameter</div>"));
      res.sendStatus(HttpStatusCode.BAD_REQUEST);
      return;
    }

    if (typeof template !== "string") {
      res.send(Buffer.from("<div>'template' must be a string</div>"));
      res.sendStatus(HttpStatusCode.BAD_REQUEST);
      return;
    }

    if (!(template in templates)) {
      res.send(
        Buffer.from(
          `<div>'template' must be one of [${Object.keys(templates)
            .map((v) => `"${v}"`)
            .join(",")}]</div>`
        )
      );
      res.sendStatus(HttpStatusCode.BAD_REQUEST);
      return;
    }

    const { component: Component, defaultProps } = templates[
      template as keyof typeof templates
    ];

    res.send(ReactDOMServer.renderToString(<Component {...defaultProps} />));
  });
};
