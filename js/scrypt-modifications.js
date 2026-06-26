/**
 * Modificações para focar exclusivamente no Supabase
 */

/**
 * Força a sobrescrita das funções globais, mesmo que o scrypt.js tente redeclará-las
 */
function applyOverrides() {
  console.log('🛠️ Aplicando overrides globais...');
  
  window.saveStore = function(show) {
    if (show === void 0) { show = true; }
    if (typeof store === 'undefined') return;

    try {
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

  window.loadStore = function() {
    console.log('📂 Inicializando com estado vazio (aguardando nuvem)...');
    return { 
      data: { 
        categories: [], services: [], products: [], stages: [], 
        difficulties: [], rules: {}, margins: [], defaults: {} 
      }, 
      quote: [], 
      sim: { serviceId: '', difficultyId: '', stageIds: [], products: [] } 
    };
  };
}

// Executa imediatamente e também no DOMContentLoaded para garantir
applyOverrides();

// Adiciona o listener para garantir que os overrides permaneçam
document.addEventListener('DOMContentLoaded', applyOverrides);

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
    if (typeof store !== 'undefined') {
      if (cloudData) {
        console.log('📥 Dados carregados da nuvem');
        if (cloudData.data) store.data = typeof mergeData === 'function' ? mergeData(cloudData.data) : cloudData.data;
        if (cloudData.quote) store.quote = Array.isArray(cloudData.quote) ? cloudData.quote : [];
        if (cloudData.sim) store.sim = cloudData.sim;
      } else {
        console.log('✨ Nuvem vazia, inicializando com dados padrão...');
        // Se não houver nada na nuvem, usamos o DEFAULT_DATA definido no scrypt.js
        store.data = typeof clone !== 'undefined' ? clone(DEFAULT_DATA) : DEFAULT_DATA;
        if (typeof defaultSimFromData === 'function') {
          store.sim = defaultSimFromData(store.data);
        }
        // Salva imediatamente para criar o registro na nuvem
        window.saveStore(false);
      }
      
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
      if (newData.data) store.data = typeof mergeData === 'function' ? mergeData(newData.data) : newData.data;
      if (newData.quote) store.quote = Array.isArray(newData.quote) ? newData.quote : [];
      if (newData.sim) store.sim = newData.sim;
      if (typeof render === 'function') render();
      if (typeof toast === 'function') toast('Dados atualizados remotamente');
    }
  });
}

// Iniciar sincronização
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(forceSyncFromCloud, 1000);
});
