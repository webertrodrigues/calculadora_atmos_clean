(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.MultiServiceEngine = api;
  Object.keys(api).forEach(function (key) {
    root[key] = api[key];
  });
})(typeof globalThis !== 'undefined' ? globalThis : window, function () {
  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function isObject(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
  }

  function toNumber(value, fallback) {
    if (fallback === void 0) { fallback = 0; }
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : fallback;
    }
    if (typeof value === 'bigint') {
      return Number(value);
    }
    if (value == null) {
      return fallback;
    }
    var raw = String(value).trim();
    if (!raw) {
      return fallback;
    }
    var normalized = raw.replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
    var parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function toCents(value) {
    return Math.round(toNumber(value, 0) * 100);
  }

  function centsToCurrencyString(cents) {
    var amount = toNumber(cents, 0) / 100;
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function percentString(value) {
    return toNumber(value, 0).toLocaleString('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function createId(prefix) {
    return (prefix || 'id') + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function nonNegativeCents(value) {
    return Math.max(0, Math.round(toNumber(value, 0)));
  }

  function nonNegativeNumber(value, fallback) {
    if (fallback === void 0) { fallback = 0; }
    return Math.max(0, toNumber(value, fallback));
  }

  function defaultCatalogServiceId(data) {
    return asArray(data && data.services)[0] ? asArray(data.services)[0].id : '';
  }

  function defaultDifficultyId(data) {
    var difficulties = asArray(data && data.difficulties);
    var selected = difficulties.find(function (item) { return item && item.defaultSelected; });
    return (selected && selected.id) || (difficulties[0] && difficulties[0].id) || '';
  }

  function defaultStageIds(data) {
    return asArray(data && data.stages).filter(function (stage) { return stage && stage.defaultSelected; }).map(function (stage) { return stage.id; });
  }

  function defaultProductRows(data) {
    var products = asArray(data && data.products);
    if (!products.length) {
      return [{ productId: '', quantity: 0 }];
    }
    return [{ productId: products[0].id, quantity: 0 }];
  }

  function normalizeProductRow(row, data) {
    row = isObject(row) ? row : {};
    var products = asArray(data && data.products);
    return {
      id: row.id || createId('mprod'),
      productId: row.productId || ((products[0] && products[0].id) || ''),
      quantity: nonNegativeNumber(row.quantity, 0)
    };
  }

  function normalizeExclusiveCost(row) {
    row = isObject(row) ? row : {};
    return {
      id: row.id || createId('xcost'),
      name: row.name || 'Custo exclusivo',
      category: row.category || 'other',
      amountCents: nonNegativeCents(row.amountCents != null ? row.amountCents : row.amount || row.value),
      notes: row.notes || ''
    };
  }

  function normalizeGenericCostRow(row, defaultName) {
    row = isObject(row) ? row : {};
    return {
      id: row.id || createId('gcost'),
      name: row.name || defaultName || 'Item',
      quantity: nonNegativeNumber(row.quantity != null ? row.quantity : row.hours, 0),
      unit: row.unit || '',
      unitCostCents: nonNegativeCents(row.unitCostCents != null ? row.unitCostCents : row.unitCost || 0),
      totalCostCents: nonNegativeCents(row.totalCostCents != null ? row.totalCostCents : row.total || 0),
      notes: row.notes || ''
    };
  }

  function normalizeSharedCost(row) {
    row = isObject(row) ? row : {};
    var method = row.allocationMethod || row.rateioMethod || 'proportional_direct_cost';
    return {
      id: row.id || createId('shared'),
      name: row.name || 'Custo compartilhado',
      category: row.category || 'other',
      description: row.description || '',
      calculationType: row.calculationType || 'fixed',
      fixedAmountCents: nonNegativeCents(row.fixedAmountCents != null ? row.fixedAmountCents : row.fixedAmount || row.totalCostCents || row.total || 0),
      quantity: nonNegativeNumber(row.quantity, 1),
      unitCostCents: nonNegativeCents(row.unitCostCents != null ? row.unitCostCents : row.unitCost || 0),
      unit: row.unit || '',
      linkedServiceIds: asArray(row.linkedServiceIds || row.serviceIds).slice(),
      allocationMethod: method,
      manualAllocations: asArray(row.manualAllocations).map(function (allocation) {
        allocation = isObject(allocation) ? allocation : {};
        return {
          serviceId: allocation.serviceId || '',
          percent: toNumber(allocation.percent, 0),
          amountCents: nonNegativeCents(allocation.amountCents != null ? allocation.amountCents : allocation.amount || 0)
        };
      }),
      markupPolicy: row.markupPolicy || 'inherit_simulation',
      notes: row.notes || ''
    };
  }

  function normalizeService(row, data, fallbackGroupId, index) {
    row = isObject(row) ? row : {};
    var catalogId = row.serviceCatalogId || row.catalogServiceId || row.serviceId || defaultCatalogServiceId(data);
    var catalog = asArray(data && data.services).find(function (item) { return item && item.id === catalogId; }) || {};
    return {
      id: row.id || createId('svc'),
      name: row.name || catalog.item || ('Serviço ' + (index + 1)),
      serviceCatalogId: catalogId,
      quantity: nonNegativeNumber(row.quantity, 1),
      unit: row.unit || 'serviço',
      executionGroupId: row.executionGroupId || fallbackGroupId || '',
      difficultyId: row.difficultyId || defaultDifficultyId(data),
      stageIds: asArray(row.stageIds).filter(function (id) {
        return asArray(data && data.stages).some(function (stage) { return stage && stage.id === id; });
      }),
      products: asArray(row.products).map(function (product) { return normalizeProductRow(product, data); }),
      processes: asArray(row.processes).map(function (item) { return normalizeGenericCostRow(item, 'Processo'); }),
      labor: asArray(row.labor).map(function (item) { return normalizeGenericCostRow(item, 'Mão de obra'); }),
      equipmentUsage: asArray(row.equipmentUsage).map(function (item) { return normalizeGenericCostRow(item, 'Equipamento'); }),
      exclusiveCosts: asArray(row.exclusiveCosts).map(normalizeExclusiveCost),
      pricingSettings: isObject(row.pricingSettings) ? clone(row.pricingSettings) : {},
      notes: row.notes || '',
      expanded: row.expanded !== false
    };
  }

  function normalizeExecutionGroup(row, data, index) {
    row = isObject(row) ? row : {};
    return {
      id: row.id || createId('group'),
      name: row.name || ('Grupo ' + (index + 1)),
      address: row.address || '',
      executionDate: row.executionDate || '',
      serviceIds: asArray(row.serviceIds).slice(),
      sharedCosts: asArray(row.sharedCosts).map(normalizeSharedCost),
      notes: row.notes || ''
    };
  }

  function createDefaultMultiSimulation(data) {
    var groupId = createId('group');
    return {
      id: createId('multi'),
      type: 'multi_service',
      schemaVersion: 2,
      name: 'Simulação multisserviço',
      customer: { name: '', address: '', city: '' },
      address: '',
      city: '',
      date: '',
      observations: '',
      responsible: '',
      status: 'rascunho',
      validityDays: 7,
      services: [
        normalizeService({
          id: createId('svc'),
          name: 'Serviço 1',
          serviceCatalogId: defaultCatalogServiceId(data),
          quantity: 1,
          unit: 'serviço',
          executionGroupId: groupId,
          difficultyId: defaultDifficultyId(data),
          stageIds: defaultStageIds(data),
        products: defaultProductRows(data),
        processes: [],
        labor: [],
        equipmentUsage: [],
        exclusiveCosts: [],
        pricingSettings: {}
      }, data, groupId, 0)
      ],
      executionGroups: [
        {
          id: groupId,
          name: 'Grupo de execução 1',
          address: '',
          executionDate: '',
          serviceIds: [],
          sharedCosts: [],
          notes: ''
        }
      ],
      calculations: {
        totalDirectCostCents: 0,
        totalSharedCostCents: 0,
        totalCostCents: 0,
        totalSalePriceCents: 0,
        totalProfitCents: 0,
        marginPercentage: 0
      }
    };
  }

  function normalizeMultiSimulation(simulation, data) {
    var next = isObject(simulation) ? clone(simulation) : {};
    var catalog = data || {};
    if (!next.id) next.id = createId('multi');
    next.type = next.type || 'multi_service';
    next.schemaVersion = Math.max(2, Math.round(toNumber(next.schemaVersion, 2)));
    next.name = next.name || 'Simulação multisserviço';
    next.customer = isObject(next.customer) ? clone(next.customer) : { name: '', address: '', city: '' };
    next.address = next.address || '';
    next.city = next.city || '';
    next.date = next.date || '';
    next.observations = next.observations || '';
    next.responsible = next.responsible || '';
    next.status = next.status || 'rascunho';
    next.validityDays = nonNegativeNumber(next.validityDays, 7);

    next.executionGroups = asArray(next.executionGroups).map(function (group, index) {
      return normalizeExecutionGroup(group, catalog, index);
    });
    if (!next.executionGroups.length) {
      next.executionGroups.push(normalizeExecutionGroup({ id: createId('group'), name: 'Grupo de execução 1' }, catalog, 0));
    }

    next.services = asArray(next.services).map(function (service, index) {
      return normalizeService(service, catalog, next.executionGroups[0].id, index);
    });
    if (!next.services.length) {
      next.services.push(normalizeService({
        id: createId('svc'),
        name: 'Serviço 1',
        serviceCatalogId: defaultCatalogServiceId(catalog),
        quantity: 1,
        unit: 'serviço',
        executionGroupId: next.executionGroups[0].id,
        difficultyId: defaultDifficultyId(catalog),
        stageIds: defaultStageIds(catalog),
          products: defaultProductRows(catalog),
          processes: [],
          labor: [],
          equipmentUsage: [],
          exclusiveCosts: [],
          pricingSettings: {}
        }, catalog, next.executionGroups[0].id, 0));
    }

    var groupMap = {};
    next.executionGroups.forEach(function (group) {
      group.serviceIds = [];
      group.sharedCosts = asArray(group.sharedCosts).map(normalizeSharedCost);
      groupMap[group.id] = group;
    });

    next.services.forEach(function (service, index) {
      if (!groupMap[service.executionGroupId]) {
        service.executionGroupId = next.executionGroups[0].id;
      }
      var group = groupMap[service.executionGroupId] || next.executionGroups[0];
      if (group.serviceIds.indexOf(service.id) < 0) {
        group.serviceIds.push(service.id);
      }
      service.products = asArray(service.products).map(function (row) { return normalizeProductRow(row, catalog); });
      service.processes = asArray(service.processes).map(function (row) { return normalizeGenericCostRow(row, 'Processo'); });
      service.labor = asArray(service.labor).map(function (row) { return normalizeGenericCostRow(row, 'Mão de obra'); });
      service.equipmentUsage = asArray(service.equipmentUsage).map(function (row) { return normalizeGenericCostRow(row, 'Equipamento'); });
      service.exclusiveCosts = asArray(service.exclusiveCosts).map(normalizeExclusiveCost);
      service.quantity = nonNegativeNumber(service.quantity, 1);
      service.name = service.name || ('Serviço ' + (index + 1));
      service.unit = service.unit || 'serviço';
      service.notes = service.notes || '';
      service.expanded = service.expanded !== false;
    });

    next.executionGroups.forEach(function (group) {
      if (!asArray(group.serviceIds).length) {
        group.serviceIds = next.services.filter(function (service) { return service.executionGroupId === group.id; }).map(function (service) { return service.id; });
      }
    });

    next.calculations = isObject(next.calculations) ? clone(next.calculations) : {
      totalDirectCostCents: 0,
      totalSharedCostCents: 0,
      totalCostCents: 0,
      totalSalePriceCents: 0,
      totalProfitCents: 0,
      marginPercentage: 0
    };

    return next;
  }

  function calculateServiceDirectCost(service, context) {
    context = isObject(context) ? context : {};
    var data = context.data || {};
    var catalog = asArray(data.services).find(function (item) { return item && item.id === service.serviceCatalogId; }) || {};
    var difficulty = asArray(data.difficulties).find(function (item) { return item && item.id === service.difficultyId; }) || asArray(data.difficulties)[0] || { weight: 0 };
    var stages = asArray(data.stages).filter(function (stage) { return asArray(service.stageIds).indexOf(stage.id) >= 0; });
    var stageFactor = stages.reduce(function (sum, stage) { return sum + nonNegativeNumber(stage.weight, 0); }, 0);
    var difficultyFactor = nonNegativeNumber(difficulty.weight, 0);
    var sizeFactor = nonNegativeNumber(service.pricingSettings && service.pricingSettings.sizeFactorOverride != null ? service.pricingSettings.sizeFactorOverride : catalog.sizeIndex, 0);
    var baseValueCents = toCents(service.pricingSettings && service.pricingSettings.baseValueCents != null ? service.pricingSettings.baseValueCents : catalog.baseValue || 0);
    var quantity = nonNegativeNumber(service.quantity, 1);
    var salePriceCents = Math.max(0, Math.round(baseValueCents * difficultyFactor * stageFactor * sizeFactor * quantity));
    var productCostCents = asArray(service.products).reduce(function (sum, row) {
      var product = asArray(data.products).find(function (item) { return item && item.id === row.productId; }) || null;
      if (!product) return sum;
      var packageValueCents = toCents(product.packageValue || 0);
      var volume = nonNegativeNumber(product.volume, 0);
      if (volume <= 0) return sum;
      var unitCostCents = Math.round(packageValueCents / volume);
      return sum + Math.max(0, Math.round(nonNegativeNumber(row.quantity, 0) * unitCostCents * quantity));
    }, 0);
    var processCostCents = asArray(service.processes).reduce(function (sum, row) {
      var total = row.totalCostCents;
      if (!total) total = Math.round(nonNegativeNumber(row.quantity, 0) * nonNegativeCents(row.unitCostCents));
      return sum + Math.max(0, Math.round(total * quantity));
    }, 0);
    var laborCostCents = asArray(service.labor).reduce(function (sum, row) {
      var total = row.totalCostCents;
      if (!total) total = Math.round(nonNegativeNumber(row.quantity, 0) * nonNegativeCents(row.unitCostCents));
      return sum + Math.max(0, Math.round(total * quantity));
    }, 0);
    var equipmentCostCents = asArray(service.equipmentUsage).reduce(function (sum, row) {
      var total = row.totalCostCents;
      if (!total) total = Math.round(nonNegativeNumber(row.quantity, 0) * nonNegativeCents(row.unitCostCents));
      return sum + Math.max(0, Math.round(total * quantity));
    }, 0);
    var exclusiveCostCents = asArray(service.exclusiveCosts).reduce(function (sum, row) {
      return sum + Math.max(0, Math.round(nonNegativeCents(row.amountCents) * quantity));
    }, 0);
    var directCostCents = productCostCents + processCostCents + laborCostCents + equipmentCostCents + exclusiveCostCents;
    return {
      serviceId: service.id,
      serviceCatalogId: service.serviceCatalogId,
      quantity: quantity,
      stageFactor: stageFactor,
      difficultyFactor: difficultyFactor,
      sizeFactor: sizeFactor,
      baseValueCents: baseValueCents,
      productCostCents: productCostCents,
      processCostCents: processCostCents,
      laborCostCents: laborCostCents,
      equipmentCostCents: equipmentCostCents,
      exclusiveCostCents: exclusiveCostCents,
      directCostCents: directCostCents,
      salePriceCents: salePriceCents,
      profitCents: salePriceCents - directCostCents,
      marginPercentage: salePriceCents ? (salePriceCents - directCostCents) / salePriceCents : 0,
      catalogServiceName: catalog.item || '',
      groupId: service.executionGroupId
    };
  }

  function pickAllocationTargets(sharedCost, services) {
    var ids = asArray(sharedCost.linkedServiceIds).filter(function (id) {
      return asArray(services).some(function (service) { return service && service.id === id; });
    });
    if (!ids.length && sharedCost.allocationMethod !== 'none') {
      ids = asArray(services).map(function (service) { return service.id; });
    }
    return ids;
  }

  function distributeCents(totalCents, targets, weightResolver) {
    if (!targets.length || totalCents <= 0) {
      return targets.map(function (target) {
        return { serviceId: target.id, cents: 0 };
      });
    }
    var weights = targets.map(function (target, index) {
      return Math.max(0, toNumber(weightResolver(target, index), 0));
    });
    var totalWeight = weights.reduce(function (sum, weight) { return sum + weight; }, 0);
    var fallbackUsed = false;
    if (totalWeight <= 0) {
      fallbackUsed = true;
      weights = targets.map(function () { return 1; });
      totalWeight = targets.length;
    }
    var raw = targets.map(function (_target, index) {
      return totalCents * weights[index] / totalWeight;
    });
    var allocated = raw.map(function (value) { return Math.floor(value); });
    var remainder = totalCents - allocated.reduce(function (sum, value) { return sum + value; }, 0);
    var ranked = targets.map(function (target, index) {
      return {
        index: index,
        weight: weights[index],
        fraction: raw[index] - Math.floor(raw[index])
      };
    }).sort(function (a, b) {
      if (b.weight !== a.weight) return b.weight - a.weight;
      if (b.fraction !== a.fraction) return b.fraction - a.fraction;
      return a.index - b.index;
    });
    var pointer = 0;
    while (remainder > 0 && ranked.length) {
      allocated[ranked[pointer].index] += 1;
      pointer = (pointer + 1) % ranked.length;
      remainder -= 1;
    }
    return {
      allocations: targets.map(function (target, index) {
        return { serviceId: target.id, cents: allocated[index] };
      }),
      fallbackUsed: fallbackUsed
    };
  }

  function calculateSharedCost(sharedCost, context) {
    context = isObject(context) ? context : {};
    var services = asArray(context.services);
    var totalCents = 0;
    var quantity = nonNegativeNumber(sharedCost.quantity, 0);
    var unitCostCents = nonNegativeCents(sharedCost.unitCostCents);
    if (sharedCost.calculationType === 'quantity_unit') {
      totalCents = Math.round(quantity * unitCostCents);
    } else if (sharedCost.calculationType === 'hours' || sharedCost.calculationType === 'days' || sharedCost.calculationType === 'kilometers') {
      totalCents = Math.round(quantity * unitCostCents);
    } else if (sharedCost.calculationType === 'manual') {
      totalCents = nonNegativeCents(sharedCost.fixedAmountCents);
    } else {
      totalCents = nonNegativeCents(sharedCost.fixedAmountCents);
    }
    var targets = pickAllocationTargets(sharedCost, services);
    var allocations = targets.map(function (id) { return ({ serviceId: id, cents: 0 }); });
    var fallbackUsed = false;
    if (sharedCost.allocationMethod !== 'none' && targets.length) {
      var serviceTargets = targets.map(function (id) {
        return services.find(function (service) { return service && service.id === id; });
      }).filter(Boolean);
      var allocationResult = null;
      if (sharedCost.allocationMethod === 'equal') {
        allocationResult = distributeCents(totalCents, serviceTargets, function () { return 1; });
      } else if (sharedCost.allocationMethod === 'proportional_sale_price') {
        allocationResult = distributeCents(totalCents, serviceTargets, function (service) { return service.salePriceCents; });
      } else if (sharedCost.allocationMethod === 'proportional_quantity') {
        allocationResult = distributeCents(totalCents, serviceTargets, function (service) { return service.quantity; });
      } else if (sharedCost.allocationMethod === 'manual_percent') {
        var manualWeights = serviceTargets.map(function (service) {
          var allocation = asArray(sharedCost.manualAllocations).find(function (item) { return item && item.serviceId === service.id; }) || {};
          return Math.max(0, toNumber(allocation.percent, 0));
        });
        allocationResult = distributeCents(totalCents, serviceTargets, function (_service, index) { return manualWeights[index]; });
      } else if (sharedCost.allocationMethod === 'manual_value') {
        var manualValueWeights = serviceTargets.map(function (service) {
          var allocation = asArray(sharedCost.manualAllocations).find(function (item) { return item && item.serviceId === service.id; }) || {};
          return Math.max(0, nonNegativeCents(allocation.amountCents));
        });
        allocationResult = distributeCents(totalCents, serviceTargets, function (_service, index) { return manualValueWeights[index]; });
      } else {
        allocationResult = distributeCents(totalCents, serviceTargets, function (service) { return service.directCostCents; });
        if (allocationResult.fallbackUsed) {
          fallbackUsed = true;
        }
      }
      if (allocationResult) {
        allocations = allocationResult.allocations;
        fallbackUsed = fallbackUsed || allocationResult.fallbackUsed;
      }
    }
    return {
      id: sharedCost.id,
      name: sharedCost.name,
      category: sharedCost.category,
      calculationType: sharedCost.calculationType,
      allocationMethod: sharedCost.allocationMethod,
      totalCostCents: totalCents,
      linkedServiceIds: targets.slice(),
      allocations: allocations,
      fallbackUsed: fallbackUsed,
      manualAllocations: clone(sharedCost.manualAllocations || []),
      notes: sharedCost.notes || ''
    };
  }

  function calculateExecutionGroup(group, services, context) {
    context = isObject(context) ? context : {};
    var serviceMap = {};
    asArray(services).forEach(function (service) {
      serviceMap[service.id] = service;
    });
    var groupServices = asArray(group.serviceIds).map(function (id) { return serviceMap[id]; }).filter(Boolean);
    var sharedCosts = asArray(group.sharedCosts).map(function (sharedCost) {
      return calculateSharedCost(sharedCost, { services: groupServices, data: context.data });
    });
    var sharedCostTotalCents = sharedCosts.reduce(function (sum, sharedCost) { return sum + sharedCost.totalCostCents; }, 0);
    var allocationMap = {};
    groupServices.forEach(function (service) { allocationMap[service.id] = 0; });
    sharedCosts.forEach(function (sharedCost) {
      sharedCost.allocations.forEach(function (allocation) {
        allocationMap[allocation.serviceId] = (allocationMap[allocation.serviceId] || 0) + allocation.cents;
      });
    });
    return {
      id: group.id,
      name: group.name,
      address: group.address || '',
      executionDate: group.executionDate || '',
      serviceIds: asArray(group.serviceIds).slice(),
      serviceCount: groupServices.length,
      sharedCosts: sharedCosts,
      sharedCostTotalCents: sharedCostTotalCents,
      allocationsByServiceId: allocationMap,
      hasEmptyServices: !groupServices.length
    };
  }

  function validateMultiServiceSimulation(simulation, data, calculations) {
    var errors = [];
    var warnings = [];
    var multi = normalizeMultiSimulation(simulation, data);
    var calc = calculations || calculateMultiServiceSimulation(multi, data);
    if (!multi.services.length) {
      errors.push('A simulação deve possuir ao menos um serviço.');
    }
    multi.services.forEach(function (service, index) {
      if (!service.executionGroupId) {
        errors.push('O serviço ' + (index + 1) + ' não possui grupo de execução.');
      }
      if (service.quantity < 0) {
        errors.push('A quantidade do serviço ' + (index + 1) + ' não pode ser negativa.');
      }
      asArray(service.products).forEach(function (row) {
        if (row.quantity < 0) {
          errors.push('Produto com quantidade negativa no serviço ' + (index + 1) + '.');
        }
      });
      asArray(service.exclusiveCosts).forEach(function (row) {
        if (row.amountCents < 0) {
          errors.push('Custo exclusivo negativo no serviço ' + (index + 1) + '.');
        }
      });
      asArray(service.processes).forEach(function (row) {
        if (row.quantity < 0 || row.unitCostCents < 0 || row.totalCostCents < 0) {
          errors.push('Processo inválido no serviço ' + (index + 1) + '.');
        }
      });
      asArray(service.labor).forEach(function (row) {
        if (row.quantity < 0 || row.unitCostCents < 0 || row.totalCostCents < 0) {
          errors.push('Mão de obra inválida no serviço ' + (index + 1) + '.');
        }
      });
      asArray(service.equipmentUsage).forEach(function (row) {
        if (row.quantity < 0 || row.unitCostCents < 0 || row.totalCostCents < 0) {
          errors.push('Equipamento inválido no serviço ' + (index + 1) + '.');
        }
      });
    });
    multi.executionGroups.forEach(function (group, index) {
      if (!asArray(group.serviceIds).length) {
        warnings.push('O grupo ' + (index + 1) + ' está vazio.');
      }
    });
    multi.executionGroups.forEach(function (group, groupIndex) {
      asArray(group.sharedCosts).forEach(function (sharedCost, sharedIndex) {
        if (sharedCost.fixedAmountCents < 0 || sharedCost.unitCostCents < 0) {
          errors.push('Custo compartilhado negativo no grupo ' + (groupIndex + 1) + '.');
        }
        if (sharedCost.allocationMethod === 'manual_percent') {
          var totalPercent = asArray(sharedCost.manualAllocations).reduce(function (sum, allocation) {
            return sum + Math.max(0, toNumber(allocation.percent, 0));
          }, 0);
          if (Math.abs(totalPercent - 100) > 0.0001) {
            errors.push('O rateio percentual manual do custo ' + (sharedIndex + 1) + ' deve somar 100%.');
          }
        }
        if (sharedCost.allocationMethod === 'manual_value') {
          var totalManual = asArray(sharedCost.manualAllocations).reduce(function (sum, allocation) {
            return sum + Math.max(0, nonNegativeCents(allocation.amountCents));
          }, 0);
          if (totalManual !== sharedCost.totalCostCents) {
            errors.push('O rateio monetário manual do custo ' + (sharedIndex + 1) + ' deve somar o total compartilhado.');
          }
        }
        if (sharedCost.allocationMethod !== 'none' && !pickAllocationTargets(sharedCost, calc.serviceRows).length) {
          errors.push('O custo compartilhado ' + (sharedIndex + 1) + ' precisa estar ligado a pelo menos um serviço.');
        }
        if (sharedCost.allocationMethod !== 'none' && sharedCost.calculationType === 'manual' && sharedCost.totalCostCents < 0) {
          errors.push('Custo manual inválido no grupo ' + (groupIndex + 1) + '.');
        }
      });
    });
    if (calc.fallbackWarnings.length) {
      warnings = warnings.concat(calc.fallbackWarnings);
    }
    return {
      valid: errors.length === 0,
      blocking: errors.slice(),
      warnings: warnings.slice()
    };
  }

  function calculateMultiServiceSimulation(simulation, data) {
    var multi = normalizeMultiSimulation(simulation, data);
    var serviceRows = multi.services.map(function (service) {
      return calculateServiceDirectCost(service, { data: data, multi: multi });
    });
    var serviceMap = {};
    serviceRows.forEach(function (row) {
      serviceMap[row.serviceId] = row;
    });

    var groupRows = multi.executionGroups.map(function (group) {
      return calculateExecutionGroup(group, serviceRows.map(function (row) {
        var source = multi.services.find(function (service) { return service.id === row.serviceId; });
        return {
          id: row.serviceId,
          quantity: row.quantity,
          directCostCents: row.directCostCents,
          salePriceCents: row.salePriceCents,
          executionGroupId: source ? source.executionGroupId : group.id
        };
      }), { data: data });
    });

    var sharedAllocationByServiceId = {};
    groupRows.forEach(function (groupRow) {
      groupRow.allocationsByServiceId = groupRow.allocationsByServiceId || {};
      Object.keys(groupRow.allocationsByServiceId).forEach(function (serviceId) {
        sharedAllocationByServiceId[serviceId] = (sharedAllocationByServiceId[serviceId] || 0) + groupRow.allocationsByServiceId[serviceId];
      });
    });

    serviceRows = serviceRows.map(function (row) {
      var allocatedSharedCostCents = sharedAllocationByServiceId[row.serviceId] || 0;
      var managerialCostCents = row.directCostCents + allocatedSharedCostCents;
      return {
      serviceId: row.serviceId,
        serviceCatalogId: row.serviceCatalogId,
        name: ((multi.services.find(function (service) { return service.id === row.serviceId; }) || {}).name) || row.catalogServiceName,
        groupId: row.groupId,
        quantity: row.quantity,
        directCostCents: row.directCostCents,
        allocatedSharedCostCents: allocatedSharedCostCents,
        managerialCostCents: managerialCostCents,
        salePriceCents: row.salePriceCents,
        profitCents: row.salePriceCents - managerialCostCents,
        marginPercentage: row.salePriceCents ? (row.salePriceCents - managerialCostCents) / row.salePriceCents : 0,
        productCostCents: row.productCostCents,
        exclusiveCostCents: row.exclusiveCostCents,
        catalogServiceName: row.catalogServiceName
      };
    });

    var totalDirectCostCents = serviceRows.reduce(function (sum, row) { return sum + row.directCostCents; }, 0);
    var totalSharedCostCents = groupRows.reduce(function (sum, row) { return sum + row.sharedCostTotalCents; }, 0);
    var totalCostCents = totalDirectCostCents + totalSharedCostCents;
    var totalSalePriceCents = serviceRows.reduce(function (sum, row) { return sum + row.salePriceCents; }, 0);
    var totalProfitCents = totalSalePriceCents - totalCostCents;
    var marginPercentage = totalSalePriceCents ? totalProfitCents / totalSalePriceCents : 0;
    var fallbackWarnings = [];
    groupRows.forEach(function (groupRow) {
      groupRow.sharedCosts.forEach(function (sharedCost) {
        if (sharedCost.fallbackUsed) {
          fallbackWarnings.push('Rateio do custo "' + sharedCost.name + '" caiu para divisão igual.');
        }
      });
    });

    return {
      simulation: multi,
      serviceRows: serviceRows,
      groupRows: groupRows.map(function (groupRow) {
        return {
          id: groupRow.id,
          name: groupRow.name,
          serviceCount: groupRow.serviceCount,
          sharedCostTotalCents: groupRow.sharedCostTotalCents,
          serviceIds: groupRow.serviceIds.slice(),
          sharedCosts: groupRow.sharedCosts.slice(),
          hasEmptyServices: groupRow.hasEmptyServices
        };
      }),
      summary: {
        serviceCount: multi.services.length,
        groupCount: multi.executionGroups.length,
        totalDirectCostCents: totalDirectCostCents,
        totalSharedCostCents: totalSharedCostCents,
        totalCostCents: totalCostCents,
        totalSalePriceCents: totalSalePriceCents,
        totalProfitCents: totalProfitCents,
        marginPercentage: marginPercentage
      },
      fallbackWarnings: fallbackWarnings,
      calculationByServiceId: serviceRows.reduce(function (acc, row) {
        acc[row.serviceId] = row;
        return acc;
      }, {})
    };
  }

  return {
    clone: clone,
    toNumber: toNumber,
    toCents: toCents,
    centsToCurrencyString: centsToCurrencyString,
    percentString: percentString,
    createId: createId,
    createDefaultMultiSimulation: createDefaultMultiSimulation,
    normalizeMultiSimulation: normalizeMultiSimulation,
    calculateServiceDirectCost: calculateServiceDirectCost,
    calculateSharedCost: calculateSharedCost,
    calculateExecutionGroup: calculateExecutionGroup,
    calculateMultiServiceSimulation: calculateMultiServiceSimulation,
    validateMultiServiceSimulation: validateMultiServiceSimulation
  };
});
