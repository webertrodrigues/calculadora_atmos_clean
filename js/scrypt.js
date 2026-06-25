/* Compatibilidade iPhone/Safari antigo e navegadores internos */
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    return this.indexOf(searchElement) !== -1;
  };
}
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    for (var i = 0; i < this.length; i++) {
      if (predicate(this[i], i, this)) return this[i];
    }
    return undefined;
  };
}
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
if (!Number.isFinite) {
  Number.isFinite = function(value) { return typeof value === 'number' && isFinite(value); };
}
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
  Element.prototype.closest = function(selector) {
    var el = this;
    while (el && el.nodeType === 1) {
      if (el.matches(selector)) return el;
      el = el.parentElement || el.parentNode;
    }
    return null;
  };
}
function safeScrollTop(){
  try { window.scrollTo(0, 0); } catch(e) { document.documentElement.scrollTop = 0; document.body.scrollTop = 0; }
}

var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var DEFAULT_DATA = {
  "version": 4,
  "categories": [
      {
          "id": "cat1",
          "name": "Cadeiras e Poltronas"
      },
      {
          "id": "cat2",
          "name": "Sofás"
      },
      {
          "id": "cat3",
          "name": "Colchões e Camas Box"
      },
      {
          "id": "cat4",
          "name": "Automotivo (Interna Completa)"
      },
      {
          "id": "cat5",
          "name": "Automotivo"
      }
  ],
  "services": [
      {
          "id": "srv1",
          "category": "Cadeiras e Poltronas",
          "item": "Cadeira de Escritório",
          "typeSize": "Secretária / Diretor",
          "porte": "Pequeno",
          "sizeIndex": 1.0,
          "baseValue": 40.0
      },
      {
          "id": "srv2",
          "category": "Cadeiras e Poltronas",
          "item": "Cadeira de Jantar",
          "typeSize": "Apenas assento",
          "porte": "Pequeno",
          "sizeIndex": 1.0,
          "baseValue": 25.0
      },
      {
          "id": "srv3",
          "category": "Cadeiras e Poltronas",
          "item": "Cadeira de Jantar",
          "typeSize": "Assento e encosto",
          "porte": "Pequeno",
          "sizeIndex": 1.0,
          "baseValue": 45.0
      },
      {
          "id": "srv4",
          "category": "Cadeiras e Poltronas",
          "item": "Poltrona Amamentação / Decorativa",
          "typeSize": "1 lugar fixa",
          "porte": "Médio",
          "sizeIndex": 1.15,
          "baseValue": 86.95652173913044
      },
      {
          "id": "srv5",
          "category": "Cadeiras e Poltronas",
          "item": "Poltrona do Papai",
          "typeSize": "1 lugar reclinável",
          "porte": "Grande",
          "sizeIndex": 1.3,
          "baseValue": 107.6923076923077
      },
      {
          "id": "srv6",
          "category": "Sofás",
          "item": "Sofá Fixo Comum",
          "typeSize": "2 lugares",
          "porte": "Médio",
          "sizeIndex": 1.15,
          "baseValue": 130.43478260869566
      },
      {
          "id": "srv7",
          "category": "Sofás",
          "item": "Sofá Fixo Comum",
          "typeSize": "3 lugares",
          "porte": "Grande",
          "sizeIndex": 1.3,
          "baseValue": 153.84615384615384
      },
      {
          "id": "srv8",
          "category": "Sofás",
          "item": "Sofá Fixo Comum",
          "typeSize": "4 lugares",
          "porte": "Extra grande",
          "sizeIndex": 1.5,
          "baseValue": 160.0
      },
      {
          "id": "srv9",
          "category": "Sofás",
          "item": "Sofá Retrátil e Reclinável",
          "typeSize": "2 lugares",
          "porte": "Médio",
          "sizeIndex": 1.2,
          "baseValue": 166.66666666666669
      },
      {
          "id": "srv10",
          "category": "Sofás",
          "item": "Sofá Retrátil e Reclinável",
          "typeSize": "2 lugares",
          "porte": "Grande",
          "sizeIndex": 1.3,
          "baseValue": 169.23076923076923
      },
      {
          "id": "srv11",
          "category": "Sofás",
          "item": "Sofá Retrátil e Reclinável",
          "typeSize": "3 lugares",
          "porte": "Extra grande",
          "sizeIndex": 1.5,
          "baseValue": 173.33333333333334
      },
      {
          "id": "srv12",
          "category": "Sofás",
          "item": "Sofá Retrátil e Reclinável",
          "typeSize": "4 lugares ou maior",
          "porte": "Muito grande",
          "sizeIndex": 1.7,
          "baseValue": 188.23529411764707
      },
      {
          "id": "srv13",
          "category": "Colchões e Camas Box",
          "item": "Colchão de Solteiro",
          "typeSize": "Solteiro padrão",
          "porte": "Médio",
          "sizeIndex": 1.15,
          "baseValue": 86.95652173913044
      },
      {
          "id": "srv14",
          "category": "Colchões e Camas Box",
          "item": "Colchão de Casal",
          "typeSize": "Casal padrão",
          "porte": "Grande",
          "sizeIndex": 1.3,
          "baseValue": 115.38461538461539
      },
      {
          "id": "srv15",
          "category": "Colchões e Camas Box",
          "item": "Colchão Queen",
          "typeSize": "Queen padrão",
          "porte": "Extra grande",
          "sizeIndex": 1.5,
          "baseValue": 146.66666666666666
      },
      {
          "id": "srv16",
          "category": "Colchões e Camas Box",
          "item": "Colchão King",
          "typeSize": "King padrão",
          "porte": "Muito grande",
          "sizeIndex": 1.7,
          "baseValue": 147.05882352941177
      },
      {
          "id": "srv17",
          "category": "Colchões e Camas Box",
          "item": "Base Box Solteiro",
          "typeSize": "Base solteiro",
          "porte": "Médio",
          "sizeIndex": 1.15,
          "baseValue": 78.26086956521739
      },
      {
          "id": "srv18",
          "category": "Colchões e Camas Box",
          "item": "Base Box Casal",
          "typeSize": "Base casal",
          "porte": "Grande",
          "sizeIndex": 1.3,
          "baseValue": 92.3076923076923
      },
      {
          "id": "srv19",
          "category": "Colchões e Camas Box",
          "item": "Base Box Queen",
          "typeSize": "Base queen",
          "porte": "Extra grande",
          "sizeIndex": 1.5,
          "baseValue": 100.0
      },
      {
          "id": "srv20",
          "category": "Colchões e Camas Box",
          "item": "Cama Box Casal Combo",
          "typeSize": "Casal: colchão + base",
          "porte": "Muito grande",
          "sizeIndex": 1.7,
          "baseValue": 135.29411764705884
      },
      {
          "id": "srv21",
          "category": "Colchões e Camas Box",
          "item": "Cama Box Queen Combo",
          "typeSize": "Queen: colchão + base",
          "porte": "Muito grande",
          "sizeIndex": 1.85,
          "baseValue": 156.75675675675674
      },
      {
          "id": "srv22",
          "category": "Colchões e Camas Box",
          "item": "Cama Box Conjugada Casal",
          "typeSize": "Casal conjugada",
          "porte": "Extra grande",
          "sizeIndex": 1.5,
          "baseValue": 126.66666666666667
      },
      {
          "id": "srv23",
          "category": "Automotivo",
          "item": "Carro Hatch / Compacto",
          "typeSize": "Gol, Onix, HB20 etc.",
          "porte": "Grande",
          "sizeIndex": 1.3,
          "baseValue": 200.0
      },
      {
          "id": "srv24",
          "category": "Automotivo",
          "item": "Carro Sedan",
          "typeSize": "Corolla, Civic, Prisma etc.",
          "porte": "Extra grande",
          "sizeIndex": 1.5,
          "baseValue": 200.0
      },
      {
          "id": "srv25",
          "category": "Automotivo",
          "item": "SUV / Crossover",
          "typeSize": "T-Cross, Creta, Renegade etc.",
          "porte": "Muito grande",
          "sizeIndex": 1.7,
          "baseValue": 205.88235294117646
      },
      {
          "id": "srv26",
          "category": "Automotivo",
          "item": "SUV Grande",
          "typeSize": "SW4, Commander, Trailblazer etc.",
          "porte": "Muito grande+",
          "sizeIndex": 1.9,
          "baseValue": 221.05263157894737
      }
  ],
  "products": [
      {
          "id": "prd1",
          "name": "Spartan Clean By Peroxy",
          "packageValue": 149.9,
          "volume": 5000.0,
          "unit": "ml"
      },
      {
          "id": "prd2",
          "name": "Spartan Xtraction II",
          "packageValue": 91.86,
          "volume": 5000.0,
          "unit": "ml"
      },
      {
          "id": "prd3",
          "name": "Spartan Solvfresh",
          "packageValue": 28.5,
          "volume": 300.0,
          "unit": "ml"
      },
      {
          "id": "prd4",
          "name": "Extractor",
          "packageValue": 41.9,
          "volume": 1500.0,
          "unit": "ml"
      },
      {
          "id": "prd5",
          "name": "Easytech Multilimpador - Pluri",
          "packageValue": 79.9,
          "volume": 5000.0,
          "unit": "ml"
      },
      {
          "id": "prd6",
          "name": "Finisherfresh Bouquet",
          "packageValue": 38.945,
          "volume": 1000.0,
          "unit": "ml"
      },
      {
          "id": "prd7",
          "name": "Spartan Contempo Odor Solution",
          "packageValue": 38.945,
          "volume": 1000.0,
          "unit": "ml"
      },
      {
          "id": "prd8",
          "name": "ALVFRESH ALVEJANTE 5 LTS",
          "packageValue": 85.0,
          "volume": 5000.0,
          "unit": "ml"
      }
  ],
  "stages": [
      {
          "id": "etp1",
          "name": "Limpeza",
          "weight": 0.45,
          "defaultSelected": true
      },
      {
          "id": "etp2",
          "name": "Higienização",
          "weight": 0.25,
          "defaultSelected": false
      },
      {
          "id": "etp3",
          "name": "Desodorização leve",
          "weight": 0.15,
          "defaultSelected": false
      },
      {
          "id": "etp4",
          "name": "Desodorização forte",
          "weight": 0.3,
          "defaultSelected": false
      },
      {
          "id": "etp5",
          "name": "Tiragem de mancha leve",
          "weight": 0.2,
          "defaultSelected": false
      },
      {
          "id": "etp6",
          "name": "Tiragem de mancha média",
          "weight": 0.4,
          "defaultSelected": false
      },
      {
          "id": "etp7",
          "name": "Perfumação",
          "weight": 0.15,
          "defaultSelected": true
      },
      {
          "id": "etp8",
          "name": "Escovação",
          "weight": 0.15,
          "defaultSelected": true
      },
      {
          "id": "etp9",
          "name": "Tiragem de mancha pesada",
          "weight": 0.7,
          "defaultSelected": false
      }
  ],
  "difficulties": [
      {
          "id": "dif1",
          "name": "Leve",
          "situation": "sujeira normal, manutenção",
          "weight": 0.95,
          "defaultSelected": true
      },
      {
          "id": "dif2",
          "name": "Média",
          "situation": "encardido, uso intenso, demora maior",
          "weight": 1.1,
          "defaultSelected": false
      },
      {
          "id": "dif3",
          "name": "Alta",
          "situation": "muito sujo, pet, suor forte, gordura leve",
          "weight": 1.2,
          "defaultSelected": false
      },
      {
          "id": "dif4",
          "name": "Crítica",
          "situation": "urina, mofo, odor forte, muita mancha",
          "weight": 1.4,
          "defaultSelected": false
      },
      {
          "id": "dif5",
          "name": "Extrema",
          "situation": "risco alto de retrabalho/reclamação",
          "weight": 1.8,
          "defaultSelected": false
      }
  ],
  "rules": {
      "distanceKm": 19.0,
      "vehicleKmL": 10.0,
      "fuelPrice": 6.5,
      "mechanicKmLt20": 0.5,
      "mechanicKmGte20": 0.5,
      "fuelKmLt20": 0.5,
      "fuelKmGte20": 0.6,
      "machineHours": "01:30:00",
      "machineCostHour": 4.0
  },
  "margins": [
      0.5,
      0.6,
      0.7
  ],
  "defaults": {
      "serviceId": "srv6",
      "difficultyId": "dif1",
      "stageIds": [
          "etp1",
          "etp7",
          "etp8"
      ],
      "productRows": [
          {
              "productId": "prd2",
              "quantity": 150.0
          },
          {
              "productId": "prd6",
              "quantity": 7.0
          }
      ]
  }
};
var STORAGE_KEY = 'atmos_clean_precificacao_profissional_mobile_v4';
var STEP_INFO = [
  ['Serviço', 'Preço e dados automáticos'],
  ['Regras', 'Deslocamento e operação'],
  ['Dificuldade', 'Nível técnico'],
  ['Etapas', 'Processos feitos'],
  ['Produtos', 'Produtos e quantidades'],
  ['Resumo', 'Adicionar ao orçamento']
];
var store = loadStore();
var currentScreen = 'home';
var currentStep = 1;
var baseTab = 'servicos';
var toastTimer = null;
function uid(prefix) {
  if (prefix === void 0) { prefix = 'id'; }
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
function money(n) { return Number(n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
function percent(n) { return Number(n || 0).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function num(n, d) {
  if (d === void 0) { d = 4; }
  return Number(n || 0).toLocaleString('pt-BR', { maximumFractionDigits: d });
}
function esc(s) { return String(s !== null && s !== void 0 ? s : '').replace(/[&<>"']/g, function (ch) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]); }); }
function attr(s) { return esc(s).replace(/`/g, '&#96;'); }
function parseNum(v) {
  if (typeof v === 'number')
      return Number.isFinite(v) ? v : 0;
  if (v === null || v === undefined)
      return 0;
  var s = String(v).trim();
  if (!s)
      return 0;
  if (s.includes(',') && s.includes('.'))
      return Number(s.replace(/\./g, '').replace(',', '.')) || 0;
  if (s.includes(','))
      return Number(s.replace(',', '.')) || 0;
  return Number(s) || 0;
}
function pad2(n) {
  n = Math.max(0, Math.floor(Number(n) || 0));
  return n < 10 ? '0' + n : String(n);
}
function machineTimeToHours(value) {
  if (typeof value === 'number') {
      if (!Number.isFinite(value))
          return 0;
      return value <= 1 ? value * 24 : value;
  }
  if (value === null || value === undefined)
      return 0;
  var raw = String(value).trim();
  if (!raw)
      return 0;
  if (raw.indexOf(':') >= 0) {
      var parts = raw.split(':');
      var h = parseNum(parts[0] || 0);
      var m = parseNum(parts[1] || 0);
      var sec = parseNum(parts[2] || 0);
      if (m > 59)
          m = 59;
      if (sec > 59)
          sec = 59;
      return Math.max(0, h + (m / 60) + (sec / 3600));
  }
  var n = parseNum(raw);
  return n <= 1 ? n * 24 : n;
}
function hoursToMachineTime(hours) {
  var totalSeconds = Math.round(Math.max(0, Number(hours) || 0) * 3600);
  var h = Math.floor(totalSeconds / 3600);
  var m = Math.floor((totalSeconds % 3600) / 60);
  var sec = totalSeconds % 60;
  return pad2(h) + ':' + pad2(m) + ':' + pad2(sec);
}
function machineTimeDisplay(value) {
  return hoursToMachineTime(machineTimeToHours(value));
}
function machineTimeHint(value) {
  var hours = machineTimeToHours(value);
  var excelDay = hours / 24;
  return num(hours, 2) + ' h • fração da planilha: ' + num(excelDay, 6);
}
function round2(n) { return Math.round((Number(n || 0) + 1e-10) * 100) / 100; }
function serviceComplete(s) { return "".concat((s === null || s === void 0 ? void 0 : s.item) || '', " | ").concat((s === null || s === void 0 ? void 0 : s.porte) || '').trim(); }
function serviceLabel(s) { return "".concat(serviceComplete(s)).concat((s === null || s === void 0 ? void 0 : s.typeSize) ? ' — ' + s.typeSize : ''); }
function productUnitCost(p) { return parseNum(p === null || p === void 0 ? void 0 : p.packageValue) / (parseNum(p === null || p === void 0 ? void 0 : p.volume) || 1); }
function loadStore() {
  var loaded = null;
  try {
      loaded = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  }
  catch (e) {
      loaded = null;
  }
  var fresh = { data: clone(DEFAULT_DATA), quote: [], sim: defaultSimFromData(DEFAULT_DATA) };
  if (!loaded || !loaded.data)
      return fresh;
  var merged = {
      data: mergeData(loaded.data),
      quote: Array.isArray(loaded.quote) ? loaded.quote : [],
      sim: loaded.sim || null
  };
  merged.sim = normalizeSim(merged.sim || defaultSimFromData(merged.data), merged.data);
  return merged;
}
function mergeData(data) {
  var d = clone(DEFAULT_DATA);
  d.categories = Array.isArray(data.categories) ? data.categories : d.categories;
  d.services = Array.isArray(data.services) ? data.services : d.services;
  d.products = Array.isArray(data.products) ? data.products : d.products;
  d.stages = Array.isArray(data.stages) ? data.stages : d.stages;
  d.difficulties = Array.isArray(data.difficulties) ? data.difficulties : d.difficulties;
  d.rules = __assign(__assign({}, d.rules), (data.rules || {}));
  d.margins = Array.isArray(data.margins) ? data.margins : d.margins;
  d.defaults = __assign(__assign({}, d.defaults), (data.defaults || {}));
  return d;
}
function defaultSimFromData(data) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
  return {
      serviceId: ((_a = data.defaults) === null || _a === void 0 ? void 0 : _a.serviceId) || ((_c = (_b = data.services) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.id) || '',
      difficultyId: ((_d = data.defaults) === null || _d === void 0 ? void 0 : _d.difficultyId) || ((_f = (_e = data.difficulties) === null || _e === void 0 ? void 0 : _e.find(function (d) { return d.defaultSelected; })) === null || _f === void 0 ? void 0 : _f.id) || ((_h = (_g = data.difficulties) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.id) || '',
      stageIds: Array.isArray((_j = data.defaults) === null || _j === void 0 ? void 0 : _j.stageIds) ? __spreadArray([], data.defaults.stageIds, true) : (data.stages || []).filter(function (s) { return s.defaultSelected; }).map(function (s) { return s.id; }),
      products: Array.isArray((_k = data.defaults) === null || _k === void 0 ? void 0 : _k.productRows) && data.defaults.productRows.length ? clone(data.defaults.productRows) : [{ productId: ((_m = (_l = data.products) === null || _l === void 0 ? void 0 : _l[0]) === null || _m === void 0 ? void 0 : _m.id) || '', quantity: 0 }],
      displacementEnabled: true
  };
}
function normalizeSim(sim, data) {
  var _a, _b;
  var s = __assign(__assign({}, defaultSimFromData(data)), (sim || {}));
  if (!data.services.some(function (x) { return x.id === s.serviceId; }))
      s.serviceId = ((_a = data.services[0]) === null || _a === void 0 ? void 0 : _a.id) || '';
  if (!data.difficulties.some(function (x) { return x.id === s.difficultyId; }))
      s.difficultyId = ((_b = data.difficulties[0]) === null || _b === void 0 ? void 0 : _b.id) || '';
  s.stageIds = (s.stageIds || []).filter(function (id) { return data.stages.some(function (x) { return x.id === id; }); });
  s.products = (s.products || []).filter(function (row) { return data.products.some(function (p) { return p.id === row.productId; }); });
  if (!s.products.length && data.products.length)
      s.products = [{ productId: data.products[0].id, quantity: 0 }];
  s.displacementEnabled = s.displacementEnabled !== false;
  return s;
}
function saveStore(show) {
  if (show === void 0) { show = true; }
  try {
      store.sim = normalizeSim(store.sim, store.data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      setSave('salvo localmente', true);
      if (show)
          toast('Alterações salvas');
  }
  catch (e) {
      setSave('não consegui salvar localmente', false);
      console.error(e);
  }
}
function setSave(text, ok) { var el = document.getElementById('saveIndicator'); if (el) {
  el.textContent = text;
  el.classList.toggle('ok', !!ok);
} }
function toast(msg) {
  var el = document.getElementById('toast');
  if (!el)
      return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { return el.classList.remove('show'); }, 1800);
}
function calc(inputSim) {
  if (inputSim === void 0) { inputSim = store.sim; }
  var data = store.data;
  var sim = normalizeSim(inputSim, data);
  var service = data.services.find(function (s) { return s.id === sim.serviceId; }) || data.services[0] || {};
  var diff = data.difficulties.find(function (d) { return d.id === sim.difficultyId; }) || data.difficulties[0] || { name: '', weight: 0 };
  var stages = data.stages.filter(function (st) { return sim.stageIds.includes(st.id); });
  var stageFactor = stages.reduce(function (a, st) { return a + parseNum(st.weight); }, 0);
  var difficultyFactor = parseNum(diff.weight);
  var sizeFactor = parseNum(service.sizeIndex);
  var baseValue = parseNum(service.baseValue);
  var r = data.rules;
  var distance = sim.displacementEnabled ? parseNum(r.distanceKm) : 0;
  var costMechanic = distance * (distance < 20 ? parseNum(r.mechanicKmLt20) : parseNum(r.mechanicKmGte20));
  var costFuel = distance * (distance < 20 ? parseNum(r.fuelKmLt20) : parseNum(r.fuelKmGte20));
  var referenceFuelKm = parseNum(r.vehicleKmL) ? parseNum(r.fuelPrice) / parseNum(r.vehicleKmL) : 0;
  var machineHoursValue = machineTimeToHours(r.machineHours);
  var machineTimeLabel = hoursToMachineTime(machineHoursValue);
  var costMachine = machineHoursValue * parseNum(r.machineCostHour);
  var productDetails = (sim.products || []).map(function (row) {
      var p = data.products.find(function (x) { return x.id === row.productId; }) || {};
      var q = parseNum(row.quantity);
      var unitCost = productUnitCost(p);
      return __assign(__assign({}, clone(p)), { quantity: q, unitCost: unitCost, total: q * unitCost });
  }).filter(function (p) { return p.id && p.quantity > 0; });
  var costProducts = productDetails.reduce(function (a, p) { return a + p.total; }, 0);
  var totalCost = Math.ceil(costMechanic + costFuel + costMachine + costProducts);
  var finalPrice = round2(baseValue * difficultyFactor * stageFactor * sizeFactor);
  var profit = round2(finalPrice - totalCost);
  var margin = finalPrice ? profit / finalPrice : 0;
  var markup = totalCost ? finalPrice / totalCost : 0;
  var status = profit < 0 ? 'PREJUÍZO' : (margin < 0.5 ? 'MARGEM BAIXA' : 'OK');
  var margins = (data.margins || []).map(function (m) {
      var desired = parseNum(m);
      var minPrice = desired >= 1 ? 0 : totalCost / (1 - desired);
      var diffValue = minPrice - finalPrice;
      return { desired: desired, minPrice: minPrice, diffValue: diffValue, reading: diffValue > 0 ? 'Preço atual abaixo' : 'Preço atual cobre' };
  });
  return { service: clone(service), serviceName: serviceLabel(service), category: service.category || '', item: service.item || '', typeSize: service.typeSize || '', porte: service.porte || '', baseValue: baseValue, sizeFactor: sizeFactor, difficulty: clone(diff), difficultyFactor: difficultyFactor, stages: clone(stages), stageFactor: stageFactor, productDetails: productDetails, costMechanic: costMechanic, costFuel: costFuel, referenceFuelKm: referenceFuelKm, machineHoursValue: machineHoursValue, machineTimeLabel: machineTimeLabel, costMachine: costMachine, costProducts: costProducts, totalCost: totalCost, finalPrice: finalPrice, profit: profit, margin: margin, markup: markup, status: status, margins: margins, rulesSnapshot: clone(r), displacementEnabled: sim.displacementEnabled };
}
function render() {
  renderHome();
  renderWizard();
  renderBase();
  renderRules();
  renderQuoteScreen();
  showScreen(currentScreen, false);
}
function showScreen(name, scroll) {
  if (scroll === void 0) { scroll = true; }
  currentScreen = name;
  document.querySelectorAll('.screen').forEach(function (s) { return s.classList.remove('active'); });
  var el = document.getElementById("screen-".concat(name));
  if (el)
      el.classList.add('active');
  if (scroll)
      safeScrollTop();
}
function renderHome() {
  var c = calc();
  var totals = quoteTotals();
  document.getElementById('screen-home').innerHTML = "\n      <div class=\"hero\">\n        <section class=\"panel\">\n          <span class=\"tag\">Fluxo guiado \u2022 Mobile first</span>\n          <h2 class=\"hero-title\">Precifique sem perder custo no caminho.</h2>\n          <p class=\"hero-text\">Selecione o servi\u00E7o, ajuste regras, dificuldade, etapas e produtos. No final, adicione ao or\u00E7amento acumulado. A base e as regras ficam salvas neste navegador.</p>\n          <div class=\"choice-grid\">\n            <button class=\"choice\" type=\"button\" data-action=\"startWizard\"><span class=\"icon\">1</span><span><strong>Iniciar simula\u00E7\u00E3o</strong><span>Fluxo em etapas com c\u00E1lculo autom\u00E1tico.</span></span></button>\n            <button class=\"choice\" type=\"button\" data-action=\"openBase\"><span class=\"icon\">BD</span><span><strong>Base de dados</strong><span>Cadastrar servi\u00E7os, produtos, categorias e pesos.</span></span></button>\n            <button class=\"choice\" type=\"button\" data-action=\"openRules\"><span class=\"icon\">R</span><span><strong>Regras fixas</strong><span>Deslocamento, combust\u00EDvel, m\u00E1quina e taxas.</span></span></button>\n            <button class=\"choice\" type=\"button\" data-action=\"openQuote\"><span class=\"icon\">\u03A3</span><span><strong>Ver or\u00E7amento</strong><span>".concat(store.quote.length, " servi\u00E7o(s) acumulado(s).</span></span></button>\n          </div>\n        </section>\n        <aside class=\"panel\">\n          <div class=\"section-head\"><div><h2>Resumo atual</h2><p>Simula\u00E7\u00E3o que est\u00E1 em aberto agora.</p></div></div>\n          ").concat(summaryHtml(c), "\n          <div class=\"sticky-total\"><div><small>Total acumulado</small><strong>").concat(money(totals.finalPrice), "</strong></div><button class=\"btn small secondary\" type=\"button\" data-action=\"openQuote\">Abrir</button></div>\n        </aside>\n      </div>");
}
function renderWizard() {
  var shell = document.getElementById('screen-wizard');
  var c = calc();
  shell.innerHTML = "\n      <div class=\"wizard-shell\">\n        ".concat(progressHtml(), "\n        <div class=\"wizard-layout\">\n          <div class=\"wizard-main\">\n            <section class=\"step-card\">\n              ").concat(stepTitleHtml(), "\n              <div id=\"stepContent\">").concat(stepContentHtml(currentStep, c), "</div>\n              ").concat(wizardNavHtml(), "\n            </section>\n          </div>\n          <aside class=\"live-summary\">\n            <section class=\"step-card\">\n              <div class=\"section-head\"><div><h2>Resumo ao vivo</h2><p>Atualiza sozinho conforme voc\u00EA altera.</p></div></div>\n              ").concat(summaryHtml(c), "\n              <div class=\"divider\"></div>\n              ").concat(breakdownHtml(c), "\n            </section>\n          </aside>\n        </div>\n      </div>");
}
function progressHtml() {
  var p = Math.round((currentStep / 6) * 100);
  return "<div class=\"progress-mobile\"><div class=\"top\"><span>Etapa ".concat(currentStep, " de 6</span><strong>").concat(STEP_INFO[currentStep - 1][0], "</strong></div><div class=\"progress-track\"><div class=\"progress-bar\" style=\"width:").concat(p, "%\"></div></div></div>\n      <div class=\"stepper\">").concat(STEP_INFO.map(function (s, i) { return "<button type=\"button\" class=\"step-pill ".concat(currentStep === i + 1 ? 'active' : currentStep > i + 1 ? 'done' : '', "\" data-action=\"step\" data-step=\"").concat(i + 1, "\"><span class=\"num\">").concat(i + 1, "</span><span class=\"label\"><strong>").concat(s[0], "</strong><small>").concat(s[1], "</small></span></button>"); }).join(''), "</div>");
}
function stepTitleHtml() {
  return "<div class=\"step-title\"><div class=\"bubble\">".concat(currentStep, "</div><div><h2>").concat(STEP_INFO[currentStep - 1][0], "</h2><p>").concat(STEP_INFO[currentStep - 1][1], "</p></div></div>");
}
function wizardNavHtml() {
  return "<div class=\"wizard-nav\"><div class=\"left\"><button class=\"btn ghost\" type=\"button\" data-action=\"home\">In\u00EDcio</button>".concat(currentStep > 1 ? '<button class="btn secondary" type="button" data-action="prevStep">Voltar</button>' : '', "</div><div class=\"right\">").concat(currentStep < 6 ? '<button class="btn" type="button" data-action="nextStep">Próximo</button>' : '<button class="btn" type="button" data-action="addQuote">Adicionar ao orçamento</button>', "</div></div>");
}
function stepContentHtml(step, c) {
  if (step === 1)
      return serviceStepHtml(c);
  if (step === 2)
      return rulesMiniHtml(c);
  if (step === 3)
      return difficultyStepHtml();
  if (step === 4)
      return stagesStepHtml(c);
  if (step === 5)
      return productsStepHtml(c);
  return finalStepHtml(c);
}
function serviceStepHtml(c) {
  return "<div class=\"form-grid\">\n      <div class=\"field\" style=\"grid-column:1/-1\"><label>Servi\u00E7o selecionado</label><select data-sim=\"serviceId\">".concat(store.data.services.map(function (s) { return "<option value=\"".concat(s.id, "\" ").concat(s.id === store.sim.serviceId ? 'selected' : '', ">").concat(esc(serviceLabel(s)), "</option>"); }).join(''), "</select><span class=\"hint\">Ao escolher, os campos abaixo s\u00E3o puxados da base automaticamente.</span></div>\n      <div class=\"field\"><label>Categoria</label><input readonly value=\"").concat(attr(c.category), "\"></div>\n      <div class=\"field\"><label>Item</label><input readonly value=\"").concat(attr(c.item), "\"></div>\n      <div class=\"field\"><label>Tipo / tamanho</label><input readonly value=\"").concat(attr(c.typeSize), "\"></div>\n      <div class=\"field\"><label>Porte padr\u00E3o</label><input readonly value=\"").concat(attr(c.porte), "\"></div>\n      <div class=\"field\"><label>Valor base</label><input readonly value=\"").concat(attr(money(c.baseValue)), "\"></div>\n      <div class=\"field\"><label>\u00CDndice tamanho</label><input readonly value=\"").concat(attr(num(c.sizeFactor, 4)), "\"></div>\n    </div>");
}
function rulesMiniHtml(c) {
  return "<div class=\"help\">Estas regras ficam salvas para as pr\u00F3ximas simula\u00E7\u00F5es. Alterou aqui, salvou no navegador.</div><div class=\"form-grid three\" style=\"margin-top:12px\">".concat(rulesFieldsHtml(), "</div><div class=\"divider\"></div>").concat(breakdownHtml(c));
}
function rulesFieldsHtml() {
  var r = store.data.rules;
  var fields = [
      ['distanceKm', 'Distância do serviço (km)', 'ida + volta, se aplicar'],
      ['vehicleKmL', 'Autonomia veículo (km/L)', 'referência'],
      ['fuelPrice', 'Combustível (R$/L)', 'preço médio'],
      ['mechanicKmLt20', 'Taxa mecânica/km < 20', 'regra atual'],
      ['mechanicKmGte20', 'Taxa mecânica/km ≥ 20', 'regra atual'],
      ['fuelKmLt20', 'Taxa combustível/km < 20', 'regra atual'],
      ['fuelKmGte20', 'Taxa combustível/km ≥ 20', 'regra atual'],
      ['machineHours', 'Tempo de uso da máquina', 'Digite como duração. Ex.: 01:30:00 = 1,5 h'],
      ['machineCostHour', 'Custo maquinário por hora', 'R$/h']
  ];
  return fields.map(function (_a) {
      var key = _a[0], label = _a[1], hint = _a[2];
      if (key === 'machineHours') {
          return "<div class=\"field\"><label>".concat(esc(label), "</label><input type=\"text\" inputmode=\"numeric\" pattern=\"[0-9:]*\" placeholder=\"01:30:00\" value=\"").concat(attr(machineTimeDisplay(r[key])), "\" data-rule=\"").concat(key, "\"><span class=\"hint\">").concat(esc(hint), " • atual: ").concat(esc(machineTimeHint(r[key])), "</span></div>");
      }
      return "<div class=\"field\"><label>".concat(esc(label), "</label><input type=\"number\" step=\"0.0001\" inputmode=\"decimal\" value=\"").concat(attr(r[key]), "\" data-rule=\"").concat(key, "\"><span class=\"hint\">").concat(esc(hint), "</span></div>");
  }).join('');
}
function difficultyStepHtml() {
  return "<div class=\"select-list\">".concat(store.data.difficulties.map(function (d) { return "<label class=\"option-card\"><input type=\"radio\" name=\"difficulty\" value=\"".concat(d.id, "\" data-sim=\"difficultyId\" ").concat(d.id === store.sim.difficultyId ? 'checked' : '', "><span><strong>").concat(esc(d.name), "</strong><span>").concat(esc(d.situation || ''), "</span><span class=\"meta\"><span class=\"tag\">Peso ").concat(num(d.weight, 4), "</span></span></span></label>"); }).join(''), "</div>");
}
function stagesStepHtml(c) {
  return "<div class=\"help\">Fator de etapas atual: <strong>".concat(num(c.stageFactor, 4), "</strong>. Ele \u00E9 a soma dos pesos marcados como feitos.</div><div class=\"select-list\" style=\"margin-top:12px\">").concat(store.data.stages.map(function (st) { return "<label class=\"option-card\"><input type=\"checkbox\" value=\"".concat(st.id, "\" data-stage-check ").concat(store.sim.stageIds.includes(st.id) ? 'checked' : '', "><span><strong>").concat(esc(st.name), "</strong><span class=\"meta\"><span class=\"tag\">Peso ").concat(num(st.weight, 4), "</span></span></span></label>"); }).join(''), "</div>");
}
function productsStepHtml(c) {
  return "<div class=\"section-head\"><div><p>Adicione os produtos usados neste servi\u00E7o. O custo por unidade vem da base.</p></div><div class=\"actions\"><button class=\"btn secondary small\" type=\"button\" data-action=\"addProductRow\">Adicionar produto</button></div></div><div class=\"select-list\">".concat(store.sim.products.map(function (row, idx) { return productRowHtml(row, idx); }).join(''), "</div><div class=\"sticky-total\"><div><small>Custo de produtos</small><strong>").concat(money(c.costProducts), "</strong></div></div>");
}
function productRowHtml(row, idx) {
  var p = store.data.products.find(function (x) { return x.id === row.productId; }) || store.data.products[0] || {};
  var total = parseNum(row.quantity) * productUnitCost(p);
  return "<div class=\"product-card\" data-product-row=\"".concat(idx, "\"><div class=\"product-grid\"><div class=\"field\"><label>Produto</label><select data-product-field=\"productId\">").concat(store.data.products.map(function (prod) { return "<option value=\"".concat(prod.id, "\" ").concat(prod.id === row.productId ? 'selected' : '', ">").concat(esc(prod.name), "</option>"); }).join(''), "</select></div><div class=\"field\"><label>Quantidade</label><input type=\"number\" step=\"0.01\" min=\"0\" inputmode=\"decimal\" value=\"").concat(attr(row.quantity), "\" data-product-field=\"quantity\"></div><div class=\"field\"><label>Unid.</label><input readonly value=\"").concat(attr(p.unit || ''), "\"></div></div><div class=\"product-total\"><span>Custo unid.: <strong>").concat(money(productUnitCost(p)), "</strong></span><span>Total: <strong>").concat(money(total), "</strong></span><button class=\"btn danger small\" type=\"button\" data-action=\"removeProductRow\" data-index=\"").concat(idx, "\">Remover</button></div></div>");
}
function finalStepHtml(c) {
  return "<div class=\"summary-grid\">".concat(summaryCardsHtml(c), "</div><div class=\"divider\"></div><div class=\"section-head\"><div><h2>Pre\u00E7o m\u00EDnimo por margem</h2><p>Pre\u00E7o m\u00EDnimo = custo total \u00F7 (1 \u2212 margem desejada).</p></div></div><div class=\"select-list\">").concat(c.margins.map(function (m) { return "<div class=\"product-card\"><div class=\"rowline\"><span>Margem desejada</span><strong>".concat(percent(m.desired), "</strong></div><div class=\"rowline\"><span>Pre\u00E7o m\u00EDnimo</span><strong>").concat(money(m.minPrice), "</strong></div><div class=\"rowline\"><span>Diferen\u00E7a vs pre\u00E7o atual</span><strong>").concat(money(m.diffValue), "</strong></div><div class=\"rowline\"><span>Leitura</span><strong>").concat(esc(m.reading), "</strong></div></div>"); }).join(''), "</div><div class=\"divider\"></div><div class=\"help\"><strong>Pr\u00F3ximo passo:</strong> clique em <strong>Adicionar ao or\u00E7amento</strong>. Depois disso, o or\u00E7amento acumulado abre em uma tela separada, com total de gastos, lucro e total a receber.</div><div class=\"quote-toolbar\"><button class=\"btn secondary\" type=\"button\" data-action=\"openQuote\">Ver or\u00E7amento acumulado</button><button class=\"btn ghost\" type=\"button\" data-action=\"newSimulation\">Nova simula\u00E7\u00E3o</button></div>");
}
function summaryCardsHtml(c) {
  var cls = c.status === 'OK' ? 'ok' : (c.status === 'MARGEM BAIXA' ? 'warn' : 'danger');
  return "<div class=\"kpi\"><span>Valor servi\u00E7o final</span><strong>".concat(money(c.finalPrice), "</strong></div><div class=\"kpi\"><span>Custo total</span><strong>").concat(money(c.totalCost), "</strong></div><div class=\"kpi\"><span>Lucro bruto</span><strong>").concat(money(c.profit), "</strong></div><div class=\"kpi\"><span>Margem bruta</span><strong>").concat(percent(c.margin), "</strong></div><div class=\"kpi compact\"><span>Markup</span><strong>").concat(num(c.markup, 2), "x</strong></div><div class=\"kpi compact\"><span>Status</span><strong><span class=\"status ").concat(cls, "\">").concat(c.status, "</span></strong></div>");
}
function summaryHtml(c) { return "<div class=\"summary-grid\">".concat(summaryCardsHtml(c), "</div>"); }
function breakdownHtml(c) {
  return '<div class="breakdown">' +
      '<div class="rowline"><span>Serviço</span><strong>' + esc(c.serviceName) + '</strong></div>' +
      '<div class="rowline"><span>Custo mecânica</span><strong>' + money(c.costMechanic) + '</strong></div>' +
      '<div class="rowline"><span>Custo combustível</span><strong>' + money(c.costFuel) + '</strong></div>' +
      '<div class="rowline"><span>R$/km referência</span><strong>' + money(c.referenceFuelKm) + '</strong></div>' +
      '<div class="rowline"><span>Tempo maquinário</span><strong>' + esc(c.machineTimeLabel || '00:00:00') + '</strong></div>' +
      '<div class="rowline"><span>Custo maquinário</span><strong>' + money(c.costMachine) + '</strong></div>' +
      '<div class="rowline"><span>Custo produtos</span><strong>' + money(c.costProducts) + '</strong></div>' +
      '<div class="formula">Preço final = Valor base × Fator técnico × Fator etapas × Índice tamanho<br>' +
      'Custo maquinário = tempo HH:MM:SS × custo/hora<br>' +
      'Custo total = ARREDONDAR.PARA.CIMA(Mecânica + Combustível + Máquina + Produtos)</div></div>';
}
function renderRules() {
  document.getElementById('screen-rules').innerHTML = "<section class=\"panel\"><div class=\"section-head\"><div><h2>Regras de deslocamento e opera\u00E7\u00E3o</h2><p>Configura\u00E7\u00E3o fixa, salva no navegador e usada em todas as simula\u00E7\u00F5es.</p></div><div class=\"actions\"><button class=\"btn ghost\" type=\"button\" data-action=\"home\">In\u00EDcio</button><button class=\"btn secondary\" type=\"button\" data-action=\"startWizard\">Simular</button></div></div><div class=\"form-grid three\">".concat(rulesFieldsHtml(), "</div><div class=\"divider\"></div><div class=\"section-head\"><div><h2>Resumo com as regras atuais</h2></div></div>").concat(breakdownHtml(calc()), "</section>");
}
function renderQuoteScreen() {
  var totals = quoteTotals();
  var count = store.quote.length;
  document.getElementById('screen-quote').innerHTML = "<section class=\"panel\"><div class=\"section-head\"><div><h2>Or\u00E7amento acumulado</h2><p>Tela separada para acompanhar todos os servi\u00E7os simulados antes de fechar com o cliente.</p></div><div class=\"actions\"><button class=\"btn ghost\" type=\"button\" data-action=\"home\">In\u00EDcio</button><button class=\"btn secondary\" type=\"button\" data-action=\"startWizard\">Simular mais</button></div></div>".concat(quoteSummaryHtml(totals, count), "<div class=\"quote-toolbar\"><button class=\"btn secondary\" type=\"button\" data-action=\"newSimulation\">Nova simula\u00E7\u00E3o</button><button class=\"btn danger\" type=\"button\" data-action=\"clearQuote\">Limpar or\u00E7amento</button></div>").concat(quoteHtml() || '', "</section>");
}
function renderBase() {
  var tabs = [['servicos', 'Serviços'], ['produtos', 'Produtos'], ['categorias', 'Categorias'], ['etapas', 'Etapas'], ['dificuldades', 'Dificuldade'], ['margens', 'Margens'], ['backup', 'Backup']];
  document.getElementById('screen-base').innerHTML = "<section class=\"panel\"><div class=\"section-head\"><div><h2>Base de dados</h2><p>Cadastre tudo aqui. Campos calculados, como custo unit\u00E1rio do produto, s\u00E3o autom\u00E1ticos.</p></div><div class=\"actions\"><button class=\"btn ghost\" type=\"button\" data-action=\"home\">In\u00EDcio</button><button class=\"btn secondary\" type=\"button\" data-action=\"startWizard\">Simular</button></div></div><div class=\"base-tabs\">".concat(tabs.map(function (t) { return "<button class=\"base-tab ".concat(baseTab === t[0] ? 'active' : '', "\" type=\"button\" data-action=\"baseTab\" data-tab=\"").concat(t[0], "\">").concat(t[1], "</button>"); }).join(''), "</div><div id=\"baseContent\">").concat(baseContentHtml(), "</div></section>");
}
function baseContentHtml() {
  if (baseTab === 'servicos')
      return baseServicesHtml();
  if (baseTab === 'produtos')
      return baseProductsHtml();
  if (baseTab === 'categorias')
      return baseCategoriesHtml();
  if (baseTab === 'etapas')
      return baseStagesHtml();
  if (baseTab === 'dificuldades')
      return baseDifficultiesHtml();
  if (baseTab === 'margens')
      return baseMarginsHtml();
  return backupHtml();
}
function baseServicesHtml() {
  return "<div class=\"base-toolbar\"><button class=\"btn secondary\" type=\"button\" data-action=\"addService\">Adicionar servi\u00E7o</button></div><div class=\"data-grid\">".concat(store.data.services.map(function (s, idx) { return "<details class=\"data-card\"><summary><div class=\"summary-line\"><strong data-summary-main>".concat(esc(serviceLabel(s)), "</strong><span data-summary-sub>").concat(money(s.baseValue), "</span></div></summary><div class=\"form-grid\"><div class=\"field\"><label>Categoria</label><input value=\"").concat(attr(s.category), "\" data-base=\"service.category\" data-index=\"").concat(idx, "\" list=\"catOptions\"></div><div class=\"field\"><label>Item</label><input value=\"").concat(attr(s.item), "\" data-base=\"service.item\" data-index=\"").concat(idx, "\"></div><div class=\"field\"><label>Tipo / tamanho</label><input value=\"").concat(attr(s.typeSize), "\" data-base=\"service.typeSize\" data-index=\"").concat(idx, "\"></div><div class=\"field\"><label>Porte padr\u00E3o</label><input value=\"").concat(attr(s.porte), "\" data-base=\"service.porte\" data-index=\"").concat(idx, "\"></div><div class=\"field\"><label>\u00CDndice tamanho</label><input type=\"number\" step=\"0.01\" value=\"").concat(attr(s.sizeIndex), "\" data-base=\"service.sizeIndex\" data-index=\"").concat(idx, "\"></div><div class=\"field\"><label>Valor base</label><input type=\"number\" step=\"0.01\" value=\"").concat(attr(s.baseValue), "\" data-base=\"service.baseValue\" data-index=\"").concat(idx, "\"></div></div><div class=\"divider\"></div><button class=\"btn danger small\" type=\"button\" data-action=\"deleteService\" data-index=\"").concat(idx, "\">Excluir servi\u00E7o</button></details>"); }).join(''), "</div><datalist id=\"catOptions\">").concat(store.data.categories.map(function (c) { return "<option value=\"".concat(attr(c.name), "\"></option>"); }).join(''), "</datalist>");
}
function baseProductsHtml() {
  return "<div class=\"base-toolbar\"><button class=\"btn secondary\" type=\"button\" data-action=\"addBaseProduct\">Adicionar produto</button></div><div class=\"data-grid\">".concat(store.data.products.map(function (p, idx) { return "<details class=\"data-card\"><summary><div class=\"summary-line\"><strong data-summary-main>".concat(esc(p.name), "</strong><span data-summary-sub>").concat(money(productUnitCost(p)), "/").concat(esc(p.unit || 'un'), "</span></div></summary><div class=\"form-grid\"><div class=\"field\"><label>Produto</label><input value=\"").concat(attr(p.name), "\" data-base=\"product.name\" data-index=\"").concat(idx, "\"></div><div class=\"field\"><label>Valor embalagem</label><input type=\"number\" step=\"0.001\" value=\"").concat(attr(p.packageValue), "\" data-base=\"product.packageValue\" data-index=\"").concat(idx, "\"></div><div class=\"field\"><label>Volume</label><input type=\"number\" step=\"0.001\" value=\"").concat(attr(p.volume), "\" data-base=\"product.volume\" data-index=\"").concat(idx, "\"></div><div class=\"field\"><label>Unidade</label><input value=\"").concat(attr(p.unit), "\" data-base=\"product.unit\" data-index=\"").concat(idx, "\"></div><div class=\"field\" style=\"grid-column:1/-1\"><label>Custo unit\u00E1rio autom\u00E1tico</label><input readonly data-unit-cost-display value=\"").concat(attr(money(productUnitCost(p))), "\"><span class=\"hint\">Valor embalagem \u00F7 volume. Este campo n\u00E3o \u00E9 editado manualmente.</span></div></div><div class=\"divider\"></div><button class=\"btn danger small\" type=\"button\" data-action=\"deleteProduct\" data-index=\"").concat(idx, "\">Excluir produto</button></details>"); }).join(''), "</div>");
}
function baseCategoriesHtml() {
  return "<div class=\"base-toolbar\"><button class=\"btn secondary\" type=\"button\" data-action=\"addCategory\">Adicionar categoria</button></div><div class=\"data-grid\">".concat(store.data.categories.map(function (c, idx) { return "<div class=\"data-card\"><div class=\"field\"><label>Categoria</label><input value=\"".concat(attr(c.name), "\" data-base=\"category.name\" data-index=\"").concat(idx, "\"></div><button class=\"btn danger small\" type=\"button\" data-action=\"deleteCategory\" data-index=\"").concat(idx, "\">Excluir</button></div>"); }).join(''), "</div>");
}
function baseStagesHtml() {
  return "<div class=\"base-toolbar\"><button class=\"btn secondary\" type=\"button\" data-action=\"addStage\">Adicionar etapa</button></div><div class=\"data-grid\">".concat(store.data.stages.map(function (s, idx) { return "<div class=\"data-card\"><div class=\"form-grid\"><div class=\"field\"><label>Etapa</label><input value=\"".concat(attr(s.name), "\" data-base=\"stage.name\" data-index=\"").concat(idx, "\"></div><div class=\"field\"><label>Peso</label><input type=\"number\" step=\"0.01\" value=\"").concat(attr(s.weight), "\" data-base=\"stage.weight\" data-index=\"").concat(idx, "\"></div><label class=\"option-card\" style=\"grid-column:1/-1\"><input type=\"checkbox\" ").concat(s.defaultSelected ? 'checked' : '', " data-base=\"stage.defaultSelected\" data-index=\"").concat(idx, "\"><span><strong>Selecionar por padr\u00E3o em nova simula\u00E7\u00E3o</strong></span></label></div><button class=\"btn danger small\" type=\"button\" data-action=\"deleteStage\" data-index=\"").concat(idx, "\">Excluir</button></div>"); }).join(''), "</div>");
}
function baseDifficultiesHtml() {
  return "<div class=\"base-toolbar\"><button class=\"btn secondary\" type=\"button\" data-action=\"addDifficulty\">Adicionar dificuldade</button></div><div class=\"data-grid\">".concat(store.data.difficulties.map(function (d, idx) { return "<div class=\"data-card\"><div class=\"form-grid\"><div class=\"field\"><label>N\u00EDvel</label><input value=\"".concat(attr(d.name), "\" data-base=\"difficulty.name\" data-index=\"").concat(idx, "\"></div><div class=\"field\"><label>Peso</label><input type=\"number\" step=\"0.01\" value=\"").concat(attr(d.weight), "\" data-base=\"difficulty.weight\" data-index=\"").concat(idx, "\"></div><div class=\"field\" style=\"grid-column:1/-1\"><label>Situa\u00E7\u00E3o</label><input value=\"").concat(attr(d.situation), "\" data-base=\"difficulty.situation\" data-index=\"").concat(idx, "\"></div><label class=\"option-card\" style=\"grid-column:1/-1\"><input type=\"radio\" name=\"defaultDifficulty\" ").concat(d.defaultSelected ? 'checked' : '', " data-base=\"difficulty.defaultSelected\" data-index=\"").concat(idx, "\"><span><strong>Selecionar por padr\u00E3o em nova simula\u00E7\u00E3o</strong></span></label></div><button class=\"btn danger small\" type=\"button\" data-action=\"deleteDifficulty\" data-index=\"").concat(idx, "\">Excluir</button></div>"); }).join(''), "</div>");
}
function baseMarginsHtml() {
  return "<div class=\"base-toolbar\"><button class=\"btn secondary\" type=\"button\" data-action=\"addMargin\">Adicionar margem</button></div><div class=\"data-grid\">".concat(store.data.margins.map(function (m, idx) { return "<div class=\"data-card\"><div class=\"field\"><label>Margem desejada</label><input type=\"number\" step=\"0.01\" min=\"0\" max=\"0.99\" value=\"".concat(attr(m), "\" data-base=\"margin\" data-index=\"").concat(idx, "\"><span class=\"hint\">").concat(percent(m), "</span></div><button class=\"btn danger small\" type=\"button\" data-action=\"deleteMargin\" data-index=\"").concat(idx, "\">Excluir</button></div>"); }).join(''), "</div>");
}
function backupHtml() {
  return "<div class=\"data-grid\"><div class=\"data-card\"><h3>Exportar / importar</h3><p class=\"hint\">Use para levar a base para outro celular ou computador.</p><div class=\"base-toolbar\"><button class=\"btn\" type=\"button\" data-action=\"exportJson\">Exportar JSON</button><label class=\"btn secondary\" for=\"importJson\">Importar JSON</label><input id=\"importJson\" type=\"file\" accept=\"application/json\" hidden></div></div><div class=\"data-card\"><h3>Restaurar base original</h3><p class=\"hint\">Volta para os dados extra\u00EDdos da planilha. O or\u00E7amento acumulado pode ser limpo separadamente.</p><button class=\"btn danger\" type=\"button\" data-action=\"restoreDefaults\">Restaurar base</button></div></div>";
}
function quoteTotals() {
  var total = store.quote.reduce(function (a, q) { a.finalPrice += parseNum(q.finalPrice); a.totalCost += parseNum(q.totalCost); a.profit += parseNum(q.profit); return a; }, { finalPrice: 0, totalCost: 0, profit: 0 });
  total.margin = total.finalPrice ? total.profit / total.finalPrice : 0;
  total.markup = total.totalCost ? total.finalPrice / total.totalCost : 0;
  return total;
}
function quoteSummaryHtml(totals, count) {
  return "<div class=\"quote-summary\"><div class=\"kpi main\"><span>Total a receber</span><strong>".concat(money(totals.finalPrice), "</strong></div><div class=\"kpi\"><span>Total de gastos</span><strong>").concat(money(totals.totalCost), "</strong></div><div class=\"kpi\"><span>Total de lucro</span><strong>").concat(money(totals.profit), "</strong></div><div class=\"kpi\"><span>Margem geral</span><strong>").concat(percent(totals.margin), "</strong></div><div class=\"kpi compact\"><span>Servi\u00E7os</span><strong>").concat(count, "</strong></div><div class=\"kpi compact\"><span>Markup geral</span><strong>").concat(num(totals.markup, 2), "x</strong></div></div>");
}
function quoteHtml() {
  if (!store.quote.length)
      return '<div class="empty">Nenhum serviço acumulado ainda. Clique em “Simular mais”, configure um serviço e adicione ao orçamento.</div>';
  return "<div class=\"quote-screen-list\">".concat(store.quote.map(function (q, idx) { var _a; return "<div class=\"quote-card\"><div class=\"quote-head\"><div class=\"quote-head-main\"><div class=\"quote-card-number\">".concat(idx + 1, "</div><div><h3>").concat(esc(q.serviceName), "</h3><div class=\"quote-meta\">").concat(esc(q.category), " \u2022 ").concat(esc(((_a = q.difficulty) === null || _a === void 0 ? void 0 : _a.name) || ''), " \u2022 etapas: ").concat((q.stages || []).map(function (s) { return esc(s.name); }).join(', ') || 'nenhuma', "</div></div></div><button class=\"btn danger small\" type=\"button\" data-action=\"removeQuote\" data-index=\"").concat(idx, "\">Remover</button></div><div class=\"quote-values\"><div><span>A receber</span><strong>").concat(money(q.finalPrice), "</strong></div><div><span>Gasto</span><strong>").concat(money(q.totalCost), "</strong></div><div><span>Lucro</span><strong>").concat(money(q.profit), "</strong></div><div><span>Margem</span><strong>").concat(percent(q.margin), "</strong></div></div></div>"); }).join(''), "</div>");
}
document.addEventListener('click', function (ev) {
  var _a, _b;
  var btn = ev.target.closest('[data-action]');
  if (!btn)
      return;
  var action = btn.dataset.action;
  if (action === 'home') {
      showScreen('home');
      renderHome();
  }
  if (action === 'startWizard') {
      currentStep = 1;
      renderWizard();
      showScreen('wizard');
  }
  if (action === 'openBase') {
      renderBase();
      showScreen('base');
  }
  if (action === 'openRules') {
      renderRules();
      showScreen('rules');
  }
  if (action === 'goSummary' || action === 'openQuote') {
      renderQuoteScreen();
      showScreen('quote');
  }
  if (action === 'nextStep') {
      if (currentStep < 6) {
          currentStep++;
          renderWizard();
          safeScrollTop();
      }
  }
  if (action === 'prevStep') {
      if (currentStep > 1) {
          currentStep--;
          renderWizard();
          safeScrollTop();
      }
  }
  if (action === 'step') {
      currentStep = parseInt(btn.dataset.step, 10);
      renderWizard();
  }
  if (action === 'addProductRow') {
      store.sim.products.push({ productId: ((_a = store.data.products[0]) === null || _a === void 0 ? void 0 : _a.id) || '', quantity: 0 });
      saveStore(false);
      renderWizard();
  }
  if (action === 'removeProductRow') {
      store.sim.products.splice(parseInt(btn.dataset.index, 10), 1);
      store.sim = normalizeSim(store.sim, store.data);
      saveStore(false);
      renderWizard();
  }
  if (action === 'addQuote') {
      var q = __assign(__assign({}, calc()), { id: uid('q'), createdAt: new Date().toISOString() });
      store.quote.push(q);
      saveStore(false);
      toast('Serviço adicionado ao orçamento');
      render();
      renderQuoteScreen();
      showScreen('quote');
  }
  if (action === 'newSimulation') {
      store.sim = defaultSimFromData(store.data);
      currentStep = 1;
      saveStore(false);
      renderWizard();
      toast('Nova simulação iniciada');
      showScreen('wizard');
  }
  if (action === 'clearQuote') {
      if (confirm('Limpar todos os serviços do orçamento acumulado?')) {
          store.quote = [];
          saveStore(false);
          render();
          renderQuoteScreen();
          showScreen('quote', false);
          toast('Orçamento limpo');
      }
  }
  if (action === 'removeQuote') {
      store.quote.splice(parseInt(btn.dataset.index, 10), 1);
      saveStore(false);
      render();
      renderQuoteScreen();
      showScreen('quote', false);
  }
  if (action === 'baseTab') {
      baseTab = btn.dataset.tab;
      renderBase();
  }
  if (action === 'addService') {
      store.data.services.push({ id: uid('srv'), category: ((_b = store.data.categories[0]) === null || _b === void 0 ? void 0 : _b.name) || '', item: 'Novo serviço', typeSize: 'Padrão', porte: 'Pequeno', sizeIndex: 1, baseValue: 0 });
      saveStore(false);
      renderBase();
      toast('Serviço criado');
  }
  if (action === 'deleteService') {
      if (confirm('Excluir este serviço?')) {
          store.data.services.splice(parseInt(btn.dataset.index, 10), 1);
          store.sim = normalizeSim(store.sim, store.data);
          saveStore(false);
          render();
          showScreen('base', false);
      }
  }
  if (action === 'addBaseProduct') {
      store.data.products.push({ id: uid('prd'), name: 'Novo produto', packageValue: 0, volume: 1, unit: 'ml' });
      saveStore(false);
      renderBase();
  }
  if (action === 'deleteProduct') {
      if (confirm('Excluir este produto?')) {
          store.data.products.splice(parseInt(btn.dataset.index, 10), 1);
          store.sim = normalizeSim(store.sim, store.data);
          saveStore(false);
          render();
          showScreen('base', false);
      }
  }
  if (action === 'addCategory') {
      store.data.categories.push({ id: uid('cat'), name: 'Nova categoria' });
      saveStore(false);
      renderBase();
  }
  if (action === 'deleteCategory') {
      store.data.categories.splice(parseInt(btn.dataset.index, 10), 1);
      saveStore(false);
      renderBase();
  }
  if (action === 'addStage') {
      store.data.stages.push({ id: uid('etp'), name: 'Nova etapa', weight: 0, defaultSelected: false });
      saveStore(false);
      renderBase();
  }
  if (action === 'deleteStage') {
      store.data.stages.splice(parseInt(btn.dataset.index, 10), 1);
      store.sim = normalizeSim(store.sim, store.data);
      saveStore(false);
      render();
      showScreen('base', false);
  }
  if (action === 'addDifficulty') {
      store.data.difficulties.push({ id: uid('dif'), name: 'Novo nível', situation: '', weight: 1, defaultSelected: false });
      saveStore(false);
      renderBase();
  }
  if (action === 'deleteDifficulty') {
      store.data.difficulties.splice(parseInt(btn.dataset.index, 10), 1);
      store.sim = normalizeSim(store.sim, store.data);
      saveStore(false);
      render();
      showScreen('base', false);
  }
  if (action === 'addMargin') {
      store.data.margins.push(0.5);
      saveStore(false);
      renderBase();
  }
  if (action === 'deleteMargin') {
      store.data.margins.splice(parseInt(btn.dataset.index, 10), 1);
      saveStore(false);
      renderBase();
  }
  if (action === 'restoreDefaults') {
      if (confirm('Restaurar base original extraída da planilha?')) {
          var keepQuote = store.quote;
          store = { data: clone(DEFAULT_DATA), quote: keepQuote, sim: defaultSimFromData(DEFAULT_DATA) };
          saveStore(false);
          render();
          showScreen('base', false);
          toast('Base restaurada');
      }
  }
  if (action === 'exportJson') {
      exportJson();
  }
});
document.addEventListener('change', function (ev) {
  var _a;
  var el = ev.target;
  if (el.matches('[data-sim="serviceId"]')) {
      store.sim.serviceId = el.value;
      saveStore(false);
      renderWizard();
  }
  if (el.matches('[data-sim="difficultyId"]')) {
      store.sim.difficultyId = el.value;
      saveStore(false);
      renderWizard();
  }
  if (el.matches('[data-stage-check]')) {
      var id_1 = el.value;
      if (el.checked && !store.sim.stageIds.includes(id_1))
          store.sim.stageIds.push(id_1);
      if (!el.checked)
          store.sim.stageIds = store.sim.stageIds.filter(function (x) { return x !== id_1; });
      saveStore(false);
      renderWizard();
  }
  if (el.matches('[data-product-field]')) {
      var card = el.closest('[data-product-row]');
      var idx = parseInt(card.dataset.productRow, 10);
      var field = el.dataset.productField;
      store.sim.products[idx][field] = field === 'quantity' ? parseNum(el.value) : el.value;
      saveStore(false);
      renderWizard();
  }
  if (el.matches('[data-rule]')) {
      var ruleKey = el.dataset.rule;
      store.data.rules[ruleKey] = ruleKey === 'machineHours' ? machineTimeDisplay(el.value) : parseNum(el.value);
      saveStore(false);
      renderWizard();
      renderRules();
      toast('Regras salvas');
  }
  if (el.matches('[data-base]')) {
      updateBase(el);
  }
  if (el.id === 'importJson')
      importJson((_a = el.files) === null || _a === void 0 ? void 0 : _a[0]);
});
document.addEventListener('input', function (ev) {
  var el = ev.target;
  if (el.matches('[data-rule]')) {
      var ruleKey = el.dataset.rule;
      store.data.rules[ruleKey] = ruleKey === 'machineHours' ? el.value : parseNum(el.value);
      saveStore(false);
  }
  if (el.matches('[data-product-field="quantity"]')) {
      var card = el.closest('[data-product-row]');
      var idx = parseInt(card.dataset.productRow, 10);
      store.sim.products[idx].quantity = parseNum(el.value);
      saveStore(false);
  }
});
function updateBase(el) {
  var _a = el.dataset.base.split('.'), kind = _a[0], field = _a[1];
  var idx = parseInt(el.dataset.index, 10);
  var value = el.type === 'checkbox' ? el.checked : (el.type === 'radio' ? el.checked : el.value);
  if (kind === 'service')
      store.data.services[idx][field] = ['sizeIndex', 'baseValue'].includes(field) ? parseNum(value) : value;
  if (kind === 'product')
      store.data.products[idx][field] = ['packageValue', 'volume'].includes(field) ? parseNum(value) : value;
  if (kind === 'category')
      store.data.categories[idx].name = value;
  if (kind === 'stage')
      store.data.stages[idx][field] = field === 'weight' ? parseNum(value) : (field === 'defaultSelected' ? !!value : value);
  if (kind === 'difficulty') {
      if (field === 'defaultSelected' && value) {
          store.data.difficulties.forEach(function (d, i) { return d.defaultSelected = i === idx; });
          store.data.defaults.difficultyId = store.data.difficulties[idx].id;
      }
      else
          store.data.difficulties[idx][field] = field === 'weight' ? parseNum(value) : value;
  }
  if (kind === 'margin')
      store.data.margins[idx] = parseNum(el.value);
  if (kind === 'stage' && field === 'defaultSelected')
      store.data.defaults.stageIds = store.data.stages.filter(function (s) { return s.defaultSelected; }).map(function (s) { return s.id; });
  saveStore(false);
  updateInlineBaseDisplays(el, kind, idx);
  renderHome();
  renderWizard();
  toast('Base salva');
}
function updateInlineBaseDisplays(el, kind, idx) {
  var card = el.closest('.data-card');
  if (!card)
      return;
  if (kind === 'product') {
      var p = store.data.products[idx];
      var display = card.querySelector('[data-unit-cost-display]');
      if (display)
          display.value = money(productUnitCost(p));
      var main = card.querySelector('[data-summary-main]');
      var sub = card.querySelector('[data-summary-sub]');
      if (main)
          main.textContent = p.name || 'Produto sem nome';
      if (sub)
          sub.textContent = "".concat(money(productUnitCost(p)), "/").concat(p.unit || 'un');
  }
  if (kind === 'service') {
      var srv = store.data.services[idx];
      var main = card.querySelector('[data-summary-main]');
      var sub = card.querySelector('[data-summary-sub]');
      if (main)
          main.textContent = serviceLabel(srv);
      if (sub)
          sub.textContent = money(srv.baseValue);
  }
}
function exportJson() {
  var blob = new Blob([JSON.stringify(store.data, null, 2)], { type: 'application/json;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'base-atmos-clean.json';
  a.click();
  URL.revokeObjectURL(url);
}
function importJson(file) {
  return __awaiter(this, void 0, void 0, function () {
      var text, data, e_1;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  if (!file)
                      return [2 /*return*/];
                  _a.label = 1;
              case 1:
                  _a.trys.push([1, 3, , 4]);
                  return [4 /*yield*/, file.text()];
              case 2:
                  text = _a.sent();
                  data = JSON.parse(text);
                  store.data = mergeData(data);
                  store.sim = defaultSimFromData(store.data);
                  saveStore(false);
                  render();
                  showScreen('base', false);
                  toast('Base importada');
                  return [3 /*break*/, 4];
              case 3:
                  e_1 = _a.sent();
                  alert('Não consegui importar esse JSON.');
                  return [3 /*break*/, 4];
              case 4: return [2 /*return*/];
          }
      });
  });
}
document.addEventListener('DOMContentLoaded', render);
if (document.readyState !== 'loading')
  render();