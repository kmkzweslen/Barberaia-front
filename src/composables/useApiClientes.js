import { useFetch } from '@vueuse/core'
import { api } from '@/utils/api'

export function useApiClientes() {

    const criarCliente = async (dadosCliente) => {
        try {
            const { data, error } = await useFetch('/criarCliente', {
                fetch: api,
                method: 'POST',
                body: dadosCliente
            }).json()

            if (error.value) throw (error.value)
            return { data: data.value, error: null }
        } catch (err) {
            return { data: null, error: err.data || err }
        }
    }

    const editarCliente = async (dadosClienteAtualizados) => {
        try {
            const { data, error } = await useFetch('/atualizarCliente', {
                fetch: api,
                method: 'PUT',
                body: dadosClienteAtualizados
            }).json()

            if (error.value) throw (error.value)
            return { data: data.value, error: null }
        } catch (err) {
            return { data: null, error: err.data || err }
        }
    }

    const excluirCliente = async (email) => {
        try {
            const { error } = await useFetch('/deletarCliente', {
                fetch: api,
                method: 'DELETE',
                params: { email: email}
            })

            if (error.value) throw (error.value)
            return { success: true, error: null }
        } catch (err) {
            return { success: false, error: err.data || err }
        }
    }

    const buscarCliente = async (email) => {
        try {
            const { data, error } = await useFetch('/buscarCliente', {
                fetch: api,
                method: 'GET',
                params: { email: email }
            }).json()

            if (error.value) throw (error.value)
            return { data: data.value, error: null }
        } catch (err) {
            return { data: null, error: err.data || err }
        }
    }

    return {
        criarCliente,
        editarCliente,
        excluirCliente,
        buscarCliente
    }
}