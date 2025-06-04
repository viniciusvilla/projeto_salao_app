// Aqui fica armazenado o id, a imagem por URL, o titulo e descrição do serviço (Não sei se iremos precisar de descrição mas deixei ai em branco)

import { Service } from "../types/service";

type Data = {
    services: Service[]
};
export const data: Data = {

    services: [
        { id: 1,  image: "https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg", title: "Cabelo", description: "descrição", price: 65.00 },
        { id: 2,  image: "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg", title: "Manicure", description: "descrição", price: 49.99 },
        { id: 3,  image: "https://negociosdebeleza.beautyfair.com.br/wp-content/uploads/2024/08/design-de-sobrancelhas.webp", title: "Sobrancelha", description: "descrição", price: 35.00 },
        
    ]
}