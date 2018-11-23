// interface IDockerCompose {
//   upAll(options: IDockerComposeOptions): Promise<IDockerComposeResult>;
//   upMany(options: IDockerComposeOptions): Promise<IDockerComposeResult>;
//   upOne(options: IDockerComposeOptions): Promise<IDockerComposeResult>;
//   kill(options: IDockerComposeOptions): Promise<IDockerComposeResult>;
//   down(options: IDockerComposeOptions): Promise<IDockerComposeResult>;
//   stop(options: IDockerComposeOptions): Promise<IDockerComposeResult>;
//   rm(options: IDockerComposeOptions): Promise<IDockerComposeResult>;
//   exec(options: IDockerComposeOptions): Promise<IDockerComposeResult>;
//   run(options: IDockerComposeOptions): Promise<IDockerComposeResult>;
//   buildAll(options: IDockerComposeOptions): Promise<IDockerComposeResult>;
//   buildMany(options: IDockerComposeOptions): Promise<IDockerComposeResult>;
//   buildOne(options: IDockerComposeOptions): Promise<IDockerComposeResult>;
// }

// interface IDockerComposeOptions {
//   cwd: string;
//   config?: string | string[];
//   log?: boolean;
// }

// interface IDockerComposeResult {
//   out: string;
//   err: string;
// }

// // tslint:disable-next-line
// export const dockerCompose: IDockerCompose = require("docker-compose");
