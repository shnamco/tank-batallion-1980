export class AuthService {
  private static __instance: AuthService | undefined;
  private _auth = true;

  constructor() {
    if (AuthService.__instance) {
      return AuthService.__instance;
    }

    AuthService.__instance = this;
  }

  public set auth(state: boolean) {
    this._auth = state;
  }

  public get auth(): boolean {
    return this._auth;
  }
}
