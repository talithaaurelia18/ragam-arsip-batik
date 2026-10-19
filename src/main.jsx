import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Bookmark, ArrowUpRight, Menu, X, ChevronRight, Sparkles, Layers3, ScrollText, MapPin } from 'lucide-react';
import './styles.css';

const photoFallbacks = {
  cloth: 'https://commons.wikimedia.org/wiki/Special:FilePath/Batik%20Indonesia.jpg',
  canting: 'https://commons.wikimedia.org/wiki/Special:FilePath/Using%20canting%20to%20create%20batik%20%2810684550014%29.jpg',
  artisan: 'https://commons.wikimedia.org/wiki/Special:FilePath/Batik%20Artisan%20Applying%20Wax%20with%20Canting%20in%20Trusmi%20Cirebon%20Indonesia.jpg',
  tools: 'https://commons.wikimedia.org/wiki/Special:FilePath/Batik%20Making%20Tools.jpg',
  drawing: 'https://commons.wikimedia.org/wiki/Special:FilePath/Batik%20Artisan%20Drawing%20Wax%20with%20Canting%20in%20Trusmi%20Cirebon%20Indonesia.jpg',
  pontianak: '/images/corak.jpg',
};
const stories = [
  { id: 1, tag: 'MOTIF & MAKNA', title: 'Parang: Jejak yang Tak Terputus', subtitle: 'Keteguhan, keberanian, dan perjalanan hidup', region: 'Yogyakarta', category: 'Motif', image: '/images/batik-cloth.jpg', fallback: photoFallbacks.cloth, className: 'parang', number: '01', body: 'Motif Parang dikenal lewat garis diagonal yang berulang seperti ombak. Dalam tradisi keraton Jawa, pola ini kerap dimaknai sebagai semangat yang terus bergerak, keteguhan hati, dan keberanian menghadapi perjalanan hidup.' },
  { id: 2, tag: 'DI BALIK KAIN', title: 'Dari Canting ke Karya', subtitle: 'Kesabaran yang tertuang dalam setiap garis', region: 'Cirebon', category: 'Perajin', image: '/images/batik-artisan.jpg', fallback: photoFallbacks.artisan, className: 'craft', number: '02', body: 'Batik tulis dibuat dengan menggambar malam menggunakan canting. Garis demi garis membutuhkan ketelitian dan waktu; ketidaksamaan kecil justru menjadi jejak tangan pembuatnya.' },
  { id: 3, tag: 'ARSIP MOTIF', title: 'Kawung dan Keseimbangan', subtitle: 'Geometri sederhana dengan filosofi mendalam', region: 'Jawa', category: 'Motif', image: '/images/batik-cloth.jpg', fallback: photoFallbacks.cloth, className: 'kawung', number: '03', body: 'Kawung tersusun dari bentuk elips yang berulang dan seimbang. Motif ini sering dikaitkan dengan pengendalian diri, keadilan, serta hubungan manusia dengan sesamanya.' },
  { id: 4, tag: 'ALAT & TEKNIK', title: 'Canting, Alat Kecil Penuh Cerita', subtitle: 'Mengenal alat utama batik tulis', region: 'Nusantara', category: 'Teknik', image: '/images/canting-tools.jpg', fallback: photoFallbacks.tools, className: 'tools', number: '04', body: 'Canting memiliki wadah kecil untuk menampung malam dan cucuk untuk mengalirkannya. Ukuran cucuk dan gerakan tangan membantu membentuk garis dengan karakter berbeda.' },
  { id: 5, tag: 'WARISAN HIDUP', title: 'Sebuah Kain, Ribuan Cerita', subtitle: 'Batik sebagai bahasa budaya Indonesia', region: 'Indonesia', category: 'Budaya', image: '/images/batik-canting.jpg', fallback: photoFallbacks.canting, className: 'heritage', number: '05', body: 'Batik bukan hanya pola pada kain. Ia menyimpan pengetahuan tentang alam, nilai sosial, teknik, dan tradisi yang diwariskan lintas generasi serta terus berkembang di tangan para perajin.' },
  { id: 6, tag: 'PROSES KREATIF', title: 'Malam, Warna, dan Waktu', subtitle: 'Mengenal proses di balik selembar batik', region: 'Cirebon', category: 'Teknik', image: '/images/batik-drawing.jpg', fallback: photoFallbacks.drawing, className: 'process', number: '06', body: 'Pembuatan batik dapat melalui beberapa tahap: menggambar pola, menorehkan malam, mewarnai kain, lalu meluruhkan malam. Teknik dan urutan proses bisa berbeda menurut tradisi dan hasil yang diinginkan.' },
  { id: 7, tag: 'WARISAN KALIMANTAN BARAT', title: 'Corak Insang: Napas Sungai Kapuas', subtitle: 'Mengenal wastra khas Pontianak dan ragam kreasi batiknya', region: 'Pontianak', category: 'Motif', image: '/images/corak.jpg', fallback: photoFallbacks.pontianak, className: 'pontianak', number: '07', body: 'Corak Insang dikenal sebagai wastra khas Melayu Pontianak yang terinspirasi bentuk insang ikan dan kehidupan masyarakat di tepian Sungai Kapuas. Polanya mengingatkan pada napas, kehidupan, dan gerak yang terus berlanjut. Corak Insang tercatat sebagai Warisan Budaya Takbenda Indonesia pada 2017 dalam kategori tenun tradisional. Saat ini, motif tersebut juga dikembangkan dalam karya batik kreasi. Karena itu, arsip ini membedakan tenun Corak Insang sebagai tradisi asalnya dari batik Corak Insang sebagai pengembangan motif.' },
];
const categories = ['Semua', 'Motif', 'Perajin', 'Teknik', 'Budaya'];

function Photo({ src, fallback, alt, className = '' }) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);
  return <div className={`photo ${className} ${failed ? 'photo-failed' : ''}`}>
    <img src={current} alt={alt} loading="lazy" onError={() => { if (current !== fallback) setCurrent(fallback); else setFailed(true); }} />
    {failed && <div className="pattern-placeholder" aria-label={alt}><span>RAGAM</span><small>ARSIP BATIK INDONESIA</small></div>}
  </div>;
}
function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [saved, setSaved] = useState([]);
  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const filtered = useMemo(() => stories.filter(s => (category === 'Semua' || s.category === category) && (!showSaved || saved.includes(s.id)) && `${s.title} ${s.subtitle} ${s.region} ${s.tag} ${s.category}`.toLowerCase().includes(search.toLowerCase())), [search, category, saved, showSaved]);
  const toggleSave = id => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const openStory = story => setActive(story);
  return <div className="site-shell">
    <div className="grain" />
    <header className="topbar">
      <a href="#home" className="brand"><span className="brand-mark">A.</span><span><b>RAGAM</b><small>ARSIP BATIK INDONESIA</small></span></a>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
        <a href="#arsip" onClick={() => setMenuOpen(false)}>Arsip Visual</a><a href="#tentang" onClick={() => setMenuOpen(false)}>Tentang Batik</a><a href="#jelajah" onClick={() => setMenuOpen(false)}>Jelajahi Motif</a>
      </nav>
      <div className="header-actions"><button className={`saved-toggle ${showSaved ? 'selected' : ''}`} onClick={() => { setShowSaved(!showSaved); document.getElementById('arsip')?.scrollIntoView({behavior:'smooth'}); }} aria-label="Tampilkan koleksi tersimpan"><Bookmark size={15} fill={showSaved ? 'currentColor' : 'none'} /><span>Tersimpan</span><i>{saved.length}</i></button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Buka menu">{menuOpen ? <X /> : <Menu />}</button></div>
    </header>
    <main id="home">
      <section className="intro-grid">
        <article className="panel hero-panel">
          <div className="hero-copy"><p className="eyebrow"><span /> EDISI KHUSUS · WARISAN NUSANTARA</p><p className="hero-kicker">Mengenal lebih dekat</p><h1>BATIK<br/><em>INDONESIA</em></h1><p className="hero-description">Selembar kain, ribuan cerita. Menelusuri keindahan motif, tangan para perajin, dan filosofi yang hidup di dalamnya.</p><a className="text-link" href="#arsip">MASUK KE ARSIP <ArrowUpRight size={14}/></a></div>
          <Photo src="/images/batik-cloth.jpg" fallback={photoFallbacks.cloth} alt="Kain batik Indonesia dengan motif tradisional" className="hero-photo" />
          <div className="hero-index"><span>01</span><span className="index-line"/><span>07</span></div><span className="vertical-note">WARISAN YANG TERUS BERGERAK</span>
        </article>
        <article className="panel feature-panel">
          <div className="feature-top"><p className="eyebrow">01 / PROSES TRADISI</p><h2>DARI<br/>CANTING<br/><em>KE KARYA</em></h2><p>Di balik setiap goresan, ada waktu, ketekunan, dan cerita yang tak selalu terlihat.</p><button className="round-arrow" onClick={() => openStory(stories[1])} aria-label="Baca tentang perajin"><ArrowUpRight size={18}/></button></div>
          <Photo src="/images/batik-artisan.jpg" fallback={photoFallbacks.artisan} alt="Perajin sedang membuat batik menggunakan canting" className="feature-photo" />
          <div className="feature-caption"><span>TRADISI · KETERAMPILAN · KETELITIAN</span><span>JAWA BARAT ↗</span></div>
        </article>
      </section>

      <section className="mosaic" id="jelajah">
        <article className="panel mosaic-large palace-panel" onClick={() => openStory(stories[0])} role="button" tabIndex="0" onKeyDown={e => e.key === 'Enter' && openStory(stories[0])}>
          <Photo src="/images/batik-cloth.jpg" fallback={photoFallbacks.cloth} alt="Detail kain batik" className="palace-photo" />
          <div className="panel-overlay"><p className="eyebrow">02 / MOTIF & FILOSOFI</p><h2>JEJAK<br/><em>PARANG</em></h2><p>Garis yang bergerak, semangat yang tak padam.</p><span className="corner-link"><ArrowUpRight size={17}/></span></div><span className="image-label">ARSIP MOTIF · YOGYAKARTA</span>
        </article>
        <article className="panel mosaic-wide exhibition-panel">
          <div className="exhibition-copy"><p className="eyebrow">KOLEKSI PILIHAN</p><h2>POLA YANG<br/><em>BERCERITA</em></h2><p>Motif batik tumbuh dari alam, keyakinan, dan pengalaman masyarakat yang merawatnya.</p><button className="underlined-link" onClick={() => {setCategory('Motif');document.getElementById('arsip')?.scrollIntoView({behavior:'smooth'});}}>TELUSURI MOTIF <ArrowUpRight size={13}/></button></div>
          <Photo src="/images/batik-cloth.jpg" fallback={photoFallbacks.cloth} alt="Kain batik bermotif klasik" className="exhibition-photo" />
          <div className="exhibition-side"><span>01</span><p>POLA<br/>DAN<br/>MAKNA</p><span className="side-rule"/><small>RAGAM VISUAL NUSANTARA</small></div>
        </article>
        <article className="panel craft-panel">
          <div className="craft-head"><p className="eyebrow">03 / ALAT & TEKNIK</p><h2>CANTING:<br/><em>GARIS KEHIDUPAN</em></h2></div><Photo src="/images/canting-tools.jpg" fallback={photoFallbacks.tools} alt="Peralatan tradisional untuk membatik" className="craft-photo"/><p className="craft-note">Sebuah alat kecil yang membawa ketelitian dari tangan ke kain.</p><button className="mini-arrow" onClick={() => openStory(stories[3])} aria-label="Baca tentang canting"><ArrowUpRight size={16}/></button>
        </article>
        <article className="panel philosophy-panel"><Photo src="/images/batik-canting.jpg" fallback={photoFallbacks.canting} alt="Proses pembuatan batik tradisional" className="philosophy-photo"/><div className="philosophy-copy"><p className="eyebrow">CATATAN KURATOR</p><h2>WARISAN<br/>YANG <em>HIDUP</em></h2><p>Batik bukan sekadar kain. Ia adalah pengetahuan yang diwariskan, disesuaikan, dan diciptakan kembali.</p><button className="underlined-link" onClick={() => openStory(stories[4])}>BACA CERITA <ArrowUpRight size={13}/></button></div></article>
        <article className="panel quote-panel"><span className="quote-mark">“</span><p>Setiap motif adalah jejak tempat, ingatan, dan tangan yang membuatnya.</p><span className="quote-byline">— CATATAN DARI ARSIP RAGAM</span><div className="quote-ornament"/></article>
      </section>

      <section className="archive-section" id="arsip">
        <div className="section-heading"><div><p className="eyebrow"><span/> JELAJAHI ARSIP</p><h2>RAGAM <em>CERITA</em></h2></div><p className="section-description">Temukan kisah di balik pola, teknik, dan tradisi yang menjadikan batik bagian dari identitas kita—termasuk wastra Corak Insang dari Pontianak.</p></div>
        <div className="archive-tools"><div className="category-tabs">{categories.map(c => <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div><label className="search-box"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari motif, daerah, cerita..." aria-label="Cari arsip"/>{search && <button onClick={() => setSearch('')} aria-label="Hapus pencarian"><X size={14}/></button>}</label></div>
        <div className="story-grid">{filtered.map((story, index) => <article className="story-card" key={story.id} style={{'--delay': `${index * 60}ms`}}><button className="story-image-button" onClick={() => openStory(story)} aria-label={`Buka ${story.title}`}><Photo src={story.image} fallback={story.fallback} alt={story.title} className="story-photo"/><span className="story-number">{story.number}</span><span className="story-open"><ArrowUpRight size={17}/></span></button><div className="story-meta"><span>{story.tag}</span><button className={saved.includes(story.id) ? 'save-button saved' : 'save-button'} onClick={() => toggleSave(story.id)} aria-label={saved.includes(story.id) ? 'Hapus dari tersimpan' : 'Simpan cerita'}><Bookmark size={15} fill={saved.includes(story.id) ? 'currentColor' : 'none'}/></button></div><button className="story-title" onClick={() => openStory(story)}>{story.title}</button><p>{story.subtitle}</p><div className="story-foot"><span><MapPin size={12}/>{story.region}</span><button onClick={() => openStory(story)}>BACA CERITA <ChevronRight size={13}/></button></div></article>)}</div>
        {filtered.length === 0 && <div className="empty-state"><Layers3 size={28}/><h3>Belum ada cerita yang cocok</h3><p>Coba kata kunci lain atau pilih kategori “Semua”.</p><button onClick={() => {setSearch('');setCategory('Semua');setShowSaved(false)}}>RESET FILTER</button></div>}
        <div className="archive-bottom"><span>MENAMPILKAN {filtered.length.toString().padStart(2,'0')} DARI {stories.length.toString().padStart(2,'0')} CERITA</span><span className="bottom-line"/><span>ARSIP TERBUKA · INDONESIA</span></div>
      </section>
      <section className="about-section" id="tentang"><div className="about-emblem"><Sparkles size={25}/><span>R.</span></div><div><p className="eyebrow">TENTANG RAGAM</p><h2>Merawat cerita,<br/><em>membaca warisan.</em></h2></div><p className="about-text">Ragam adalah arsip visual kecil untuk mengenal batik Indonesia melalui motif, proses, dan manusia di baliknya. Dibuat sebagai ruang belajar yang terus bertumbuh—dengan rasa ingin tahu dan hormat pada tradisi.</p><a href="#home" className="back-top">KEMBALI KE ATAS ↑</a></section>
    </main>
    <footer className="footer"><a href="#home" className="footer-brand">RAGAM<span>®</span></a><span>ARSIP VISUAL BATIK INDONESIA</span><span>Talitha Aurelia · Sistem Informasi · 19.1D.30 · 2026</span></footer>
    {active && <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && setActive(null)}><article className="story-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setActive(null)} aria-label="Tutup cerita"><X size={19}/></button><Photo src={active.image} fallback={active.fallback} alt={active.title} className="modal-photo"/><div className="modal-content"><p className="eyebrow">{active.number} / {active.tag}</p><h2 id="modal-title">{active.title}</h2><p className="modal-subtitle">{active.subtitle}</p><p className="modal-body">{active.body}</p><div className="modal-bottom"><span><MapPin size={13}/>{active.region}</span><button className={saved.includes(active.id) ? 'modal-save saved' : 'modal-save'} onClick={() => toggleSave(active.id)}><Bookmark size={14} fill={saved.includes(active.id) ? 'currentColor' : 'none'}/>{saved.includes(active.id) ? 'TERSIMPAN' : 'SIMPAN CERITA'}</button></div></div></article></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
