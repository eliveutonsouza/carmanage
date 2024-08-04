export type CarMaintenanceUserLoggedTypes = {
  id: string;
  name: string;
  lastMaintenance: Date;
  nextMaintenance: Date;
  carId: string;
  plate: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  status: "VENCIDA" | "CONFORME";
};
