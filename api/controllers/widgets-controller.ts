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

  @Get("{widgetId}")
  @Tags("Widgets")
  public async GetWidget(widgetId: number): Promise<IWidget> {
    const widget = widgets.find((w) => w.id === widgetId);
    if (!widget) {
      throw new ServerError(`no widget found with id ${widgetId}`);
    }

    return widget;
  }
}
