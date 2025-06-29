# PhoneStore Projesi

Telefon mağazası yönetimi için geliştirilen, modern teknolojilerle hazırlanmış tam fonksiyonel bir CRUD ve kimlik doğrulama uygulamasıdır. Proje hem backend (API) hem de frontend (kullanıcı arayüzü) olarak iki ana bölümden oluşur.

---

## İçindekiler

- [Genel Bakış](#genel-bakış)
- [Kullanılan Teknolojiler ve Paketler](#kullanılan-teknolojiler-ve-paketler)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Proje Yapısı](#proje-yapısı)
- [Kurulum ve Çalıştırma](#kurulum-ve-çalıştırma)
- [Fonksiyonlar ve Açıklamalar](#fonksiyonlar-ve-açıklamalar)
- [Klasör ve Dosya Açıklamaları](#klasör-ve-dosya-açıklamaları)
- [Güvenlik ve En İyi Uygulamalar](#güvenlik-ve-en-iyi-uygulamalar)

---

## Genel Bakış

PhoneStore, kullanıcıların telefon ürünlerini ekleyebildiği, düzenleyebildiği, silebildiği ve listeleyebildiği bir mağaza yönetim sistemidir. Kullanıcılar ayrıca kayıt olabilir, giriş yapabilir ve sadece kendi ekledikleri ürünler üzerinde değişiklik yapabilirler. Proje, modern web geliştirme standartlarına uygun olarak hazırlanmıştır.

---

## Kullanılan Teknolojiler ve Paketler

### Backend

#### Ana Teknolojiler

- **Node.js**  
  JavaScript tabanlı sunucu ortamı. API'nin çalışmasını sağlar.

- **Express.js**  
  Node.js üzerinde hızlı ve kolay API geliştirmek için kullanılan framework.

- **MongoDB**  
  NoSQL veritabanı. Telefon ve kullanıcı verileri burada saklanır.

- **Mongoose**  
  MongoDB ile daha kolay ve tipli veri işlemleri için ODM (Object Data Modeling) kütüphanesi.
- **Prisma**
  Prisma ile ORM tabanlı veri tabanı.

#### Ek Paketler ve Amaçları

- **jsonwebtoken**  
  Kullanıcı kimlik doğrulaması için JWT (JSON Web Token) üretimi ve doğrulaması.

- **bcryptjs**  
  Kullanıcı şifrelerinin güvenli şekilde hash'lenmesi ve doğrulanması.

- **dotenv**  
  Ortam değişkenlerinin (`.env` dosyası) okunması ve yönetilmesi.

- **cors**  
  Farklı domainlerden gelen isteklerin kontrolü ve güvenli API erişimi.

- **nodemon**  
  Geliştirme sırasında sunucunun kod değişikliklerinde otomatik yeniden başlatılması.

#### Kullanım Amaçları

- **Kullanıcı yönetimi:**  
  Kayıt, giriş, JWT ile oturum yönetimi, şifre güvenliği.
- **Telefon CRUD işlemleri:**  
  Telefon ekleme, silme, güncelleme, listeleme.
- **Yetkilendirme:**  
  Sadece giriş yapan kullanıcılar kendi ürünlerini düzenleyebilir/silebilir.
- **Veri modelleme:**  
  Kullanıcı ve telefon şemaları ile veri bütünlüğü.

---

### Frontend

#### Ana Teknolojiler

- **Next.js**  
  React tabanlı, SSR (Sunucu Taraflı Render) ve SSG (Statik Site Oluşturma) destekli modern frontend framework.

- **React**  
  Bileşen tabanlı kullanıcı arayüzü geliştirme kütüphanesi.

- **TypeScript**  
  JavaScript'e tip desteği ekleyerek daha güvenli ve okunabilir kod yazımı.

- **Tailwind CSS**  
  Utility-first yaklaşımıyla hızlı ve esnek stil oluşturma imkanı.

- **Zustand**  
  Global state yönetimi için hafif ve kolay bir state management kütüphanesi.

- **react-hook-form**  
  Form yönetimi ve validasyon işlemlerini kolaylaştıran kütüphane.

- **react-icons**  
  Farklı ikon kütüphanelerinden kolayca ikon kullanımı.

#### Ek Paketler ve Amaçları

- **ESLint**  
  Kod kalitesini ve standartlarını korumak için linting aracı.

- **PostCSS & Autoprefixer**  
  Tailwind ve CSS işlemleri için.

#### Kullanım Amaçları

- **Kullanıcı arayüzü:**  
  Modern, responsive ve kullanıcı dostu arayüz.
- **Form yönetimi:**  
  Ürün ekleme ve düzenleme işlemlerinde kolay validasyon ve state yönetimi.
- **Global state:**  
  Kullanıcı ve ürün bilgilerini uygulama genelinde yönetmek.
- **İkonlar:**  
  Görsel olarak zengin ve anlaşılır arayüz.
- **Tip güvenliği:**  
  Hataları azaltmak ve kodun bakımını kolaylaştırmak.

---

## Proje Yapısı
PhoneStore/ backend/ controllers/ middleware/ models/ routes/ config/ app.js .env package.json frontend/ app/ page.tsx create/ edit/ components/ PhoneCard.tsx StatBox.tsx store/ itemStore.ts authStore.ts types/ public/ tailwind.config.js package.json


---

## Kurulum ve Çalıştırma

### Backend

```bash
cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev

Fonksiyonlar ve Açıklamalar
Backend
Kullanıcı Kayıt ve Giriş:
/api/auth/register ve /api/auth/login endpointleri ile kullanıcı işlemleri.
JWT ile Kimlik Doğrulama:
Her korumalı endpoint için JWT token kontrolü.
Telefon CRUD:
/api/phones endpointi ile ürün ekleme, silme, güncelleme, listeleme.
Yetkilendirme:
Sadece ürün sahibi kullanıcılar kendi ürünlerini düzenleyebilir/silebilir.
Frontend
Telefon Listesi ve Kartlar:
Tüm telefonlar ana sayfada kartlar halinde gösterilir.
Statistik Kutuları:
Toplam ürün, aktif, bekleyen, inaktif ve ortalama fiyat gibi bilgiler üstte kutular halinde gösterilir.
Telefon Ekleme ve Düzenleme:
react-hook-form ile validasyonlu formlar.
Silme ve Güncelleme:
Sadece giriş yapan ve ürünü ekleyen kullanıcılar için silme ve düzenleme butonları.
Kullanıcı Oturumu:
Giriş yapan kullanıcı bilgisi ve token'ı localStorage'da tutulur, zustand ile global state olarak yönetilir.
Responsive Tasarım:
Tüm arayüz mobil ve masaüstü uyumludur.
Klasör ve Dosya Açıklamaları
Backend
controllers/
İş mantığı ve endpoint fonksiyonları.
middleware/
JWT doğrulama ve hata yönetimi.
models/
Mongoose şemaları (User, Phone).
routes/
API endpoint tanımlamaları.
config/
Veritabanı bağlantı ayarları.
app.js
Express uygulamasının ana dosyası.
Frontend
app/page.tsx
Ana sayfa ve telefon listesi.
app/create/page.tsx
Yeni telefon ekleme formu.
app/edit/[id]/page.tsx
Telefon düzenleme formu.
components/PhoneCard.tsx
Telefon kartı bileşeni.
components/StatBox.tsx
İstatistik kutusu bileşeni.
store/
Zustand ile global state yönetimi.
types/
TypeScript tip tanımlamaları.
public/
Statik dosyalar (görseller vs).
tailwind.config.js
Tailwind CSS ayarları.
Güvenlik ve En İyi Uygulamalar
Şifreler hash'lenerek saklanır.
JWT ile güvenli oturum yönetimi yapılır.
CORS ile sadece izin verilen domainlerden erişim sağlanır.
Formlarda validasyon ve hata yönetimi yapılır.
Kullanıcı sadece kendi ürününü düzenleyebilir/silebilir.
Kod kalitesi için ESLint ve TypeScript kullanılır.
Katkı ve Geliştirme
Her türlü katkı ve öneriye açıktır. Kodun herhangi bir bölümünü geliştirmek veya yeni özellik eklemek için pull request gönderebilirsiniz.

Hazırlayan:
Omer Nurmammadov
28.06.2025, Baku, Azerbaijan