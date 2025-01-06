export const statusPickup = (status) => {
  switch (status) {
    case "Dalam_Perjalanan":
      return "Dalam Perjalanan";
    case "Menunggu_Penjemputan":
      return "Menunggu";
    case "Sampah_telah_dijemput":
      return "Selesai";
    case "Penjemputan_Gagal":
      return "Gagal";
    default:
      return;
  }
};
