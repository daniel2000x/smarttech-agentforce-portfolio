/** Catálogo sintético. Preços e disponibilidade são exemplos para demonstração. */
export const products = [
  { id: 'N001', name: 'Notebook Pro 14', category: 'notebook', price: 3899, stock: 8, icon: '💻', description: '16 GB RAM, SSD 512 GB · trabalho e estudos', tags: ['trabalho', 'estudo', 'programação'] },
  { id: 'M002', name: 'Monitor UltraView 27', category: 'monitor', price: 1499, stock: 12, icon: '🖥️', description: 'QHD, 100 Hz · produtividade e home office', tags: ['home office', 'escritório', 'design'] },
  { id: 'C003', name: 'Smartphone Nova X', category: 'celular', price: 2399, stock: 6, icon: '📱', description: '256 GB, câmera de 50 MP · uso diário', tags: ['celular', 'foto', 'trabalho'] },
  { id: 'F004', name: 'Headset Studio Air', category: 'headset', price: 479, stock: 17, icon: '🎧', description: 'Microfone integrado · reuniões e chamadas', tags: ['fone', 'reunião', 'atendimento'] },
];
export const money = value => new Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL'}).format(value);
