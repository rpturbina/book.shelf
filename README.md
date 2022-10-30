# Kriteria Bookshelf Apps
1. Mampu menambahkan data buku
```json
{
    id: string | number,
    title: string,
    author: string,
    year: number,
    isComplete: boolean,
}
```
Berikut contoh data riilnya:
```json
{   
    id: 3657848524,
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K Rowling',
    year: 1997,
    isComplete: false,
}
```
2. Memiliki dua rak buku
    - Bookshelf Apps harus memiliki 2 Rak buku. Yakni, “Belum selesai dibaca” dan “Selesai dibaca”.
    - Rak buku "Belum selesai dibaca" hanya menyimpan buku jika properti isComplete bernilai false.
    - Rak buku "Selesai dibaca" hanya menyimpan buku jika properti isComplete bernilai true.

3. Dapat memindahkan buku antar rak
    - Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dipindahkan di antara keduanya.

4. Dapat menghapus data buku
    - Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dihapus.

5. Manfaatkan localStorage dalam menyimpan data buku
    - Data buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat bertahan walaupun halaman web ditutup.
    - Dengan begitu, Anda harus menyimpan data buku pada localStorage.

## Penilaian
Untuk mendapatkan nilai tinggi, silahkan penuhi saran-saran berikut ini:
- Tambahkan fitur pencarian untuk mem-filter buku yang ditampilkan pada rak sesuai dengan title buku yang dituliskan pada kolom pencarian.
- Berkreasilah dengan membuat proyek Bookshelf Apps tanpa menggunakan project starter.
- Menuliskan kode dengan bersih.
    - Bersihkan comment dan kode yang tidak digunakan.
    - Indentasi yang sesuai.
- Terdapat improvisasi fitur seperti (pilih satu): 
    - Custom Dialog ketika menghapus buku.
    - Dapat edit buku.
    - dsb.