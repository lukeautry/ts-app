import { expect } from "chai";
import { WidgetsController } from "./widgets-controller";

describe("WidgetsController", () => {
  const controller = new WidgetsController();

  it("should return something", async () => {
    const widgets = await controller.GetWidgets();
    expect(widgets.length).to.equal(1);
  });
});
