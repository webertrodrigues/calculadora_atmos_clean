/**
 * Integração com Supabase para sincronização de dados
 * Substitui localStorage por sincronização em tempo real
 */

// Configuração do Supabase
const SUPABASE_URL = 'https://ylctxcvzqlmmczzfzech.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_z_roWQ0ecyPl4BUjruI8Ow_2_3r9uRS';
const SUPABASE_STORAGE_KEY = 'atmos-clean-store'; // Renomeado para evitar conflito

// Cliente Supabase
let supabaseClient = null;
let isSupabaseReady = false;

/**
 * Inicializa o cliente Supabase
 */
function initSupabase() {
  if (typeof supabase === 'undefined') {
    console.warn('Supabase JS library não carregada. Usando localStorage.');
    return false;
  }
  
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    isSupabaseReady = true;
    console.log('Supabase inicializado com sucesso');
    return true;
  } catch (e) {
    console.error('Erro ao inicializar Supabase:', e);
    return false;
  }
}

/**
 * Salva os dados no Supabase
 */
async function saveToSupabase(data) {
  if (!supabaseClient || !isSupabaseReady) return false;
  
  try {
    const { data: existingData, error: fetchError } = await supabaseClient
      .from('calculator_data')
      .select('id')
      .eq('key', SUPABASE_STORAGE_KEY)
      .single();
    
    let result;
    
    if (existingData) {
      // Atualizar registro existente
      result = await supabaseClient
        .from('calculator_data')
        .update({
          value: data,
          updated_at: new Date().toISOString()
        })
        .eq('key', SUPABASE_STORAGE_KEY);
    } else {
      // Inserir novo registro
      result = await supabaseClient
        .from('calculator_data')
        .insert([{
          key: SUPABASE_STORAGE_KEY,
          value: data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
    }
    
    if (result.error) {
      console.error('Erro ao salvar no Supabase:', result.error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error('Erro ao salvar dados:', e);
    return false;
  }
}

/**
 * Carrega os dados do Supabase
 */
async function loadFromSupabase() {
  if (!supabaseClient || !isSupabaseReady) return null;
  
  try {
    const { data, error } = await supabaseClient
      .from('calculator_data')
      .select('value')
      .eq('key', SUPABASE_STORAGE_KEY)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Erro ao carregar do Supabase:', error);
      return null;
    }
    
    return data ? data.value : null;
  } catch (e) {
    console.error('Erro ao carregar dados:', e);
    return null;
  }
}

/**
 * Sincroniza dados em tempo real
 */
function subscribeToChanges(callback) {
  if (!supabaseClient || !isSupabaseReady) return null;
  
  const subscription = supabaseClient
    .channel(`public:calculator_data`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'calculator_data',
        filter: `key=eq.${SUPABASE_STORAGE_KEY}`
      },
      (payload) => {
        console.log('Dados atualizados em tempo real:', payload);
        if (callback && payload.new && payload.new.value) {
            callback(payload.new.value);
        }
      }
    )
    .subscribe();
  
  return subscription;
}

/**
 * Verifica se há conexão com Supabase
 */
async function checkSupabaseConnection() {
  if (!supabaseClient) return false;
  
  try {
    // Uma forma mais simples de checar conexão sem depender de auth session
    const { data, error } = await supabaseClient.from('calculator_data').select('id').limit(1);
    return !error;
  } catch (e) {
    return false;
  }
}

// Inicializar Supabase quando o documento carregar
document.addEventListener('DOMContentLoaded', function() {
  initSupabase();
  checkSupabaseConnection().then(isConnected => {
    const indicator = document.getElementById('saveIndicator');
    if (indicator && isConnected) {
      indicator.textContent = '☁️ Conectado à nuvem';
      indicator.classList.add('ok');
    }
  });
});
