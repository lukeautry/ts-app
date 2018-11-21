import { Get, Route, Tags } from "tsoa";
import { ServerError } from "../utils/server-error";

export interface IWidget {
  id: number;
  label: string;
  color: string;
}

const widgets: IWidget[] = [
  {
    color: "blue",
    id: 1,
    label: "first widget",
  },
];

@Route("widgets")
export class WidgetsController {
  @Get()
  @Tags("Widgets")
  public async GetWidgets(): Promise<IWidget[]> {
    return widgets;
  }

  @Get("{id}")
  @Tags("Widgets")
  public async GetWidget(id: number): Promise<IWidget> {
    const widget = widgets.find((w) => w.id === id);
    if (!widget) {
      throw new ServerError(`no widget found with id ${id}`);
    }

    return widget;
  }
}
