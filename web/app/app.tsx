import { observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Api } from "../api/api";

@observer
export class App extends React.Component {
  @observable private widgets?: Api.IWidget[];

  constructor(public readonly props: {}) {
    super(props);
    this.load();
  }

  public render() {
    if (!this.widgets) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.widgets.map((w) => {
          return (
            <div key={w.id}>
              Widget {w.id}
              Color {w.color}
              Label {w.label}
            </div>
          );
        })}
      </div>
    );
  }

  private async load() {
    this.widgets = await new Api.WidgetsService().get();
  }
}
