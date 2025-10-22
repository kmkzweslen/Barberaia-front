import { ofetch } from 'ofetch'

export const api = ofetch.create({
    baseURL: 'https://barbearia-backend-x0st.onrender.com/api',

    async onResponseError({ response }) {
        console.error('Erro na requisição API:', response._data)

        if (response.status === 503) {
            alert("O servidor da API está `hibernando` (plano gratuito). A primeira requisição pode demorar até 50 segundos. Tente novamente em um minuto.")
        }
    }  
})