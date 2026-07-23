/**
 * Integração com Supabase para sincronização de dados
 * A configuração pública é lida de window.APP_CONFIG
 */

var appConfig = window.APP_CONFIG || {};
var SUPABASE_URL = appConfig.supabaseUrl || '';
var SUPABASE_ANON_KEY = appConfig.supabaseAnonKey || '';
var SUPABASE_STORAGE_KEY = appConfig.supabaseStorageKey || 'atmos-clean-store';

var supabaseClient = null;
var isSupabaseReady = false;
var supabaseConnectionAttempts = 0;
var MAX_CONNECTION_ATTEMPTS = 5;
var keepAliveTimer = null;
var KEEP_ALIVE_INTERVAL_MS = 6 * 60 * 60 * 1000;

function getSupabaseConfigReady() {
  return !!(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function initSupabase() {
  console.log('Iniciando initSupabase...');

  if (typeof supabase === 'undefined') {
    console.error('Supabase JS library não carregada.');
    return false;
  }

  if (!getSupabaseConfigReady()) {
    console.warn('Configuração do Supabase ausente. Crie js/app-config.js ou injete window.APP_CONFIG antes do carregamento.');
    return false;
  }

  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('Cliente Supabase criado');
    }

    checkSupabaseConnection().then(function (isConnected) {
      if (isConnected) {
        isSupabaseReady = true;
        console.log('✅ Supabase conectado');
        startKeepAlive();
      } else {
        console.warn('Falha na conexão inicial. Tentando novamente...');
        retrySupabaseConnection();
      }
    }).catch(function (err) {
      console.error('Erro ao checar conexão (Supabase):', err);
      if (window.location.protocol === 'file:') {
        console.error('ERRO DE SEGURANÇA: acesso via file:// detectado. Use um servidor local ou GitHub Pages.');
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
  supabaseConnectionAttempts += 1;
  setTimeout(function () {
    checkSupabaseConnection().then(function (isConnected) {
      if (isConnected) {
        isSupabaseReady = true;
        startKeepAlive();
      } else {
        retrySupabaseConnection();
      }
    });
  }, 2000);
}

function startKeepAlive() {
  if (keepAliveTimer) return;
  keepAliveTimer = setInterval(function () {
    if (!isSupabaseReady) return;
    pingSupabaseKeepAlive();
  }, KEEP_ALIVE_INTERVAL_MS);
}

function pingSupabaseKeepAlive() {
  if (!supabaseClient || !isSupabaseReady) return false;
  return supabaseClient
    .from('calculator_data')
    .select('key')
    .eq('key', SUPABASE_STORAGE_KEY)
    .maybeSingle();
}

window.saveToSupabase = async function (data) {
  if (!supabaseClient || !isSupabaseReady) {
    console.warn('Supabase não está pronto para salvar');
    return false;
  }

  try {
    var dataToSave = typeof data === 'string' ? JSON.parse(data) : data;
    var payload = {
      key: SUPABASE_STORAGE_KEY,
      value: dataToSave,
      updated_at: new Date().toISOString()
    };

    var result = await supabaseClient.from('calculator_data').upsert(payload, { onConflict: 'key' });
    if (result && result.error) {
      console.error('Erro ao salvar no Supabase:', result.error);
      return false;
    }

    return true;
  } catch (e) {
    console.error('Erro na função saveToSupabase:', e);
    return false;
  }
};

window.loadFromSupabase = async function () {
  if (!supabaseClient || !isSupabaseReady) return null;

  try {
    var result = await supabaseClient
      .from('calculator_data')
      .select('value')
      .eq('key', SUPABASE_STORAGE_KEY)
      .maybeSingle();

    if (result && result.error) {
      console.error('Erro ao carregar do Supabase:', result.error);
      return null;
    }

    return result && result.data ? result.data.value : null;
  } catch (e) {
    console.error('Erro na função loadFromSupabase:', e);
    return null;
  }
};

window.subscribeToChanges = function (callback) {
  if (!supabaseClient || !isSupabaseReady) return null;

  try {
    return supabaseClient
      .channel('public:calculator_data')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'calculator_data',
        filter: 'key=eq.' + SUPABASE_STORAGE_KEY
      }, function (payload) {
        if (callback && payload.new && payload.new.value) {
          callback(payload.new.value);
        }
      })
      .subscribe();
  } catch (e) {
    console.error('Erro ao assinar mudanças:', e);
    return null;
  }
};

async function checkSupabaseConnection() {
  if (!supabaseClient) return false;
  try {
    var result = await supabaseClient
      .from('calculator_data')
      .select('key')
      .eq('key', SUPABASE_STORAGE_KEY)
      .maybeSingle();

    if (result && result.error) {
      console.error('Erro na conexão com Supabase:', result.error.message || result.error);
      return false;
    }

    return true;
  } catch (e) {
    console.error('Exceção ao checar conexão:', e);
    return false;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSupabase);
} else {
  initSupabase();
}
