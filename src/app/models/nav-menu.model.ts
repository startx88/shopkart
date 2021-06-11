interface INavMenu {
  id: string;
  name: string;
  icon: string;
  url: string;
}

export class NavMenu implements INavMenu {
  constructor(
    public id: string,
    public name: string,
    public icon: string,
    public url: string
  ) {}
}
