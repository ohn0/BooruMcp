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
        let keyConfig = await this.configFile.json();
        return keyConfig[key];}
}
