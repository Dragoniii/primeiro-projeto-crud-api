import Person from "./Person";

class Professional extends Person{
    role: string;
    shift: string;
    sector: string;

    constructor(id: number, name: string, birthday: string, address: string, role: string, shift: string, sector:string,)
    
    
    {
        super(id, name, birthday, address);
        this.role = role;
        this.shift = shift;
        this.sector = sector;
    }
}

export default Professional;