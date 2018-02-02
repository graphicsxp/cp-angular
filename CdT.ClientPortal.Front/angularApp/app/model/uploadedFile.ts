export class UploadedFile {
    constructor(path: String, name: String, size: number) {
        this.path = path;
        this.name = name;
        this.size = size;
    }

    public path: String;
    public name: String;
    public size: number;
}