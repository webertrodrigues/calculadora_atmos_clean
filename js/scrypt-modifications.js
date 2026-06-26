/**
 * Modificações para integrar Supabase com o scrypt.js
 * Versão corrigida para evitar travamento no carregamento
 */

// Armazenar as funções originais (se existirem)
const originalSaveStore = window.saveStore;
const originalLoadStore = window.loadStore;

/**
 * Nova função saveStore que usa Supabase com fallback para localStorage
 */
window.saveStore = function(show) {
  if (show === void 0) { show = true; }
  try {
    // Garantir que o store está normalizado
    if (typeof normalizeSim === 'function' && typeof store !== 'undefined' && store.data) {
        store.sim = normalizeSim(store.sim, store.data);
    }
    
    if (typeof store !== 'undefined') {
        const storeData = JSON.stringify(store);
        
        // Salvar localmente imediatamente usando a chave do scrypt.js
        if (typeof STORAGE_KEY !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, storeData);
        }
        
        // Tentar salvar no Supabase (assincronamente)
        if (typeof isSupabaseReady !== 'undefined' && isSupabaseReady && supabaseClient) {
          saveToSupabase(store).then(success => {
              if (success) {
                  if (typeof setSave === 'function') setSave('☁️ sincronizado', true);
              } else {
                  if (typeof setSave === 'function') setSave('salvo localmente', true);
              }
          }).catch(err => {
            console.warn('Erro ao sincronizar com Supabase:', err);
            if (typeof setSave === 'function') setSave('salvo localmente', true);
          });
          if (typeof setSave === 'function') setSave('☁️ sincronizando...', true);
        } else {
          if (typeof setSave === 'function') setSave('salvo localmente', true);
        }
        
        if (show) {
          if (typeof toast === 'function') toast('Alterações salvas');
        }
    }
  } catch (e) {
    if (typeof setSave === 'function') setSave('não consegui salvar', false);
    console.error(e);
  }
};

/**
 * Nova função loadStore que carrega local primeiro e depois tenta nuvem
 */
window.loadStore = function() {
  // 1. Carregar do localStorage primeiro para não travar a interface
  var loaded = null;
  try {
    // Tenta usar a chave padrão se STORAGE_KEY ainda não estiver definida
    const key = typeof STORAGE_KEY !== 'undefined' ? STORAGE_KEY : 'atmos_clean_precificacao_profissional_mobile_v4';
    loaded = JSON.parse(localStorage.getItem(key) || 'null');
  } catch (e) {
    loaded = null;
  }
  
  // Usar DEFAULT_DATA global
  var fresh = { data: typeof clone !== 'undefined' ? clone(DEFAULT_DATA) : DEFAULT_DATA, quote: [], sim: null };
  if (typeof defaultSimFromData === 'function') {
      fresh.sim = defaultSimFromData(fresh.data);
  }

  if (!loaded || !loaded.data) {
    return fresh;
  }
  
  var merged = {
    data: typeof mergeData === 'function' ? mergeData(loaded.data) : loaded.data,
    quote: Array.isArray(loaded.quote) ? loaded.quote : [],
    sim: loaded.sim || null
  };
  
  if (typeof normalizeSim === 'function') {
      merged.sim = normalizeSim(merged.sim || (typeof defaultSimFromData === 'function' ? defaultSimFromData(merged.data) : null), merged.data);
  }
  
  return merged;
};

/**
 * Sincronização em segundo plano após o carregamento
 */
async function syncFromCloud() {
    if (typeof isSupabaseReady !== 'undefined' && isSupabaseReady && supabaseClient) {
        try {
            const supabaseData = await loadFromSupabase();
            if (supabaseData && typeof store !== 'undefined') {
                console.log('Dados recebidos da nuvem, atualizando...');
                
                // Atualizar o store global mantendo a referência
                store.data = typeof mergeData === 'function' ? mergeData(supabaseData.data) : supabaseData.data;
                store.quote = Array.isArray(supabaseData.quote) ? supabaseData.quote : [];
                store.sim = supabaseData.sim || store.sim;
                
                if (typeof normalizeSim === 'function') {
                    store.sim = normalizeSim(store.sim, store.data);
                }
                
                // Salvar localmente o que veio da nuvem
                if (typeof STORAGE_KEY !== 'undefined') {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
                }
                
                // Re-renderizar a interface
                if (typeof render === 'function') render();
                if (typeof toast === 'function') toast('Dados sincronizados com a nuvem');
                if (typeof setSave === 'function') setSave('☁️ Sincronizado com nuvem', true);
            }
        } catch (e) {
            console.warn('Falha na sincronização inicial com a nuvem:', e);
        }
        
        // Inscrever-se para mudanças futuras
        subscribeToChanges(function(newData) {
            if (newData && newData.data && typeof store !== 'undefined') {
                console.log('Atualização em tempo real recebida');
                store.data = typeof mergeData === 'function' ? mergeData(newData.data) : newData.data;
                store.quote = Array.isArray(newData.quote) ? newData.quote : [];
                store.sim = newData.sim || store.sim;
                
                if (typeof normalizeSim === 'function') {
                    store.sim = normalizeSim(store.sim, store.data);
                }
                
                if (typeof render === 'function') render();
                if (typeof toast === 'function') toast('Dados atualizados por outro usuário');
            }
        });
    }
}

// Iniciar sincronização com a nuvem após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Pequeno atraso para garantir que o script original rodou e a interface inicial foi montada
    setTimeout(syncFromCloud, 1000);
}, { once: true });
