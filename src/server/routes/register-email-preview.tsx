import React from "react";
import ReactDOMServer from "react-dom/server";
import { Express } from "express";
import { ResetPassword } from "../../email/templates/ResetEmail";
import { HttpStatusCode } from "../common/http-status-code";

const templates = {
  "reset-password": ResetPassword,
};

export type Templates = typeof templates;
type TemplateType = keyof Templates;

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = templates[template as TemplateType] as any;
    const props = req.query;

    res.send(ReactDOMServer.renderToString(<Component {...props} />));
  });
};
