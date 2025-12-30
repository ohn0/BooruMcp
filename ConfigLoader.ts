export class ConfigLoader {
    readonly fileName : string = "booruConfigs.json";
    configFile : any = {};
    constructor(){
        try {
            this.configFile = Bun.file(this.fileName);
        } catch (error) {
            console.log(`unable to read file ${this.fileName}`);            
        }
    }

    public async retrieveConfiguration(key : string){
        return await this.configFile.json()[key];
    }
}