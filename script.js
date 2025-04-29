// URL base da API
const API_URL = 'http://localhost:3000/api'; // Substitua pelo URL do seu backend

// Funções para gerenciamento de Check-ins
async function carregarCheckins() {
  try {
    const response = await fetch(`${API_URL}/checkins`);
    if (!response.ok) {
      throw new Error('Falha ao carregar check-ins');
    }
    const checkins = await response.json();
    
    // Limpar a tabela
    const tbody = document.querySelector('#checkin-tabela tbody');
    tbody.innerHTML = '';
    
    // Adicionar cada check-in à tabela
    checkins.forEach(checkin => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${checkin.matricula}</td>
        <td>${checkin.entrada}</td>
        <td>${checkin.saida || '-'}</td>
        <td class="acoes">
          <button class="btn-editar" onclick="editarCheckin('${checkin.id}')">Editar</button>
          <button class="btn-deletar" onclick="deletarCheckin('${checkin.id}')">Deletar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Erro ao carregar check-ins:', error);
    alert('Erro ao carregar check-ins. Verifique o console para mais detalhes.');
  }
}

async function salvarCheckin(dados) {
  try {
    const url = dados.id ? `${API_URL}/checkins/${dados.id}` : `${API_URL}/checkins`;
    const method = dados.id ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    
    if (!response.ok) {
      throw new Error('Falha ao salvar check-in');
    }
    
    // Recarregar a lista de check-ins
    carregarCheckins();
    
    return true;
  } catch (error) {
    console.error('Erro ao salvar check-in:', error);
    alert('Erro ao salvar check-in. Verifique o console para mais detalhes.');
    return false;
  }
}

async function deletarCheckin(id) {
  if (confirm(`Deseja realmente excluir este check-in?`)) {
    try {
      const response = await fetch(`${API_URL}/checkins/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Falha ao excluir check-in');
      }
      
      // Recarregar a lista de check-ins
      carregarCheckins();
    } catch (error) {
      console.error('Erro ao excluir check-in:', error);
      alert('Erro ao excluir check-in. Verifique o console para mais detalhes.');
    }
  }
}

async function buscarCheckinPorId(id) {
  try {
    const response = await fetch(`${API_URL}/checkins/${id}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar check-in');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar check-in:', error);
    alert('Erro ao buscar check-in. Verifique o console para mais detalhes.');
    return null;
  }
}

function editarCheckin(id) {
  buscarCheckinPorId(id).then(checkin => {
    if (checkin) {
      // Preencher o formulário com os dados para edição
      document.getElementById('checkin-id').value = checkin.id;
      document.getElementById('matricula').value = checkin.matricula;
      document.getElementById('entrada').value = checkin.entrada;
      document.getElementById('saida').value = checkin.saida || '';
      
      // Mudar o foco para o formulário
      document.getElementById('matricula').focus();
      
      // Alterar o texto do botão de submit
      document.querySelector('#form-checkin button[type="submit"]').textContent = 'Atualizar';
    }
  });
}

function buscarCheckin() {
  const termo = document.getElementById('busca-checkin').value.toLowerCase();
  const linhas = document.querySelectorAll('#checkin-tabela tbody tr');
  
  linhas.forEach(linha => {
    const matricula = linha.cells[0].textContent.toLowerCase();
    if (matricula.includes(termo)) {
      linha.style.display = '';
    } else {
      linha.style.display = 'none';
    }
  });
}

// Funções para gerenciamento de Equipamentos
async function carregarEquipamentos() {
  try {
    const response = await fetch(`${API_URL}/equipamentos`);
    if (!response.ok) {
      throw new Error('Falha ao carregar equipamentos');
    }
    const equipamentos = await response.json();
    
    // Limpar a tabela
    const tbody = document.querySelector('#equipamentos-tabela tbody');
    tbody.innerHTML = '';
    
    // Adicionar cada equipamento à tabela
    equipamentos.forEach(equip => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${equip.nome}</td>
        <td>${equip.tipo}</td>
        <td>${equip.estado}</td>
        <td class="acoes">
          <button class="btn-editar" onclick="editarEquipamento('${equip.id}')">Editar</button>
          <button class="btn-deletar" onclick="deletarEquipamento('${equip.id}')">Deletar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Erro ao carregar equipamentos:', error);
    alert('Erro ao carregar equipamentos. Verifique o console para mais detalhes.');
  }
}

async function salvarEquipamento(dados) {
  try {
    const url = dados.id ? `${API_URL}/equipamentos/${dados.id}` : `${API_URL}/equipamentos`;
    const method = dados.id ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    
    if (!response.ok) {
      throw new Error('Falha ao salvar equipamento');
    }
    
    // Recarregar a lista de equipamentos
    carregarEquipamentos();
    
    return true;
  } catch (error) {
    console.error('Erro ao salvar equipamento:', error);
    alert('Erro ao salvar equipamento. Verifique o console para mais detalhes.');
    return false;
  }
}

async function deletarEquipamento(id) {
  if (confirm(`Deseja realmente excluir este equipamento?`)) {
    try {
      const response = await fetch(`${API_URL}/equipamentos/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Falha ao excluir equipamento');
      }
      
      // Recarregar a lista de equipamentos
      carregarEquipamentos();
    } catch (error) {
      console.error('Erro ao excluir equipamento:', error);
      alert('Erro ao excluir equipamento. Verifique o console para mais detalhes.');
    }
  }
}

async function buscarEquipamentoPorId(id) {
  try {
    const response = await fetch(`${API_URL}/equipamentos/${id}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar equipamento');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar equipamento:', error);
    alert('Erro ao buscar equipamento. Verifique o console para mais detalhes.');
    return null;
  }
}

function editarEquipamento(id) {
  buscarEquipamentoPorId(id).then(equip => {
    if (equip) {
      // Preencher o formulário com os dados para edição
      document.getElementById('equipamento-id').value = equip.id;
      document.getElementById('nome-equip').value = equip.nome;
      
      // Selecionar o tipo correto
      const selectTipo = document.getElementById('tipo-equip');
      for (let i = 0; i < selectTipo.options.length; i++) {
        if (selectTipo.options[i].value === equip.tipo) {
          selectTipo.selectedIndex = i;
          break;
        }
      }
      
      // Selecionar o estado correto
      const selectEstado = document.getElementById('estado-equip');
      for (let i = 0; i < selectEstado.options.length; i++) {
        if (selectEstado.options[i].value === equip.estado) {
          selectEstado.selectedIndex = i;
          break;
        }
      }
      
      // Mudar o foco para o formulário
      document.getElementById('nome-equip').focus();
      
      // Alterar o texto do botão de submit
      document.querySelector('#form-equipamento button[type="submit"]').textContent = 'Atualizar';
    }
  });
}

function buscarEquipamentos() {
  const termo = document.getElementById('busca-equipamentos').value.toLowerCase();
  const linhas = document.querySelectorAll('#equipamentos-tabela tbody tr');
  
  linhas.forEach(linha => {
    const nome = linha.cells[0].textContent.toLowerCase();
    const tipo = linha.cells[1].textContent.toLowerCase();
    if (nome.includes(termo) || tipo.includes(termo)) {
      linha.style.display = '';
    } else {
      linha.style.display = 'none';
    }
  });
}

// Funções para gerenciamento de Instrutores
async function carregarInstrutores() {
  try {
    const response = await fetch(`${API_URL}/instrutores`);
    if (!response.ok) {
      throw new Error('Falha ao carregar instrutores');
    }
    const instrutores = await response.json();
    
    // Limpar a tabela
    const tbody = document.querySelector('#instrutores-tabela tbody');
    tbody.innerHTML = '';
    
    // Adicionar cada instrutor à tabela
    instrutores.forEach(instrutor => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${instrutor.nome}</td>
        <td>${instrutor.especialidade}</td>
        <td>${instrutor.contato}</td>
        <td class="acoes">
          <button class="btn-editar" onclick="editarInstrutor('${instrutor.id}')">Editar</button>
          <button class="btn-deletar" onclick="deletarInstrutor('${instrutor.id}')">Deletar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Erro ao carregar instrutores:', error);
    alert('Erro ao carregar instrutores. Verifique o console para mais detalhes.');
  }
}

async function salvarInstrutor(dados) {
  try {
    const url = dados.id ? `${API_URL}/instrutores/${dados.id}` : `${API_URL}/instrutores`;
    const method = dados.id ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    
    if (!response.ok) {
      throw new Error('Falha ao salvar instrutor');
    }
    
    // Recarregar a lista de instrutores
    carregarInstrutores();
    
    return true;
  } catch (error) {
    console.error('Erro ao salvar instrutor:', error);
    alert('Erro ao salvar instrutor. Verifique o console para mais detalhes.');
    return false;
  }
}

async function deletarInstrutor(id) {
  if (confirm(`Deseja realmente excluir este instrutor?`)) {
    try {
      const response = await fetch(`${API_URL}/instrutores/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Falha ao excluir instrutor');
      }
      
      // Recarregar a lista de instrutores
      carregarInstrutores();
    } catch (error) {
      console.error('Erro ao excluir instrutor:', error);
      alert('Erro ao excluir instrutor. Verifique o console para mais detalhes.');
    }
  }
}

async function buscarInstrutorPorId(id) {
  try {
    const response = await fetch(`${API_URL}/instrutores/${id}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar instrutor');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar instrutor:', error);
    alert('Erro ao buscar instrutor. Verifique o console para mais detalhes.');
    return null;
  }
}

function editarInstrutor(id) {
  buscarInstrutorPorId(id).then(instrutor => {
    if (instrutor) {
      // Preencher o formulário com os dados para edição
      document.getElementById('instrutor-id').value = instrutor.id;
      document.getElementById('nome-inst').value = instrutor.nome;
      document.getElementById('especialidade').value = instrutor.especialidade;
      document.getElementById('contato').value = instrutor.contato;
      
      // Mudar o foco para o formulário
      document.getElementById('nome-inst').focus();
      
      // Alterar o texto do botão de submit
      document.querySelector('#form-instrutor button[type="submit"]').textContent = 'Atualizar';
    }
  });
}

function buscarInstrutores() {
  const termo = document.getElementById('busca-instrutores').value.toLowerCase();
  const linhas = document.querySelectorAll('#instrutores-tabela tbody tr');
  
  linhas.forEach(linha => {
    const nome = linha.cells[0].textContent.toLowerCase();
    const especialidade = linha.cells[1].textContent.toLowerCase();
    if (nome.includes(termo) || especialidade.includes(termo)) {
      linha.style.display = '';
    } else {
      linha.style.display = 'none';
    }
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  // Adicionar campos ocultos para IDs nos formulários
  const formCheckin = document.getElementById('form-checkin');
  if (formCheckin) {
    // Adicionar campo oculto para ID se não existir
    if (!document.getElementById('checkin-id')) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.id = 'checkin-id';
      hiddenField.name = 'id';
      formCheckin.appendChild(hiddenField);
    }
    
    // Carregar checkins existentes
    carregarCheckins();
    
    // Adicionar evento de submit
    formCheckin.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const dados = {
        matricula: document.getElementById('matricula').value,
        entrada: document.getElementById('entrada').value,
        saida: document.getElementById('saida').value
      };
      
      // Verificar se é uma edição
      const id = document.getElementById('checkin-id').value;
      if (id) {
        dados.id = id;
      }
      
      salvarCheckin(dados).then(success => {
        if (success) {
          // Limpar o formulário
          formCheckin.reset();
          document.getElementById('checkin-id').value = '';
          document.querySelector('#form-checkin button[type="submit"]').textContent = 'Cadastrar';
        }
      });
    });
  }
  
  // Equipamentos
  const formEquipamento = document.getElementById('form-equipamento');
  if (formEquipamento) {
    // Adicionar campo oculto para ID se não existir
    if (!document.getElementById('equipamento-id')) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.id = 'equipamento-id';
      hiddenField.name = 'id';
      formEquipamento.appendChild(hiddenField);
    }
    
    // Carregar equipamentos existentes
    carregarEquipamentos();
    
    // Adicionar evento de submit
    formEquipamento.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const dados = {
        nome: document.getElementById('nome-equip').value,
        tipo: document.getElementById('tipo-equip').value,
        estado: document.getElementById('estado-equip').value
      };
      
      // Verificar se é uma edição
      const id = document.getElementById('equipamento-id').value;
      if (id) {
        dados.id = id;
      }
      
      salvarEquipamento(dados).then(success => {
        if (success) {
          // Limpar o formulário
          formEquipamento.reset();
          document.getElementById('equipamento-id').value = '';
          document.querySelector('#form-equipamento button[type="submit"]').textContent = 'Cadastrar';
        }
      });
    });
  }
  
  // Instrutores
  const formInstrutor = document.getElementById('form-instrutor');
  if (formInstrutor) {
    // Adicionar campo oculto para ID se não existir
    if (!document.getElementById('instrutor-id')) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.id = 'instrutor-id';
      hiddenField.name = 'id';
      formInstrutor.appendChild(hiddenField);
    }
    
    // Carregar instrutores existentes
    carregarInstrutores();
    
    // Adicionar evento de submit
    formInstrutor.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const dados = {
        nome: document.getElementById('nome-inst').value,
        especialidade: document.getElementById('especialidade').value,
        contato: document.getElementById('contato').value
      };
      
      // Verificar se é uma edição
      const id = document.getElementById('instrutor-id').value;
      if (id) {
        dados.id = id;
      }
      
      salvarInstrutor(dados).then(success => {
        if (success) {
          // Limpar o formulário
          formInstrutor.reset();
          document.getElementById('instrutor-id').value = '';
          document.querySelector('#form-instrutor button[type="submit"]').textContent = 'Cadastrar';
        }
      });
    });
  }
});