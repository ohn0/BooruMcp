export class booruConfig{
    private _API_KEY: string = "";
    private _USER_ID: string = "";
    
    public get API_KEY(): string {
        return this._API_KEY;
    }
    public set API_KEY(value: string) {
        this._API_KEY = value;
    }

    public get USER_ID(): string {
        return this._USER_ID;
    }
    public set USER_ID(value: string) {
        this._USER_ID = value;
    }
}