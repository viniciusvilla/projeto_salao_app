//Funções criadas para realizar as funcionalidades do sistema em relação aos serviços do salão

import { data } from '../data'

export const getAllServices = () =>{
    return data.services
}

export const getServiceById = (id: number) => {
    return data.services.find(item => item.id === id)
}

