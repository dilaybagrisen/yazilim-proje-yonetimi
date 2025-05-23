# EventAdmin

**EventAdmin**, etkinlik organizatörlerinin (mekanlar, catering şirketleri, düğün planlayıcıları vb.) müşteri takibi, görev yönetimi ve organizasyon sürecini kolaylaştırmak için geliştirilmiş bir web uygulamasıdır. Aynı zamanda müşterilerin kendi görevlerini yönetmelerine ve etkinlik misafirlerine yönelik pazarlama yapılmasına olanak tanır.

Bu proje, uygulamanın **sadece yönetici (admin) paneli** için ön yüz (frontend) ve arka yüz (backend) geliştirmesini kapsamaktadır.

## 🧩 Özellikler

* Admin girişi ve şifre sıfırlama
* Organizör oluşturma, düzenleme ve silme
* Organizör listesi ve arama çubuğu
* SendGrid entegrasyonu ile otomatik e-posta gönderimi
* Uygulama içi bildirim sistemi

## 🛠 Kullanılan Teknolojiler

* **Frontend:** React, React Router, Axios, Bootstrap
* **Backend:** Node.js, Express.js
* **Veritabanı:** MongoDB, Mongoose
* **Kimlik Doğrulama:** JWT (JSON Web Token)
* **E-posta Servisi:** SendGrid

Bu altyapıyla, admin kullanıcıları sistem üzerinden yeni organizatörler ekleyebilir ve bu kişilere otomatik olarak erişim bilgileri içeren e-postalar gönderebilir.
