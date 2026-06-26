/**
 * Integração com Supabase para sincronização de dados
 * Versão simplificada: Salva apenas na nuvem
 */

// Configuração do Supabase
const SUPABASE_URL = 'https://ylctxcvzqlmmczzfzech.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_z_roWQ0ecyPl4BUjruI8Ow_2_3r9uRS';
const SUPABASE_STORAGE_KEY = 'atmos-clean-store';

// Cliente Supabase
let supabaseClient = null;
let isSupabaseReady = false;
let supabaseConnectionAttempts = 0;
const MAX_CONNECTION_ATTEMPTS = 5;

/**
 * Inicializa o cliente Supabase
 */
function initSupabase() {
  console.log('Iniciando initSupabase...');
  if (typeof supabase === 'undefined') {
    console.error('Supabase JS library não carregada.');
    return false;
  }
  
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('Cliente Supabase criado');
    }
    
    checkSupabaseConnection().then(isConnected => {
      if (isConnected) {
        isSupabaseReady = true;
        console.log('✅ Supabase conectado');
      } else {
        console.warn('Falha na conexão inicial (pode ser bloqueio de Tracking Prevention). Tentando novamente...');
        retrySupabaseConnection();
      }
    }).catch(err => {
      console.error('Erro ao checar conexão (Supabase):', err);
      // Se falhar por bloqueio de origem ou tracking, avisar no console
      if (window.location.protocol === 'file:') {
        console.error('ERRO DE SEGURANÇA: Acesso via file:// detectado. O Supabase e o armazenamento do navegador são bloqueados por padrão em arquivos locais. Por favor, use um servidor local (Live Server) ou hospede no GitHub Pages.');
      }
      retrySupabaseConnection();
    });
    
    return true;
  } catch (e) {
    console.error('Erro ao inicializar Supabase:', e);
    return false;
  }
}

function retrySupabaseConnection() {
  if (supabaseConnectionAttempts >= MAX_CONNECTION_ATTEMPTS) return;
  supabaseConnectionAttempts++;
  setTimeout(() => {
    checkSupabaseConnection().then(isConnected => {
      if (isConnected) {
        isSupabaseReady = true;
      } else {
        retrySupabaseConnection();
      }
    });
  }, 2000);
}

/**
 * Salva os dados exclusivamente no Supabase
 */
async function saveToSupabase(data) {
  if (!supabaseClient || !isSupabaseReady) {
    console.warn('Supabase não está pronto para salvar');
    return false;
  }
  
  try {
    const dataToSave = typeof data === 'string' ? JSON.parse(data) : data;
    
    // Upsert (atualiza se a chave existir, senão insere)
    // Garantimos que estamos salvando o objeto completo {data, quote, sim}
    const { error } = await supabaseClient
      .from('calculator_data')
      .upsert({
        key: SUPABASE_STORAGE_KEY,
        value: dataToSave,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });
    
    if (error) {
      console.error('Erro ao salvar no Supabase:', error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error('Erro na função saveToSupabase:', e);
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
      .maybeSingle();
    
    if (error) {
      console.error('Erro ao carregar do Supabase:', error);
      return null;
    }
    
    return data ? data.value : null;
  } catch (e) {
    console.error('Erro na função loadFromSupabase:', e);
    return null;
  }
}

/**
 * Sincroniza dados em tempo real
 */
function subscribeToChanges(callback) {
  if (!supabaseClient || !isSupabaseReady) return null;
  
  try {
    return supabaseClient
      .channel('public:calculator_data')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'calculator_data',
        filter: `key=eq.${SUPABASE_STORAGE_KEY}`
      }, (payload) => {
        if (callback && payload.new && payload.new.value) {
          callback(payload.new.value);
        }
      })
      .subscribe();
  } catch (e) {
    console.error('Erro ao assinar mudanças:', e);
    return null;
  }
}

async function checkSupabaseConnection() {
  if (!supabaseClient) return false;
  try {
    // Tenta uma query simples para verificar se as chaves e a conexão estão ok
    const { data, error } = await supabaseClient.from('calculator_data').select('key').eq('key', SUPABASE_STORAGE_KEY).maybeSingle();
    if (error) {
      console.error('Erro na conexão com Supabase:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error('Exceção ao checar conexão:', e);
    return false;
  }
}

// Inicialização
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSupabase);
} else {
  initSupabase();
}
