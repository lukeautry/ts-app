import React from "react";
import { Api } from "../api/api";

interface IAppState {
  users?: Api.IUser[];
}

export class App extends React.Component<{}, IAppState> {
  constructor(public readonly props: {}) {
    super(props);
    this.state = {};
    this.load();
  }

  public render() {
    if (!this.state.users) {
      return <div>Loading...</div>;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Date Created</th>
            <th>Date Updated</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((w) => {
            return (
              <tr key={w.id}>
                <td>{w.id}</td>
                <td>{w.email}</td>
                <td>{w.name}</td>
                <td>{w.date_created}</td>
                <td>{w.date_updated}</td>
                <td>{w.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  private async load() {
    const users = await new Api.UsersService().get();
    this.setState({ users });
  }
}
