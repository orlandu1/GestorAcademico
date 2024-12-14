const fetchDisciplinas = async () => {
    try {
        const response = await fetch("/db/buscar_disciplinas.php ");

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
        throw error;
    }
};
export default fetchDisciplinas;