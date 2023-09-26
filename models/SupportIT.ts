import Person from "./Person";

class SupporIT extends Person {
    type: string;
    company: string;
    settle: string;

    constructor(id: number, name: string, birthday: string, address: string, type: string, company: string, settle: string){
        super(id, name, birthday, address);
        this.type = type;
        this.company = company;
        this.settle = settle;
    }
}

export default SupporIT;