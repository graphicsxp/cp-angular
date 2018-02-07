export class UploadedFile {

    public path: String;
    public name: String;
    public size: number;

    constructor(path: String, name: String, size: number) {
        this.path = path;
        this.name = name;
        this.size = size;
    }
}
