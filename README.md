# Atmos Clean — Calculadora de Precificação (Versão Nuvem)

Esta versão foi configurada para salvar dados **exclusivamente no banco de dados Supabase**. O salvamento local (localStorage) foi removido para garantir que todos os usuários vejam sempre os mesmos dados sincronizados.

## Alterações Realizadas
1.  **Salvamento Exclusivo**: As funções de salvamento agora ignoram o `localStorage` e enviam dados diretamente para a tabela `calculator_data` no Supabase.
2.  **Sincronização em Tempo Real**: Qualquer alteração feita por um usuário será refletida automaticamente para outros usuários conectados.
3.  **Bootstrap Seguro**: Ao abrir a calculadora, ela carrega os dados padrão e tenta imediatamente buscar a versão mais recente na nuvem.

## Configuração do Banco de Dados
Certifique-se de que sua tabela no Supabase segue a estrutura abaixo (conforme `SETUP_SUPABASE.sql`):
- Tabela: `calculator_data`
- Colunas:
  - `id`: int8 (Primary Key)
  - `key`: text (Unique) - Valor usado: `atmos-clean-store`
  - `value`: jsonb
  - `created_at`: timestamptz
  - `updated_at`: timestamptz

## Arquivos Modificados
- `js/supabase-integration.js`: Lógica de comunicação simplificada.
- `js/scrypt-modifications.js`: Sobrescrita das funções de sistema para focar na nuvem.
- `js/scrypt.js`: Ajustado para respeitar as funções globais e remover o uso direto de `localStorage`.
