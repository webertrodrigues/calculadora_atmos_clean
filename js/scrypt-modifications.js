/**
 * Modificações para focar exclusivamente no Supabase
 */

/**
 * Força a sobrescrita das funções globais, mesmo que o scrypt.js tente redeclará-las
 */
const SAVE_DEBOUNCE_MS = 2000;
const SAVE_MAX_WAIT_MS = 5000;
let pendingSaveTimer = null;
let pendingSaveStartedAt = 0;
let pendingSaveShouldToast = false;
let saveInProgress = false;

function performCloudSave(show) {
  if (typeof store === 'undefined') return;

  try {
    if (typeof normalizeSim === 'function') {
      store.sim = normalizeSim(store.sim, store.data);
    }
    if (typeof normalizeMultiSimulation === 'function' && store.multi) {
      store.multi = normalizeMultiSimulation(store.multi, store.data);
    }

    if (typeof setSave === 'function') setSave('☁️ salvando...', true);
    saveInProgress = true;

    saveToSupabase(store).then(success => {
      saveInProgress = false;
      if (success) {
        if (typeof setSave === 'function') setSave('☁️ salvo na nuvem', true);
        if (show && typeof toast === 'function') toast('Sincronizado com a nuvem');
      } else {
        if (typeof setSave === 'function') setSave('❌ erro ao salvar', false);
      }
    }).catch(e => {
      saveInProgress = false;
      console.error('Erro ao salvar na nuvem:', e);
      if (typeof setSave === 'function') setSave('❌ erro ao salvar', false);
    });
  } catch (e) {
    saveInProgress = false;
    console.error('Erro ao salvar:', e);
  }
}

function scheduleCloudSave(show) {
  const now = Date.now();
  pendingSaveShouldToast = pendingSaveShouldToast || !!show;

  if (!pendingSaveStartedAt) {
    pendingSaveStartedAt = now;
  }

  if (pendingSaveTimer) {
    clearTimeout(pendingSaveTimer);
  }

  const elapsed = now - pendingSaveStartedAt;
  const delay = Math.max(0, Math.min(SAVE_DEBOUNCE_MS, SAVE_MAX_WAIT_MS - elapsed));

  if (typeof setSave === 'function') setSave('☁️ salvando em instantes...', true);

  pendingSaveTimer = setTimeout(() => {
    const shouldToast = pendingSaveShouldToast;
    pendingSaveTimer = null;
    pendingSaveStartedAt = 0;
    pendingSaveShouldToast = false;
    performCloudSave(shouldToast);
  }, delay);
}

function applyOverrides() {
  console.log('🛠️ Aplicando overrides globais...');
  
  window.saveStore = function(show) {
    if (show === void 0) { show = true; }
    if (typeof store === 'undefined') return;

    scheduleCloudSave(show);
  };

  window.flushPendingSave = function(show) {
    if (pendingSaveTimer) {
      clearTimeout(pendingSaveTimer);
      pendingSaveTimer = null;
    }
    const shouldToast = !!show || pendingSaveShouldToast;
    pendingSaveStartedAt = 0;
    pendingSaveShouldToast = false;
    if (!saveInProgress) performCloudSave(shouldToast);
  };

  window.loadStore = function() {
    console.log('📂 Inicializando com estado vazio (aguardando nuvem)...');
    return { 
      data: { 
        categories: [], services: [], products: [], stages: [], 
        difficulties: [], rules: {}, margins: [], defaults: {} 
      }, 
      simulationHistory: [],
      quote: [], 
      sim: { serviceId: '', difficultyId: '', stageIds: [], products: [] },
      multi: null,
      currentFlow: 'single',
      multiWizard: null
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
        store.simulationHistory = Array.isArray(cloudData.simulationHistory) ? cloudData.simulationHistory : [];
        if (cloudData.sim) store.sim = cloudData.sim;
        store.currentFlow = cloudData.currentFlow || 'single';
        store.multiWizard = cloudData.multiWizard || null;
        if (typeof currentFlow !== 'undefined') currentFlow = store.currentFlow || 'single';
        if (typeof currentScreen !== 'undefined' && currentFlow === 'multi' && currentScreen === 'multi') currentScreen = 'wizard';
        if (cloudData.multi && typeof normalizeMultiSimulation === 'function') {
          store.multi = normalizeMultiSimulation(cloudData.multi, store.data);
        } else if (cloudData.multi) {
          store.multi = cloudData.multi;
        }
      } else {
        console.log('✨ Nuvem vazia, inicializando com dados padrão...');
        // Se não houver nada na nuvem, usamos o DEFAULT_DATA definido no scrypt.js
        store.data = typeof clone !== 'undefined' ? clone(DEFAULT_DATA) : DEFAULT_DATA;
        if (typeof defaultSimFromData === 'function') {
          store.sim = defaultSimFromData(store.data);
        }
        if (typeof createDefaultMultiSimulation === 'function') {
          store.multi = createDefaultMultiSimulation(store.data);
        }
        // Salva imediatamente para criar o registro na nuvem
        window.saveStore(false);
      }
      
      if (typeof normalizeSim === 'function') {
        store.sim = normalizeSim(store.sim, store.data);
      }
      if (!store.multi && typeof createDefaultMultiSimulation === 'function') {
        store.multi = createDefaultMultiSimulation(store.data);
      }
      if (store.multi && typeof normalizeMultiSimulation === 'function') {
        store.multi = normalizeMultiSimulation(store.multi, store.data);
      }
      store.currentFlow = store.currentFlow || 'single';
      store.multiWizard = store.multiWizard || null;
      if (typeof currentFlow !== 'undefined') currentFlow = store.currentFlow || 'single';
      if (typeof currentScreen !== 'undefined' && currentFlow === 'multi' && currentScreen === 'multi') currentScreen = 'wizard';
      
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
      store.simulationHistory = Array.isArray(newData.simulationHistory) ? newData.simulationHistory : [];
      if (newData.sim) store.sim = newData.sim;
      store.currentFlow = newData.currentFlow || store.currentFlow || 'single';
      store.multiWizard = newData.multiWizard || store.multiWizard || null;
      if (typeof currentFlow !== 'undefined') currentFlow = store.currentFlow || 'single';
      if (typeof currentScreen !== 'undefined' && currentFlow === 'multi' && currentScreen === 'multi') currentScreen = 'wizard';
      if (newData.multi && typeof normalizeMultiSimulation === 'function') {
        store.multi = normalizeMultiSimulation(newData.multi, store.data);
      } else if (newData.multi) {
        store.multi = newData.multi;
      }
      if (typeof render === 'function') render();
      if (typeof toast === 'function') toast('Dados atualizados remotamente');
    }
  });
}

// Iniciar sincronização
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(forceSyncFromCloud, 1000);
});
