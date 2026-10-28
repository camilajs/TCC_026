
const { createClient } = require('@supabase/supabase-js');

async function login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            erro: 'Informe o e-mail e a senha'
        });
    }

    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false
            }
        }
    );

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if (error) {
            return res.status(401).json({
                erro: 'E-mail ou senha incorretos'
            });
        }

        const { data: usuario, error: erroPerfil } = await supabase
            .from('usuarios')
            .select('id, nome, email, tipo_usuario')
            .eq('id', data.user.id)
            .single();

        if (erroPerfil || !usuario) {
            console.error('Erro ao buscar perfil:', erroPerfil);

            return res.status(403).json({
                erro: 'Perfil de usuário não encontrado',
                detalhe: erroPerfil?.message
            });
        }

        return res.json({
            mensagem: 'Login realizado com sucesso',
            usuario: usuario,
            token: data.session.access_token
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro interno ao realizar login'
        });
    }
}

module.exports = { login };