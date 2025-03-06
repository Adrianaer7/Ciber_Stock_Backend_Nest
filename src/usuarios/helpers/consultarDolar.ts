import { environments } from "src/environments/environment"
import { DolarAmbito } from "src/helpers/interfaces"

export const consultarDolar = async () => {
    const respuesta = await fetch(environments.DOLAR_URL)
    const resultado: DolarAmbito = await respuesta.json()
    const valor: any = { precio: Number((resultado.venta).replace(",", ".")), automatico: true }
    return valor
}