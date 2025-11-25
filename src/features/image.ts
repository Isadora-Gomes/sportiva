import supabase from "../../supabase";

export class Image {
    readonly dir: string;
    readonly id: string;

    constructor(dir: string, id: string) {
        this.dir = dir;
        this.id = id;
    }

    getUrl() { return supabase.storage.from("imagens").getPublicUrl(this.dir + "/" + this.id).data.publicUrl; }
}