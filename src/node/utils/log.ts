import chalk from "chalk";

export type MessageType = "pending" | "success" | "error" | "custom";

interface ILogOptions {
  type: MessageType;
}

const icons: Record<MessageType, string> = {
  pending: "⌛",
  success: "✓",
  error: "☓",
  custom: "",
};

const colors: Record<MessageType, chalk.Chalk> = {
  pending: chalk.grey,
  success: chalk.greenBright,
  error: chalk.redBright,
  custom: chalk.white,
};

const getIconContent = (type: MessageType) =>
  type === "custom" ? "" : `${icons[type]} `;

const _log = (message: unknown, options: ILogOptions) =>
  console.log(
    colors[options.type](
      `${getIconContent(options.type)}${
        typeof message === "object" ? JSON.stringify(message) : message
      }`
    )
  );

export const log = {
  pending: (message: unknown) => _log(message, { type: "pending" }),
  success: (message: unknown) => _log(message, { type: "success" }),
  error: (message: unknown) => _log(message, { type: "error" }),
  custom: (message: unknown) => _log(message, { type: "custom" }),
};
