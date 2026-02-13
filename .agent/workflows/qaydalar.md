---
description: 
---

# MƏNİM KODLAMA QAYDALARIM

1. **Tam Kod Təqdimatı:** Hər hansı bir dəyişiklik etdikdə, kodun yalnız bir hissəsini deyil, bütün faylı (index.html, script.js və ya style.css) tam və kopyalanmağa hazır şəkildə ver. 
2. **Mövcud Funksionallığı Qoru:** Kodun içindəki köhnə funksiyaları, animasiya adlarını və ya mühüm dəyişənləri (məsələn: students massivi, Lottie JSON-ları) mən demədən əsla silmə.
3. **Z-Index və Click Problemləri:** Yeni element əlavə edərkən həmişə `z-index` və `pointer-events` xüsusiyyətlərini yoxla. Düymələrin digər təbəqələr tərəfindən bloklanmadığından əmin ol.
4. **Lottie Animasiyaları:** Lottie JSON fayllarını birbaşa JS faylına `const` dəyişəni kimi daxil etməyə üstünlük ver (əgər fayl oxunmursa).
5. **Addım-Addım İzah:** Etdiyin hər bir texniki düzəlişi qısa və aydın şəkildə "Nəyi dəyişdim və niyə?" formatında izah et.
6. **Musiqi və Autoplay:** Brauzerlərin musiqi bloklama qaydalarını (user gesture requirement) nəzərə al və musiqini həmişə bir düymə klikindən sonra başlat.
7. **Animasiya Ardıcıllığı:** `animate.css` siniflərini əlavə edərkən köhnə siniflərin təmizləndiyindən və animasiyanın sıfırdan başladığından əmin ol.