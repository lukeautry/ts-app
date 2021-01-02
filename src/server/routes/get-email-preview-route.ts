import { Templates } from "./register-email-preview";

type TemplateParams<T> = T extends React.FC<infer Props> ? Props : never;

export const getEmailPreviewRoute = <K extends keyof Templates>(
  base: string,
  template: K,
  params: TemplateParams<Templates[K]>
) =>
  `${base}/email-preview?template=${template}${Object.entries(params)
    .map(([key, value]) => `&${key}=${value}`)
    .join("")}`;
