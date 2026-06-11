cara me ajuda a anexar esse texto todo no chat gpt

<option value="aberta">Aberta</option>



                  <option value="andamento">Em andamento</option>



                  <option value="resolvida">Resolvida</option>



                </select>



              </div>



            )}



          </>



        )}



      </Modal>



    </div>



  )



}



JSEOF



echo "done"



Saída







done







Write ListaEspera page



bash







cat > /home/claude/src/components/pages/ListaEspera.jsx << 'JSEOF'



import { useState, useEffect } from 'react'



import { supabase } from '@/lib/supabase'



import { format } from 'date-fns'



import Modal from '@/components/ui/Modal'



import Badge from '@/components/ui/Badge'







const ESPECIALIDADES = ['Psicologia ABA','Fonoaudiologia','T. Ocupacional','Psicomotricidade','Psicopedagogia','Nutrição Infantil','Musicoterapia']







export default function ListaEspera() {



  const [items, setItems] = useState([])



  const [filter, setFilter] = useState('all')



  const [loading, setLoading] = useState(true)



  const [modal, setModal] = useState(false)



  const [editItem, setEditItem] = useState(null)



  const [saving, setSaving] = useState(false)



  const [form, setForm] = useState({



    nome_crianca:'', idade:'', especialidade:'', nome_responsavel:'', telefone:'', email:'',



    observacoes:'', prioridade:'normal', status:'aguardando', turno_preferencial:'', dias_preferenciais:'', origem_contato:''



  })







  useEffect(() => { load() }, [])







  async function load() {



    setLoading(true)



    const { data } = await supabase.from('lista_espera').select('*').order('prioridade').order('data_entrada')



    setItems(data || [])



    setLoading(false)



  }







  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter)







  async function save() {



    setSaving(true)



    const payload = { ...form, data_entrada: format(new Date(), 'yyyy-MM-dd') }



    if (editItem) {



      await supabase.from('lista_espera').update(form).eq('id', editItem.id)



    } else {



      await supabase.from('lista_espera').insert(payload)



    }



    setSaving(false)



    closeModal()



    load()



  }







  async function updateStatus(id, status) {



    await supabase.from('lista_espera').update({ status }).eq('id', id)



    load()



  }







  function openEdit(item) {



    setForm({



      nome_crianca: item.nome_crianca, idade: item.idade || '', especialidade: item.especialidade || '',



      nome_responsavel: item.nome_responsavel, telefone: item.telefone || '', email: item.email || '',



      observacoes: item.observacoes || '', prioridade: item.prioridade, status: item.status,



      turno_preferencial: item.turno_preferencial || '', dias_preferenciais: item.dias_preferenciais || '',



      origem_contato: item.origem_contato || ''



    })



    setEditItem(item)



    setModal(true)



  }







  function closeModal() {



    setModal(false)



    setEditItem(null)



    setForm({ nome_crianca:'', idade:'', especialidade:'', nome_responsavel:'', telefone:'', email:'', observacoes:'', prioridade:'normal', status:'aguardando', turno_preferencial:'', dias_preferenciais:'', origem_contato:'' })



  }







  return (



    <div>



      <div className="section-actions">



        <button className="btn btn-primary" onClick={() => { closeModal(); setModal(true) }}>+ Adicionar à lista</button>



        <div className="pill-row">



          {[['all','Todos'],['aguardando','Aguardando'],['contatado','Contatado'],['matriculado','Matriculado'],['desistiu','Desistiu']].map(([v,l]) => (



            <button key={v} className={`pill${filter===v?' active':''}`} onClick={() => setFilter(v)}>{l}</button>



          ))}



        </div>



      </div>







      {loading



        ? <div className="loading"><div className="spinner" /></div>



        : (



          <div className="card" style={{ padding: 0 }}>



            <div className="table-wrap">



              <table>



                <thead><tr><th>#</th><th>Criança</th><th>Especialidade</th><th>Responsável</th><th>Contato</th><th>Entrada</th><th>Prioridade</th><th>Status</th><th></th></tr></thead>



                <tbody>



                  {filtered.map((e, i) => (



                    <tr key={e.id}>



                      <td style={{ color: 'var(--text-light)', fontSize: 13 }}>{i+1}</td>



                      <td><strong>{e.nome_crianca}</strong>{e.idade && <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{e.idade}</div>}</td>



                      <td style={{ fontSize: 13 }}>{e.especialidade}</td>



                      <td style={{ fontSize: 13 }}>{e.nome_responsavel}</td>



                      <td style={{ fontSize: 13 }}>{e.telefone}</td>



                      <td style={{ fontSize: 13 }}>{e.data_entrada ? format(new Date(e.data_entrada + 'T12:00:00'), 'dd/MM/yy') : '—'}</td>



                      <td><Badge value={e.prioridade} /></td>



                      <td>



                        <select value={e.status} onChange={ev => updateStatus(e.id, ev.target.value)}



                          style={{ padding:'3px 8px', borderRadius:6, border:'1.5px solid var(--border)', fontFamily:'var(--font)', fontSize:13 }}>



                          <option value="aguardando">Aguardando</option>



                          <option value="contatado">Contatado</option>



                          <option value="matriculado">Matriculado</option>



                          <option value="desistiu">Desistiu</option>



                        </select>



                      </td>



                      <td><button className="btn btn-sm btn-outline" onClick={() => openEdit(e)}>✏️</button></td>



                    </tr>



                  ))}



                </tbody>



              </table>



            </div>



          </div>



        )



      }







      <Modal open={modal} onClose={closeModal} title={editItem ? 'Editar entrada' : 'Adicionar à lista de espera'}>



        <div className="form-grid-2">



          <div className="form-group"><label>Nome da criança*</label>



            <input value={form.nome_crianca} onChange={e => setForm(f => ({ ...f, nome_crianca: e.target.value }))} />



          </div>



          <div className="form-group"><label>Idade</label>



            <input value={form.idade} onChange={e => setForm(f => ({ ...f, idade: e.target.value }))} placeholder="Ex: 5 anos" />



          </div>



        </div>



        <div className="form-group"><label>Especialidade desejada</label>



          <select value={form.especialidade} onChange={e => setForm(f => ({ ...f, especialidade: e.target.value }))}>



            <option value="">Selecionar...</option>



            {ESPECIALIDADES.map(esp => <option key={esp} value={esp}>{esp}</option>)}



          </select>



        </div>



        <div className="form-grid-2">



          <div className="form-group"><label>Nome do responsável*</label>



            <input value={form.nome_responsavel} onChange={e => setForm(f => ({ ...f, nome_responsavel: e.target.value }))} />



          </div>



          <div className="form-group"><label>Telefone</label>



            <input value={form.telefone} onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))} />



          </div>



        </div>



        <div className="form-grid-2">



          <div className="form-group"><label>E-mail</label>



            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />



          </div>



          <div className="form-group"><label>Origem do contato</label>



            <select value={form.origem_contato} onChange={e => setForm(f => ({ ...f, origem_contato: e.target.value }))}>



              <option value="">Selecionar</option>



              <option value="instagram">Instagram</option>



              <option value="indicacao">Indicação</option>



              <option value="google">Google</option>



              <option value="whatsapp">WhatsApp</option>



              <option value="outros">Outros</option>



            </select>



          </div>



        </div>



        <div className="form-grid-2">



          <div className="form-group"><label>Turno preferencial</label>



            <select value={form.turno_preferencial} onChange={e => setForm(f => ({ ...f, turno_preferencial: e.target.value }))}>



              <option value="">Indiferente</option>



              <option value="manha">Manhã</option>



              <option value="tarde">Tarde</option>



            </select>



          </div>



          <div className="form-group"><label>Dias preferenciais</label>



            <input value={form.dias_preferenciais} onChange={e => setForm(f => ({ ...f, dias_preferenciais: e.target.value }))} placeholder="Ex: Seg, Qua, Sex" />



          </div>



        </div>



        <div className="form-grid-2">



          <div className="form-group"><label>Prioridade</label>



            <select value={form.prioridade} onChange={e => setForm(f => ({ ...f, prioridade: e.target.value }))}>



              <option value="normal">Normal</option>



              <option value="urgente">Urgente</option>



            </select>



          </div>



          <div className="form-group"><label>Status</label>



            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>



              <option value="aguardando">Aguardando</option>



              <option value="contatado">Contatado</option>



              <option value="matriculado">Matriculado</option>



              <option value="desistiu">Desistiu</option>



            </select>



          </div>



        </div>



        <div className="form-group"><label>Observações</label>



          <textarea value={form.observacoes} onChange={e => setForm(f => ({ ...f, observacoes: e.target.value }))} />



        </div>



        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>



          <button className="btn btn-outline" onClick={closeModal}>Cancelar</button>



          <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>



        </div>



      </Modal>



    </div>



  )



}



JSEOF



echo "done"



Saída







done


parte 14
achei Supabase SQL migration - complete schema
001_schema_completo.sql. é esse?

-- ============================================================ 
-- PONTINHO AZUL — Schema Completo
-- Execute no SQL Editor do Supabase Dashboard
-- ============================================================

-- Habilitar extensões
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABELA: profiles (extensão de auth.users)
-- ============================================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  nome text not null,
  email text not null,
  perfil text not null check (perfil in ('gestao', 'recepcao', 'terapeuta', 'responsavel')),
  especialidade text,
  telefone text,
  avatar_url text,
  ativo boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- TABELA: pacientes
-- ============================================================
create table public.pacientes (
  id uuid primary key default uuid_generate_v4(),
  nome text not null,
  data_nascimento date,
  diagnostico text,
  observacoes text,
  responsavel_id uuid references public.profiles(id),
  terapeuta_id uuid references public.profiles(id),
  especialidade text,
  ativo boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- TABELA: atendimentos (agenda)
-- ============================================================
create table public.atendimentos (
  id uuid primary key default uuid_generate_v4(),
  paciente_id uuid references public.pacientes(id) on delete cascade,
  terapeuta_id uuid references public.profiles(id),
  sala text,
  data_hora timestamptz not null,
  duracao_min integer default 50,
  status text default 'agendado' check (status in ('agendado','atendido','falta','cancelado_pac','cancelado_ter')),
  observacoes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- TABELA: salas
-- ============================================================
create table public.salas (
  id uuid primary key default uuid_generate_v4(),
  nome text not null,
  capacidade integer default 1,
  ativa boolean default true
);

insert into public.salas (nome) values
  ('Sala 01'),('Sala 02'),('Sala 03'),('Sala 04'),
  ('Sala 05'),('Sala 06'),('Sala 07'),('Sala 08');

-- ============================================================
-- TABELA: avisos (normas, comunicados, avisos)
-- ============================================================
create table public.avisos (
  id uuid primary key default uuid_generate_v4(),
  titulo text not null,
  conteudo text not null,
  tipo text default 'aviso' check (tipo in ('aviso','comunicado','norma')),
  autor_id uuid references public.profiles(id),
  fixado boolean default false,
  visivel_para text[] default array['gestao','recepcao','terapeuta','responsavel'],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- TABELA: documentos
-- ============================================================
create table public.documentos (
  id uuid primary key default uuid_generate_v4(),
  nome text not null,
  descricao text,
  tipo text default 'modelo' check (tipo in ('modelo','enviado','assinado')),
  categoria text,
  storage_path text not null,
  enviado_por uuid references public.profiles(id),
  paciente_id uuid references public.pacientes(id),
  created_at timestamptz default now()
);

-- ============================================================
-- TABELA: lista_espera
-- ============================================================
create table public.lista_espera (
  id uuid primary key default uuid_generate_v4(),
  nome_crianca text not null,
  idade text,
  especialidade text,
  nome_responsavel text not null,
  telefone text,
  email text,
  observacoes text,
  prioridade text default 'normal' check (prioridade in ('normal','urgente')),
  status text default 'aguardando' check (status in ('aguardando','contatado','matriculado','desistiu')),
  data_entrada date default current_date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- TABELA: tarefas
-- ============================================================
create table public.tarefas (
  id uuid primary key default uuid_generate_v4(),
  titulo text not null,
  descricao text,
  status text default 'pendente' check (status in ('pendente','andamento','concluida')),
  prioridade text default 'normal' check (prioridade in ('baixa','normal','alta')),
  responsavel_id uuid references public.profiles(id),
  prazo date,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
