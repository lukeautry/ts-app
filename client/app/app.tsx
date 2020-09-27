import React from "react";
import { Api } from "../api/api";

interface IAppState {
  widgets?: Api.IWidget[];
}

export class App extends React.Component<{}, IAppState> {
  constructor(public readonly props: {}) {
    super(props);
    this.state = {};
    this.load();
  }

  public render() {
    if (!this.state.widgets) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.state.widgets.map((w) => {
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
    const widgets = await new Api.WidgetsService().get();
    this.setState({ widgets });
  }
}
