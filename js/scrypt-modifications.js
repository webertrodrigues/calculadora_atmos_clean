/**
 * Modificações para focar exclusivamente no Supabase
 */

// Sobrescrever saveStore global para usar APENAS Supabase
window.saveStore = function(show) {
  if (show === void 0) { show = true; }
  if (typeof store === 'undefined') return;

  try {
    // Normalizar antes de salvar
    if (typeof normalizeSim === 'function') {
      store.sim = normalizeSim(store.sim, store.data);
    }
    
    if (typeof setSave === 'function') setSave('☁️ salvando...', true);
    
    saveToSupabase(store).then(success => {
      if (success) {
        if (typeof setSave === 'function') setSave('☁️ salvo na nuvem', true);
        if (show && typeof toast === 'function') toast('Sincronizado com a nuvem');
      } else {
        if (typeof setSave === 'function') setSave('❌ erro ao salvar', false);
      }
    });
  } catch (e) {
    console.error('Erro ao salvar:', e);
  }
};

// Sobrescrever loadStore para retornar dados padrão inicialmente (será atualizado pelo sync)
window.loadStore = function() {
  console.log('📂 Inicializando com dados padrão (aguardando nuvem)...');
  
  const fresh = { 
    data: typeof clone !== 'undefined' ? clone(DEFAULT_DATA) : DEFAULT_DATA, 
    quote: [], 
    sim: null 
  };
  
  if (typeof defaultSimFromData === 'function') {
    fresh.sim = defaultSimFromData(fresh.data);
  }
  
  return fresh;
};

/**
 * Sincronização obrigatória com a nuvem
 */
async function forceSyncFromCloud() {
  console.log('🌐 Iniciando forceSyncFromCloud...');
  
  if (typeof setSave === 'function') setSave('☁️ conectando...', true);

  // Esperar o cliente estar pronto
  let attempts = 0;
  while ((typeof isSupabaseReady === 'undefined' || !isSupabaseReady) && attempts < 20) {
    console.log(`Aguardando Supabase... tentativa ${attempts + 1}`);
    await new Promise(r => setTimeout(r, 500));
    attempts++;
  }

  if (!isSupabaseReady) {
    console.error('Nuvem não disponível após timeout.');
    if (typeof setSave === 'function') setSave('⚠️ erro conexão', false);
    // Mesmo sem nuvem, forçar um render inicial para não ficar "carregando"
    if (typeof render === 'function') render();
    return;
  }

  try {
    const cloudData = await loadFromSupabase();
    if (cloudData && typeof store !== 'undefined') {
      console.log('📥 Dados carregados da nuvem');
      
      store.data = typeof mergeData === 'function' ? mergeData(cloudData.data) : cloudData.data;
      store.quote = Array.isArray(cloudData.quote) ? cloudData.quote : [];
      store.sim = cloudData.sim || store.sim;
      
      if (typeof normalizeSim === 'function') {
        store.sim = normalizeSim(store.sim, store.data);
      }
      
      if (typeof render === 'function') render();
      if (typeof setSave === 'function') setSave('☁️ nuvem ativa', true);
    }
  } catch (e) {
    console.error('Erro na sincronização inicial:', e);
  }

  // Ativar tempo real
  subscribeToChanges(newData => {
    if (newData && typeof store !== 'undefined') {
      console.log('📡 Atualização remota recebida');
      store.data = typeof mergeData === 'function' ? mergeData(newData.data) : newData.data;
      store.quote = Array.isArray(newData.quote) ? newData.quote : [];
      store.sim = newData.sim || store.sim;
      if (typeof render === 'function') render();
      if (typeof toast === 'function') toast('Dados atualizados remotamente');
    }
  });
}

// Iniciar sincronização
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(forceSyncFromCloud, 1000);
});
