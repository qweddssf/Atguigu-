import { v4 as uuidv4 } from 'uuid'
const getUUID = () => {
    let uuID = localStorage.getItem('UUID')
    if (!uuID) {
        uuID = uuidv4()
        localStorage.setItem('UUID', uuID)
    }
    return uuID
}
export default getUUID