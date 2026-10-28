async function api(){

    const response = await fetch(`http://localhost:8080/produtos`);
    if(!response.ok) throw new Error('Erro' + response.status);
    return response.json();

}