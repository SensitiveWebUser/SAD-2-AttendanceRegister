export class Module {
  private _moduleId: string;
  private _moduleName: string;
  private _moduleLeaderId: string;

  constructor({ moduleId, moduleName, moduleLeaderId }: constructorParams) {
    this._moduleId = moduleId;
    this._moduleName = moduleName;
    this._moduleLeaderId = moduleLeaderId;
  }

  public getmoduleId() {
    return this._moduleId;
  }

  public getmoduleName() {
    return this._moduleName;
  }

  public getmoduleLeaderId() {
    return this._moduleLeaderId;
  }

  public setmoduleName(moduleName: string) {
    if (moduleName && moduleName.length > 0 && moduleName.length <= 20)
      this._moduleName = moduleName;
  }

  public setmoduleLeaderId(moduleLeaderId: string) {}
}

interface constructorParams {
  moduleId: string;
  moduleName: string;
  moduleLeaderId: string;
}
