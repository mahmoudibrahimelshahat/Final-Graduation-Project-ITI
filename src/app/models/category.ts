export class Category {
    name: string;
    _id: string;
    checked?: boolean

    constructor(name = '', id = '', checked = false) {
            this.name = name;
            this._id = id;
            this.checked = checked
    }

}

