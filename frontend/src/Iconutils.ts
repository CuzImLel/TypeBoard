export default function getColorById(id:number | undefined):string  {

    if (id == undefined) {
        return "white";
    }

    switch(id) {
        case 1: return "purple"; break;
        case 2: return "yellow"; break;
        case 3: return "green"; break;
        default: return "white"; break;
    }
}