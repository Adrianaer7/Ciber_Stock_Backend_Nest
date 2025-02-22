import { DolarAmbito } from "src/helpers/interfaces"

export const consultarDolar = async () => {
    const url = "https://mercados.ambito.com//dolar/informal/variacion"
    const respuesta = await fetch(url)
    const resultado: DolarAmbito = await respuesta.json()
    const valor: any = { precio: Number((resultado.venta).replace(",", ".")), automatico: true }
    return valor
}