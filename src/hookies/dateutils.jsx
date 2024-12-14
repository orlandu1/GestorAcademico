export const calcularDiasRestantes = (dataTarefa) => {
    const hoje = new Date();
    const dataFinal = new Date(dataTarefa);
    const diferenca = dataFinal - hoje;
    const diasRestantes = Math.ceil(diferenca / (1000 * 60 * 60 * 24));

    return diasRestantes > 0 ? diasRestantes : 0;
};

export const converterData = (data) => {
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}