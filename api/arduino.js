let porta = null;
let pesoBalanca = 0;

window.addEventListener('load', async () => {
    const portas = await navigator.serial.getPorts();
    if (portas.length > 0) await conectarArduino(portas[0]);
});

async function conectarArduino(portaSalva){
    if (porta) return;

    try {
        porta = portaSalva || await navigator.serial.requestPort();
        await porta.open({ baudRate: 9600 });
        lerDados();
    } catch (erro) {
        console.log('Erro ao conectar:', erro);
        porta = null;
    }
}

async function lerDados() {
    const decoder = new TextDecoderStream();
    porta.readable.pipeTo(decoder.writable);
    const leitor = decoder.readable.getReader();

    let buffer = '';
    while (true) {
        const { value, done } = await leitor.read();
        if (done) break;

        buffer += value;
        const linhas = buffer.split('\n');
        buffer = linhas.pop();

        linhas.forEach(linha => {
            const peso = parseFloat(linha);
            if (!isNaN(peso)) pesoBalanca = peso;
        });
    }
}